# Audit relevansi bank soal latihan CPNS

Tanggal: 2026-11-19. Bank TIDAK diubah, ini laporan saja.
Kategori: (a) melenceng/terlalu obscure/di luar kisi-kisi, (b) gaya beda jauh dari soal asli, (c) topik penting yang kurang.
Indeks = urutan 0-based di array (BANK_TWK, BANK_TIU_VERBAL, BANK_TKP_BARU, BANK_SKB_A/B/C).

## Gambaran pola soal nyata (parafrase, dari sumber di bagian URL)

- Komposisi SKD 2024: TWK 30, TIU 35, TKP 45. TWK: Pilar Negara, Nasionalisme, Integritas, Bela Negara, Bahasa Indonesia. TIU: verbal (sinonim, antonim, analogi, silogisme, analitis, pemahaman bacaan), numerik (deret, hitungan, soal cerita, perbandingan kuantitatif), figural (analogi, ketidaksamaan, serial). TKP: 6 aspek (pelayanan publik, jejaring kerja, sosial budaya, TIK, profesionalisme, anti radikalisme), kira-kira 8/8/8/7/7/7.
- TWK nyata: stem satu kalimat pendek (8-20 kata), opsi pendek, sekitar 75-85% hafalan fakta (tokoh, tanggal, pasal, istilah, atribusi tokoh), sisanya kasus pendek. Tema berulang yang TIDAK ada atau sangat tipis di bank kita: otonomi daerah / desentralisasi / dekonsentrasi / tugas pembantuan, sistem pemerintahan dan hak DPR (angket, interpelasi), pemilu Orde Baru, Perang Dingin dan blok ideologi, pembentukan ASEAN, Konferensi Asia Afrika, G30S dan Reformasi 1998, globalisasi dan ideologi liberal/komunis, pakta integritas, KPK dasar hukum, IKN, soal Bahasa Indonesia berbasis paragraf (ide pokok, kalimat tidak efektif, simpulan).
- TIU nyata: banyak soal pemahaman bacaan (paragraf pendek 2-4 kalimat, pertanyaan fakta/inferensi/bentuk negatif), sinonim dan antonim satu kata, numerik soal cerita 1-2 kalimat (persentase, pecahan, perbandingan, pajak, kecepatan, debit), perbandingan kuantitatif P dan Q.
- TKP nyata: stem SANGAT pendek (1-2 kalimat, sering cuma satu), opsi satu kalimat pendek, banyak butir "kecenderungan pribadi / kebiasaan kerja" tanpa narasi tokoh (kerja mendadak, tugas sulit, kritik teman, studi lanjut, mendekati pensiun, lembur vs keluarga). Profesionalisme paling dominan.
- SKB PLK: TIDAK ditemukan kumpulan soal asli PLK yang terbuka. Yang ada: materi pokok resmi (sudah ada di riset-skb.md), artikel UKOM ATLM (7 area: hematologi, kimia klinik, bakteriologi, imunoserologi, parasitologi, sitohistoteknologi, toksikologi klinik; vinyet klinis pendek, opsi A-E mirip-mirip), dan sampel SKB kesehatan umum (stem 1-2 kalimat <25 kata, opsi 4, mayoritas hafalan definisi/nilai standar/program). Prioritas UKOM yang disorot: hitung jenis leukosit, indeks eritrosit, LED, penanda ginjal/hati/lipid, media selektif dan uji biokimia, HBsAg/HIV/Widal/CRP, fiksatif dan prosesing jaringan, morfologi eritrosit, pewarnaan tahan asam, troponin, telur cacing.

Catatan keterbatasan: Tirto dan Bisnis.com (kisi-kisi) menolak fetch (403), jadi rincian sub-materi TWK/TKP diambil dari ringkasan CNN/Detik/Dealls (sekunder, bukan teks Kepmen PANRB 321/2024). Skala TIU figural tidak tersedia di sumber yang terbaca. Frekuensi relatif antar-tipe soal tidak bisa dipastikan dari sampel yang ada.

## Temuan (urut dari paling penting)

