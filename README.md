# Latihan CPNS: SKD dan SKB Analis Lab

Web app latihan soal CPNS yang bisa dibuka di HP maupun laptop, dipasang seperti aplikasi, dan tetap jalan offline.

**Buka:** https://gammajiwa.github.io/latihan-cpns/

## Isi

| Tes | Isi |
|---|---|
| **SKD** (tahap 1) | TWK, TIU, TKP. Simulasi 110 soal / 100 menit dengan skor dan passing grade ala CAT BKN, latihan per materi, soal hitungan dan figural TIU yang angkanya acak tiap main. |
| **SKB Analis Lab** (tahap 2) | Jabatan Pranata Laboratorium Kesehatan. Materi mengikuti materi pokok resmi SKB CAT (Surat Menteri PANRB B/5457/M.SM.01.00/2024), rapor per bidang, soal hitungan lab acak. |

Fitur di kedua tes:
- **Belajar**: baca soal per materi lengkap dengan jawaban dan pembahasan, bisa “tutup jawaban” buat tes diri, progres tiap materi.
- **Latihan**: simulasi bertimer, mode belajar, ulangi soal yang pernah salah, riwayat nilai.
- **Ringkasan** materi dan **Tips** belajar lengkap (rencana belajar, trik per materi, contoh pengerjaan).
- Mode terang (default), gelap, atau otomatis. Navigasi bawah ala aplikasi di HP. Versi cetak PDF.

Semua soal adalah soal latihan yang disusun mengikuti kisi-kisi resmi, bukan bocoran soal CAT BKN.

## Pasang di HP

- **Android (Chrome):** menu titik tiga, lalu **Instal aplikasi** / **Tambahkan ke layar utama**.
- **iPhone (Safari):** tombol **Bagikan**, lalu **Tambah ke Layar Utama**.

Progres (riwayat dan daftar soal salah) tersimpan di browser HP masing-masing.

## Struktur

```
index.html, skd.html, skb.html, sw.js   hasil build (jangan diedit langsung)
manifest.webmanifest, icon.*            ikon dan data aplikasi
pdf/                                    versi cetak
sumber/
  build.js            perakit
  landing.html        halaman depan
  shared/             CSS bersama, head PWA, service worker
  skd/                bank soal SKD (bank-*.js), generator TIU (gen-tiu.js), template, contekan, tips
  skb/                bank soal SKB (bank-skb-*.js), generator hitungan lab (gen-lab.js), template, contekan, tips, _riset/
```

## Update soal

1. Edit file bank soal di `sumber/skd/` atau `sumber/skb/`. Format: `{t:"materi", q:"soal", o:["jawaban benar", "pengecoh", ...], p:"pembahasan"}`. Jawaban benar selalu di urutan pertama, aplikasi yang mengacak. TKP pakai `o:[["teks", poin], ...]`.
2. Jalankan `node sumber/build.js` (tambah `--pdf` untuk render ulang PDF, butuh Microsoft Edge).
3. Commit dan push. GitHub Pages update otomatis dalam 1 sampai 2 menit.
