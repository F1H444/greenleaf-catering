# Panduan Kelola Menu GREENLEAF Catering
## Platform: Google Drive (Yang Sudah Familiar)

---

## Cara Kerja Singkat
Klien cukup **upload foto ke satu folder Google Drive**.  
Nama file foto = nama menu + harga + keterangan.  
Website baca otomatis, tidak perlu app lain.

---

## Format Nama File

Beri nama foto dengan format ini:

```
URUTAN - NAMA MENU | Rp HARGA | Keterangan.jpg
```

### Contoh Nyata:

| Nama File | Hasil di Website |
|---|---|
| `01 - NASI BOX 32K \| Rp 30.000 \| Menu bisa request.jpg` | Tampil urutan 1, harga Rp 30.000 |
| `02 - TUMPENG MINI \| Rp 25.000 \| Tumpeng kuning telang.jpg` | Tampil urutan 2 |
| `03 - PRASMANAN \| Rp 35.000 \| Minimal 50 porsi.jpg` | Tampil urutan 3 |
| `04 - DEKORASI TENDA \| Mulai Rp 1.500.000 \| Chat admin.jpg` | Tampil urutan 4 |

> Tanda `|` (pipa) untuk memisahkan nama, harga, dan keterangan.  
> Angka `01`, `02`, dst di depan untuk mengatur urutan tampil.

---

## Cara Tambah Menu Baru

1. Siapkan foto menu (dari HP atau kamera)
2. Beri nama foto sesuai format di atas
3. Upload ke folder Google Drive yang sudah dibagikan

**Selesai** — website otomatis update dalam ±5 menit.

---

## Cara Hapus / Sembunyikan Menu

- **Hapus permanen**: Hapus foto dari folder Drive
- **Sembunyikan sementara**: Pindahkan foto ke subfolder bernama `_arsip`  
  (file di luar folder utama tidak akan tampil)

---

## Cara Ganti Urutan Tampil

Ubah angka di depan nama file:
- `01 - ...` tampil paling atas
- `02 - ...` tampil kedua
- dst.

Kalau tidak ada angka, urutan otomatis berdasarkan abjad.

---

## Cara Rename File di HP

**Android:**
1. Buka Google Drive → cari foto
2. Tekan lama foto → ketuk titik tiga (⋮) → Rename
3. Ketik nama sesuai format

**iPhone/iOS:**
1. Buka Google Drive → cari foto
2. Ketuk titik tiga (⋯) di pojok foto → Rename
3. Ketik nama sesuai format

---

## Setup Awal (Dilakukan Developer — Sekali Saja)

Developer butuh dari klien:
1. **Link folder Google Drive** yang berisi foto-foto menu
2. Folder harus di-share: **"Anyone with the link" → Viewer**

Developer akan mengambil Folder ID dari link tersebut dan memasangnya ke website.

---

## FAQ

**Q: Nama filenya harus pakai bahasa Inggris?**  
A: Tidak! Bisa Bahasa Indonesia sepenuhnya.

**Q: Kalau tidak ada keterangan, gimana?**  
A: Boleh hanya nama dan harga saja: `01 - NASI BOX | Rp 30.000.jpg`

**Q: Foto bisa format apa?**  
A: JPG, JPEG, PNG, WEBP semuanya bisa.

**Q: Bisa upload dari HP langsung?**  
A: Bisa! Pakai aplikasi Google Drive di HP, upload → rename → selesai.

**Q: Berapa lama website update?**  
A: Maksimal 5 menit otomatis.