### 1. [c] TKP: gaya terlalu panjang dan semuanya narasi, soal nyata jauh lebih pendek dan banyak yang "kebiasaan pribadi"
- File: `skd/bank-tkp-baru.js` (seluruh 96 butir; rata-rata q 133 karakter, maks 179, opsi rata-rata 75 karakter per opsi) dan `bank-lama.js` LAMA_TKP.
- Soal nyata: stem 1 kalimat, opsi satu kalimat pendek, banyak tanpa tokoh/kasus (mis. "Jika tugas yang diberikan atasan sulit...", "Pada saat mendekati pensiun...", "Kondisi yang membuat Anda bekerja lebih baik..."). Bank kita 100 persen skenario berlapis dengan opsi dua klausa, jadi latihan waktu juga meleset (45 soal/100 menit total SKD).
- Saran: tambah sekitar 30-40 butir TKP "pendek" (stem <=100 karakter, opsi <=60 karakter), terutama profesionalisme: menghadapi tugas sulit/mendadak, menerima kritik, kerja lembur vs keluarga, studi lanjut atas biaya sendiri, bekerja menjelang pensiun, kehadiran teman yang curang, target bulanan. Jangan hapus yang panjang, jadikan sebagian kecil.
- Pembanding: detik 20 contoh TKP, detik 30 TWK/TIU/TKP, CNN contoh latihan SKD (URL di bawah).

### 2. [c] TIU: tidak ada soal pemahaman bacaan
- File: `skd/bank-tiu-verbal.js` (tipe yang ada: analogi, sinonim, antonim, silogisme, analitis) dan `gen-tiu.js` (tidak ada jenis ini).
- Di sampel TIU nyata pemahaman bacaan (paragraf 2-4 kalimat, tanya fakta/inferensi/bentuk "tidak sesuai") muncul sebanyak sinonim-antonim. Ini celah terbesar TIU.
- Saran: 12-16 butir baru, paragraf 2-4 kalimat tentang topik publik (pengelolaan limbah, produksi komoditas, pajak, pelayanan publik), pertanyaan: pernyataan yang sesuai, tidak sesuai, simpulan, ide pokok.
- Pembanding: detik 30 contoh soal TWK/TIU (Dealls bagian TIU), Dealls 120 contoh soal CPNS.

### 3. [c] TWK: otonomi daerah dan pemerintahan daerah hampir kosong
- File: `skd/bank-twk.js`. Kata "otonomi" muncul 1x, "desentralisasi" 0. Di sampel nyata ada soal asas otonomi (desentralisasi, dekonsentrasi, tugas pembantuan), istilah penyerahan wewenang, ciri negara kesatuan, cara pemilihan kepala daerah.
- Saran: 5-6 butir (asas desentralisasi/dekonsentrasi/tugas pembantuan, ciri negara kesatuan, hubungan pusat-daerah Pasal 18 UUD, pemilihan kepala daerah, daerah istimewa/khusus).
- Pembanding: detik 35 contoh TWK (no 25, 26, 35), Dealls 100 contoh TWK (no 43, 44, 46, 57), Dealls contoh soal CPNS (bagian NKRI dan otonomi daerah).

### 4. [c] TWK Bahasa Indonesia: hampir semua ejaan, soal paragraf nyata cuma 1
- File: `skd/bank-twk.js` bahasa idx 84-99 (16 butir), hanya idx 95 yang berbasis paragraf (ide pokok).
- Soal nyata (detik 30 TWK no 28-30) memakai teks 4-6 kalimat: kalimat tidak efektif/tidak padu, simpulan teks, gagasan yang tidak cocok sebagai lanjutan. PUEBI/KBBI tetap ada tapi bukan seluruhnya.
- Saran: ganti atau tambah 6-8 butir berbasis paragraf: kalimat tidak efektif/tidak baku dalam paragraf, kalimat simpulan, kalimat utama, kata penghubung antarkalimat, kalimat tidak padu.
- Pembanding: detik 30 TWK, Dealls 100 TWK (no 100), Quipper TWK.

