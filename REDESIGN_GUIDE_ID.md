# AQUARY — Panduan memasang redesign

Paket ini berisi pembaruan visual awal untuk AQUARY dengan arah **Soft Cute Premium**.

## Perubahan yang sudah diterapkan

- Membuat komponen ikon bersama `src/components/AquaryIcon.jsx` berbasis `lucide-react`.
- Mengganti banyak ikon emoji pada navigasi, login, dashboard, hidrasi, edukasi, toko aksesori, dan halaman penguin dengan ikon Lucide yang konsisten.
- Mengubah ikon aksesori dan ikon modul belajar menjadi nama ikon, tanpa mengubah ID aksesori atau struktur data pengguna.
- Mempertahankan gambar maskot penguin dan gambar edukasi yang sudah ada.
- Menambahkan lapisan CSS untuk menyatukan warna biru lembut, permukaan putih, border, radius, shadow, dan gaya komponen.
- Mempertahankan routing, autentikasi lokal, penyimpanan localStorage, dan alur fitur yang ada.

## Cara memasang melalui GitHub

1. Simpan ZIP project lama sebagai cadangan.
2. Ekstrak `AQUARY_Redesign_Soft_Cute_Premium.zip` di perangkat.
3. Buka repository AQUARY di GitHub.
4. Untuk cara paling aman, buat branch baru bernama `redesign-soft-cute-premium`.
5. Unggah isi folder `aquary` hasil ekstrak ke repository tersebut. Pastikan `package.json` berada di root repository, bukan di dalam folder bersarang tambahan.
6. Jika GitHub meminta konfirmasi penggantian file, tinjau perubahan lalu lanjutkan.
7. Buka Vercel, pilih project AQUARY, lalu pastikan project terhubung ke repository dan branch redesign tersebut.
8. Tunggu Preview Deployment selesai. Periksa login, dashboard, pencatatan hidrasi, penguin, toko aksesori, edukasi, statistik, dan pengaturan.
9. Jika semua berfungsi, gabungkan branch redesign ke branch utama atau ubah Production Branch di Vercel sesuai alur GitHub yang kamu gunakan.

## Jika menguji di komputer

Dari folder yang berisi `package.json`, jalankan:

```bash
npm install
npm run build
npm run dev
```

Folder `node_modules` akan dibuat otomatis oleh `npm install`. Jangan mengunggah `.env`, `.env.local`, token, atau password ke GitHub maupun ZIP yang dibagikan.

## Catatan pengujian

Paket sumber telah diperbarui, tetapi proses `npm install` dan build produksi tidak dapat dijalankan di lingkungan penyusunan ini karena pengunduhan dependensi tidak selesai. Karena itu, lakukan Preview Deployment terlebih dahulu dan jangan langsung menimpa deployment utama sebelum seluruh fitur diperiksa.

## Batasan versi ini

Ini adalah penyegaran visual dan konsistensi ikon tahap pertama. Beberapa ilustrasi anatomi SVG, maskot PNG, serta simbol diagram tetap dipertahankan sebagai ilustrasi konten (bukan ikon navigasi). Ikon antarmuka dan ikon kategori kini menggunakan satu keluarga Lucide.
