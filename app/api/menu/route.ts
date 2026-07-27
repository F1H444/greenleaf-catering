import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import content from "../../../data/content.json";

export const dynamic = 'force-dynamic';

const PUBLIC_DIR = path.join(process.cwd(), "public");
const VALID_IMAGE_EXT = /\.(jpg|jpeg|png|webp|heic)$/i;

function listImagesInFolder(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath)
    .filter(f => VALID_IMAGE_EXT.test(f))
    .sort()
    .map(f => `/${path.basename(folderPath)}/${f}`);
}

function getLocalMenuItems(): any[] {
  const categories = content.menu.categories;
  return categories.map(cat => {
    const folderPath = path.join(PUBLIC_DIR, cat.id);
    const images = listImagesInFolder(folderPath);
    return {
      id: cat.id,
      name: cat.name,
      price: cat.price,
      description: cat.description || "",
      images,
    };
  });
}

export async function GET() {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
  const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || "";

  if (!GOOGLE_API_KEY || !DRIVE_FOLDER_ID) {
    return NextResponse.json(getLocalMenuItems());
  }

  try {
    const queryRoot = encodeURIComponent(`'${DRIVE_FOLDER_ID}' in parents and trashed = false`);
    const fields = encodeURIComponent("files(id,name,mimeType,parents)");
    const urlRoot = `https://www.googleapis.com/drive/v3/files?q=${queryRoot}&fields=${fields}&orderBy=name&key=${GOOGLE_API_KEY}&pageSize=1000`;

    const resRoot = await fetch(urlRoot, { cache: "no-store" });
    if (!resRoot.ok) throw new Error(`Drive API error ${resRoot.status}: ${await resRoot.text()}`);
    const dataRoot = await resRoot.json();

    if (!dataRoot.files || dataRoot.files.length === 0) {
      return NextResponse.json(getLocalMenuItems());
    }

    const rootImages = dataRoot.files.filter((f: any) => f.mimeType.includes("image/"));
    const folders = dataRoot.files.filter((f: any) => f.mimeType === "application/vnd.google-apps.folder");

    let childImages: any[] = [];
    if (folders.length > 0) {
      const chunkSize = 15;
      for (let i = 0; i < folders.length; i += chunkSize) {
        const chunk = folders.slice(i, i + chunkSize);
        const parentQuery = chunk.map((f: any) => `'${f.id}' in parents`).join(" or ");
        const queryChildren = encodeURIComponent(`(${parentQuery}) and mimeType contains 'image/' and trashed = false`);
        const urlChildren = `https://www.googleapis.com/drive/v3/files?q=${queryChildren}&fields=${fields}&orderBy=name&key=${GOOGLE_API_KEY}&pageSize=1000`;

        const resChildren = await fetch(urlChildren, { cache: "no-store" });
        if (resChildren.ok) {
          const dataChildren = await resChildren.json();
          if (dataChildren.files) childImages.push(...dataChildren.files);
        }
      }
    }

    const menuItems: any[] = [];
    let orderCounter = 0;

    const makeImgUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

    for (const img of rootImages) {
      const { name, price, description } = getCategoryByImageName(img.name) || { name: img.name, price: "", description: "" };
      menuItems.push({
        id: img.id,
        name,
        price,
        description,
        images: [makeImgUrl(img.id)],
      });
    }

    for (const folder of folders) {
      const { name, price, description } = getCategoryByImageName(folder.name) || { name: folder.name, price: "", description: "" };
      const folderImgs = childImages
        .filter(img => img.parents && img.parents.includes(folder.id))
        .map(img => makeImgUrl(img.id));

      if (folderImgs.length > 0) {
        menuItems.push({
          id: folder.id,
          name,
          price,
          description,
          images: folderImgs,
        });
      }
    }

    if (menuItems.length === 0) {
      return NextResponse.json(getLocalMenuItems());
    }

    return NextResponse.json(menuItems);
  } catch (err: any) {
    console.error("[/api/menu] ERROR:", err?.message || err);
    return NextResponse.json(getLocalMenuItems());
  }
}

function getCategoryByImageName(name: string): { name: string; price: string; description: string } | null {
  const base = name.replace(/\.(jpg|jpeg|png|webp|heic)$/i, "").trim();
  const parts = base.split(/\s*\|\s*/);
  if (parts.length < 2) return null;
  return { name: parts[0].trim(), price: (parts[1] || "").trim(), description: (parts[2] || "").trim() };
}