### 5. [c] TWK: sejarah modern dan hubungan internasional tidak ada
- File: `skd/bank-twk.js` sejarah idx 0-17 semuanya pra-1950 (BPUPKI, PPKI, Sumpah Pemuda, Linggarjati, Renville, KMB, Hari Ibu); 0 butir untuk ASEAN (Deklarasi Bangkok 1967), Konferensi Asia Afrika 1955, Gerakan Non-Blok, Perang Dingin dan dua blok, Pemilu 1955 dan Orde Baru (tiga kontestan), G30S, Reformasi 1998, Dekrit sudah ada (idx 5).
- Sampel nyata memuat: kontestan pemilu Orde Baru, penyebab Reformasi 1998, dampak G30S, hasil KAA, pertemuan yang melahirkan ASEAN, blok Perang Dingin, pelopor Budi Utomo, tokoh Bapak Koperasi, keanggotaan PBB.
- Saran: 8-10 butir: ASEAN, KAA dan Dasasila Bandung, GNB, Pemilu 1955 dan Orde Baru, Reformasi 1998, G30S, PBB/politik luar negeri bebas aktif (idx 68 sudah ada, boleh ditambah), tokoh Budi Utomo dan pahlawan pendidikan.
- Pembanding: detik 30 TWK (no 14, 22, 23, 26, 27), Dealls 100 TWK (no 85, 87, 91, 94), detik 35 TWK.

### 6. [c] TWK: kelembagaan negara dan sistem pemerintahan kurang (hak DPR, trias politica, sistem pemerintahan)
- File: `skd/bank-twk.js` uud idx 35-52 fokus bunyi pasal dan MK/KY; 0 butir untuk hak DPR (interpelasi, angket, menyatakan pendapat), trias politica, sistem presidensial, tugas dan fungsi DPR, fungsi legislasi/anggaran/pengawasan, Bawaslu/KPU, sistem pemilu LUBER JURDIL (asas sudah idx 52).
- Saran: 5-6 butir pada hak DPR dan fungsinya, trias politica, sistem pemerintahan, kewenangan MA (uji materi), kedaulatan rakyat.
- Pembanding: Dealls 100 TWK (no 34, 47-60), detik 35 TWK (no 34, 15).

### 7. [c] TWK: ideologi dunia, globalisasi, dan ancaman modern (hoaks/digital) tipis
- File: `skd/bank-twk.js` nasionalisme idx 53-68. Kata "globalisasi", "liberal", "komunis", "radikal" 0 butir; hoaks hanya 1 kali. Sampel nyata ada soal dampak globalisasi dan sikap yang perlu ditumbuhkan, cara menangkal ideologi liberal dan komunis, ancaman keragaman di era digital, produk dalam negeri bersaing, peran pemuda menjaga persatuan secara daring.
- Saran: 5 butir: globalisasi dan nasionalisme (dampak, sikap), perbedaan Pancasila dengan liberalisme/komunisme, ancaman nonmiliter digital (hoaks, ujaran kebencian), modernisasi dan gotong royong, cinta produk dalam negeri.
- Pembanding: detik 35 TWK (no 4, 5, 17, 18, 20), Dealls 100 TWK (no 65, 80), Teknokrat 50 TWK (catatan tren soal naratif).

### 8. [b] TIU analitis: soal terlalu panjang dan berat untuk waktu per soal
- File: `skd/bank-tiu-verbal.js` analitis idx 66 (480 karakter, 6 orang meja bundar), 69 (447), 72 (467, 5 rumah 3 atribut), 74 (480, 5 jabatan); semua 12 butir 290-480 karakter, 5-6 entitas dengan 5-7 petunjuk.
- Waktu CAT sekitar 55 detik per soal (100 menit/110 soal) dan kisi menyebut analitis cukup 3-4 premis, atau pernyataan bersyarat. Ini lebih cocok untuk latihan "kuat" tapi gayanya melenceng dan bisa bikin kebiasaan salah.
- Saran: pertahankan 4-5 butir panjang, ganti sisanya dengan versi 3-4 petunjuk (3-4 entitas) dan tambah butir urutan/peringkat singkat dan pernyataan bersyarat.
- Pembanding: Dealls 120 contoh CPNS (bagian TIU analitis: jika-maka, urutan, susunan duduk), CNN kisi-kisi.

### 9. [c] TIU numerik: tipe yang tidak ada di generator (himpunan, geometri, peluang/kombinatorik sederhana, deret huruf)
- File: `skd/gen-tiu.js`: jenis yang ada deret angka, hitung, perbandingan kuantitatif, dagang, kecepatan, kerja, rasio, rata-rata, figural. Tidak ada himpunan (Venn), bangun datar (luas, keliling), peluang, deret huruf, debit/aliran.
- Sampel nyata menyebut debit pengisian, bunga, pajak, persentase, pecahan; kisi 2024 menyebut "numerik: aritmetika, deret, perbandingan kuantitatif, soal cerita". Geometri/himpunan tidak ada di kisi yang terbaca, jadi prioritas RENDAH. Yang lebih mendesak: debit dan pajak/persentase soal cerita (bisa masuk generator `dagang`/`kerja`).
- Saran: tambah jenis `debit` (pengisian bak, dua keran) dan variasi soal cerita pajak/pecahan; himpunan dan geometri opsional.
- Pembanding: detik 30 TWK/TIU (item 7-9), Dealls 120 contoh CPNS (soal cerita: persentase, kecepatan, debit, bunga).

### 10. [a] TWK idx 21: nomor Keppres 24/2016 (Hari Lahir Pancasila)
- q: "Tanggal 1 Juni ditetapkan sebagai Hari Lahir Pancasila ... melalui... Keputusan Presiden Nomor 24 Tahun 2016".
- Hafalan nomor peraturan seperti ini sangat jarang di soal asli; yang muncul adalah tanggalnya dan tokoh yang berpidato. Remeh dan mudah salah hafal.
- Saran: ganti dengan "tokoh yang menyampaikan istilah Pancasila 1 Juni 1945" atau "peristiwa yang diperingati 1 Juni", opsi tanggal/sidang.
- Pembanding: Dealls 100 TWK (no 1, 4, 16 gaya tanya tanggal dan tokoh Pancasila).

### 11. [a] TWK idx 44: Pasal 22C (jumlah anggota DPD sepertiga DPR)
- Terlalu detail pasal-angka. Sampel nyata menanyakan asal-usul/fungsi DPD, bukan fraksi jumlah anggota.
- Saran: ganti jadi fungsi DPD (usul RUU otonomi daerah dll) atau asal DPD (hasil amandemen ke-3, Pasal 22C).
- Pembanding: Dealls 100 TWK (no 36).

### 12. [a] TWK idx 34: arti "tan hana dharma mangrwa" dan idx 7 (Panitia Sembilan KECUALI Soepomo)
- idx 34 menuntut terjemahan frasa Jawa Kuno; yang sering muncul hanya sumber kitab (Sutasoma) dan arti harfiah Bhinneka Tunggal Ika (idx 18 sudah ada). idx 7 menuntut hafal nama 9 anggota panitia; yang lazim muncul: lembaga yang merumuskan Piagam Jakarta, dan perubahan sila pertama (idx 1 sudah ada).
- Saran: ganti idx 34 dengan makna harfiah semboyan atau tahun semboyan masuk lambang negara; ganti idx 7 dengan tokoh ketua Panitia Sembilan (Soekarno) atau "badan yang menyusun Piagam Jakarta".
- Pembanding: Dealls 100 TWK (no 5, 6, 61, 62, 75).

### 13. [a] TWK idx 10: Kongres Pemuda I tahun 1926; idx 15: Renville dan klausul "Garis Van Mook"
- Masih mungkin keluar, tapi untuk sejarah pergerakan yang lebih sering dipakai: Kongres Pemuda II (Sumpah Pemuda, tempat, lagu Indonesia Raya) dan hasil/dampak perjanjian. Detail kongres I dan Garis Van Mook rendah frekuensinya.
- Saran: boleh dipertahankan satu dari dua; gantikan sisanya dengan sejarah modern (lihat temuan 5).
- Pembanding: detik 30 TWK (no 21-23), Dealls 100 TWK (no 83, 86).

### 14. [b] TKP bank-lama: sebagian soal terlalu mudah, opsi rendah jelas salah
- File: `skd/bank-lama.js` LAMA_TKP idx 2, 10, 13 (mis. mengisi daftar hadir teman, pindah ke unit baru, menolak mendahulukan saudara): opsi 1-2 terlalu jelas ekstrem sehingga tidak melatih membedakan 4 vs 5.
- Sampel nyata justru banyak opsi yang semuanya tampak wajar dan skor dibedakan halus (Dealls bagian TKP).
- Saran: untuk sebagian butir, tulis ulang opsi 2 dan 3 agar sama-sama wajar tetapi beda tingkat proaktif.
- Pembanding: Dealls 120 contoh CPNS (TKP), detik 20 contoh TKP.

### 15. [c] TKP: distribusi aspek rata (16 per aspek), nyata condong ke profesionalisme
- File: `skd/bank-tkp-baru.js`: pelayanan 16, jejaring 16, sosbud 16, tik 16, profesional 16, antiradikal 16 (+ LAMA_TKP 20 butir). Distribusi kisi: 8/8/8/7/7/7 dan sampel nyata sangat didominasi profesionalisme (kerja, disiplin, integritas).
- Saran: bukan hapus, tapi pemilihan latihan acak sebaiknya bobot sesuai 8/8/8/7/7/7 dan tambah butir profesionalisme pendek (lihat temuan 1). Jika app belum membobot, cek app.html.
- Pembanding: kisi-kisi di CNN (URL di bawah), detik 20 contoh TKP.

### 16. [c] SKB: pemeriksaan feses lengkap dan elektrolit hampir kosong
- File: `skb/bank-skb-a.js`, `bank-skb-b.js`, `bank-skb-c.js`. Materi pokok resmi no 2 menyebut "urinalisis, pemeriksaan feses lengkap, kimia darah, cairan tubuh". Pencarian: "darah samar / makroskopis feses" 0, elektrolit (Na, K, Cl, ISE) hanya muncul tidak langsung. Tinja hanya dipakai untuk parasit.
- Saran: 5-6 butir feses rutin (konsistensi, warna, darah samar, leukosit, lemak, pH) dan 3-4 butir elektrolit (Na/K/Cl, hiponatremia, ISE, sampel hemolisis sudah ada di a-65).
- Pembanding: materi pokok PANRB B/5457/2024 (di riset-skb.md), Teknokrat panduan UKOM ATLM (kimia klinik: penanda ginjal, hati, lipid).

### 17. [c] SKB hematologi: hitung jenis leukosit dan hemostasis dasar kurang
- File: `skb/bank-skb-a.js` hematologi idx 20-44. "hitung jenis" muncul 2x (a-30 dan 1 lagi), padahal Teknokrat UKOM menyorot hitung jenis, indeks eritrosit, LED sebagai prioritas; materi pokok menyebut "darah lengkap dan hemostasis". Hemostasis hanya PT/APTT (a-42) dan masa perdarahan Duke (a-44). Tidak ada masa pembekuan, trombosit manual, morfologi leukosit (neutrofil batang, limfosit atipik) dan pengecatan Giemsa/Wright detail (a-43 satu butir).
- Saran: 5-6 butir hitung jenis dan morfologi leukosit (nilai normal tiap jenis, pergeseran ke kiri, limfosit atipik/DBD), 2 butir masa pembekuan, 2 butir trombosit/LED.
- Pembanding: Teknokrat panduan UKOM ATLM, UM Surabaya prediksi soal UKOM (seri hematologi).

### 18. [a] SKB-C: topik lanjut yang di luar materi pokok dan terlalu tinggi untuk Terampil
- File: `skb/bank-skb-c.js` imunoserologi idx 58-62 (imunoassay TSH sandwich, FT4 kompetitif, chemiluminescence, hipotiroidisme, hook effect hCG mola), kimia idx 53-57 (analisis gas darah: spesimen arteri, gelembung udara, interpretasi pH/pCO2/HCO3), molekuler idx 76-77 (sekuensing Sanger, nested PCR), hematologi idx 43-52 (flag analyzer, impedansi/flow sitometri, aglutinin dingin).
- Materi pokok resmi hanya "imunologi dasar" dan "isolasi, amplifikasi, identifikasi asam nukleat". Sekuensing Sanger dan analisis hormon jauh di atas level itu; gas darah memang ada di kurikulum PLK 2013 tapi tidak di kisi SKB.
- Saran: pertahankan 2-3 butir sebagai "pengayaan" (impedansi, aglutinin dingin, gas darah dasar), ganti sisanya (Sanger, nested PCR, FT4 kompetitif, chemiluminescence, hook effect) dengan butir dasar: pengambilan dan pemisahan serum, tes kehamilan, Widal/CRP, elektroforesis dasar.
- Pembanding: riset-skb.md bagian A1 (B/5457/2024), Teknokrat panduan UKOM ATLM.

### 19. [a] SKB-C toksikologi (8 butir, idx 27-34) tidak ada di materi pokok SKB resmi
- File: `skb/bank-skb-c.js` toksikologi: skrining narkoba urin, pseudoefedrin, pestisida, karboksihemoglobin, timbal darah, kadar alkohol, chain of custody. Toksikologi hanya ada di kurikulum pelatihan PLK dan UKOM ATLM, TIDAK ada di enam kompetensi spesifik B/5457/2024.
- Saran: kurangi ke 3-4 butir (skrining narkoba urin dan cut-off, spesimen timbal), pakai slot sisanya untuk feses/elektrolit/hitung jenis (temuan 16, 17).
- Pembanding: riset-skb.md A1, UM Surabaya prediksi soal UKOM.

### 20. [b] SKB: gaya beda dari sampel SKB resmi (stem pendek, opsi 4), bank kita vinyet panjang, opsi 5
- File: ketiga bank SKB: rata-rata q A 93, B 113, C 96 karakter, maks 244; banyak opsi panjang berisi alasan ("..., karena ...").
- Sampel SKB kesehatan nyata: stem <25 kata, opsi 4 pendek, mayoritas hafalan. Gaya vinyet ada di UKOM ATLM. Soal SKB PLK asli tidak tersedia, jadi campuran dua gaya ini aman, tetapi opsi yang berisi alasan panjang (a-2, a-3, b-61 dan sejenisnya) lebih panjang dari opsi nyata.
- Saran: tambah 20-30 butir hafalan pendek (nilai standar, suhu simpan, rasio, warna tabung, urutan) supaya latihan kecepatan; perpendek opsi panjang bila jelas membocorkan jawaban (opsi terpanjang = benar).
- Pembanding: Teknokrat 50+ soal SKB kesehatan, inews 30 soal SKB perawat terampil, Teknokrat UKOM ATLM.

### 21. [c] SKB: sistem pelayanan/lingkungan (MPN air, desinfeksi) tipis
- File: ketiga bank SKB. "MPN/coliform/air minum" hanya 2 kali, desinfeksi (klorin, alkohol 70 persen) 2 kali. Kurikulum PLK menyebut kimia lingkungan dan MPN; sampel SKB kesehatan nyata memuat sterilisasi autoklaf dan limbah tajam (sudah ada).
- Saran: 3-4 butir MPN/air minum, desinfektan dan pengenceran klorin, pembuatan larutan (persen, molar) dan pipet.
- Pembanding: Teknokrat 50+ SKB kesehatan, riset-skb.md A3.

### 22. [c] TWK: soal kasus integritas dan pakta integritas kurang bervariasi
- File: `skd/bank-twk.js` integritas idx 69-83: kasus sudah ada (idx 70, 73, 74, 75, 77, 80) tapi tidak ada soal pakta integritas, dasar hukum KPK, unsur integritas, kasus korupsi besar, pemimpin berintegritas. Sampel nyata (detik 30 TWK no 11-19) justru didominasi hal ini.
- Saran: 3-4 butir: pakta integritas (mengikat siapa), dasar hukum KPK (UU 19/2019 perubahan UU 30/2002), ciri pemimpin berintegritas, konflik kepentingan (sudah idx 73), kasus datang terlambat dengan dalih.
- Pembanding: detik 30 TWK (no 11-16, 19), detik 35 TWK (no 6-9, 21, 22).

## Yang dinilai wajar (tidak dilaporkan per butir)
Sinonim/antonim (kosakata tingkat serapan umum, mis. konklusi, nisbi, stagnan), analogi (hubungan fungsi, bagian-keseluruhan, tingkat), silogisme dan ingkaran/ekuivalen (sesuai sampel "kesimpulan dari premis"), TWK pilar (pengamalan sila, simbol, Piagam Jakarta) dan sejarah BPUPKI/PPKI/Rengasdengklok (sesuai sampel hasil sidang PPKI, Rengasdengklok), TKP anti radikalisme/TIK/sosbud (selaras 6 aspek), SKB-A praanalitik, kimia, urinalisis, bank darah, SKB-B mikrobiologi/parasitologi/imunoserologi/mutu (selaras materi pokok dan prioritas UKOM).

## Ringkasan jumlah
- Total 22 temuan: (a) 6 = temuan 10, 11, 12, 13, 18, 19; (b) 3 = temuan 8, 14, 20; (c) 13 = temuan 1, 2, 3, 4, 5, 6, 7, 9, 15, 16, 17, 21, 22. Temuan 1 (TKP terlalu panjang) dihitung (c) tapi sifatnya juga gaya (b).
- Angka "temuan N" di atas = nomor temuan, bukan indeks soal.

## URL yang terbaca (isi diambil lewat fetch, diparafrase)
- https://www.detik.com/edu/detikpedia/d-7510878/35-contoh-soal-twk-cpns-2024-beserta-jawabannya-latihan-yuk
- https://www.detik.com/edu/detikpedia/d-7546841/30-contoh-soal-twk-skd-cpns-2024-pelamar-ms-ayo-kerjakan (juga memuat sampel TIU dan TKP)
- https://www.detik.com/edu/detikpedia/d-7476317/20-contoh-soal-tkp-skd-cpns-2024-lengkap-dengan-kunci-jawaban
- https://dealls.com/pengembangan-karir/contoh-soal-tes-wawasan-kebangsaan
- https://dealls.com/pengembangan-karir/contoh-soal-cpns (hanya 100 ribu karakter pertama terbaca)
- https://www.cnnindonesia.com/edukasi/20240822100249-561-1136043/kisi-kisi-materi-cpns-2024-lengkap-contoh-soal-persiapan-hadapi-tes
- https://www.cnnindonesia.com/edukasi/20240819104704-561-1134709/kumpulan-contoh-soal-latihan-skd-cpns-2024-dan-jawabannya
- https://daftarsekolah.spmb.teknokrat.ac.id/2026/01/panduan-lengkap-dan-contoh-soal-ukom-atlm-terbaru-strategi-lulus-100/ (sumber kampus/blog, ada contoh yang kuncinya diragukan)
- https://daftarsekolah.spmb.teknokrat.ac.id/2026/02/50-contoh-soal-skb-cpns-kesehatan-dan-kunci-jawaban-paling-dicari/
- https://repository.um-surabaya.ac.id/8432/ (deskripsi buku Prediksi Soal UKOM Ahli TLM, isi soal tidak dibaca)
- https://www.inews.id/news/nasional/30-contoh-soal-skb-cpns-perawat-terampil-bisa-jadi-referensi-belajar/all

Muncul di hasil pencarian tapi TIDAK terbaca (403 atau hanya judul): https://kabar24.bisnis.com/read/20240923/79/1801540/terupdate-kisi-kisi-tes-skd-dan-skb-cpns-2024, https://tirto.id/materi-skb-cpns-pranata-laboratorium-kesehatan-lengkap-g5WT, https://nasional.kontan.co.id/news/kisi-kisi-skd-cpns-2024-untuk-belajar-cek-materi-twk-tiu-dan-tkp, https://bkn.go.id/unggahan/2024/11/5457_Materi-Pokok-SKB-dengan-CAT-Pengadaan-CPNS-TA-2024.pdf (isinya sudah ada di riset-skb.md).
