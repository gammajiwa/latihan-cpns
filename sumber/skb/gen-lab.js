/* Generator soal hitungan laboratorium. Tiap generator: (rand) => {q, o:[benar, 4 pengecoh], p}
   Angka diacak tiap dipanggil. */
function gRi(r, a, b){ return a + Math.floor(r() * (b - a + 1)); }
function gPick(r, arr){ return arr[Math.floor(r() * arr.length)]; }
function gShuf(r, arr){ const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function nf(n, dec){
  const neg = n < 0; n = Math.abs(n);
  const f = Math.pow(10, dec === undefined ? 2 : dec), v = Math.round(n * f) / f;
  let [i, d] = String(v).split(".");
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "-" : "") + i + (d ? "," + d : "");
}
const r1 = x => Math.round(x * 10) / 10;
const fU = (u, dec) => n => nf(n, dec) + " " + u;
function opsiAngka(r, benar, cands, fmt, step){
  const out = [fmt(benar)], seen = new Set(out);
  const add = v => { if (out.length >= 5 || typeof v !== "number" || !isFinite(v) || v <= 0) return; const s = fmt(v); if (!seen.has(s)){ seen.add(s); out.push(s); } };
  gShuf(r, cands).forEach(add);
  for (let k = 1; out.length < 5 && k < 80; k++){ add(benar + step * k * (r() < 0.5 ? -1 : 1)); add(benar + step * k); add(benar - step * k); }
  return out;
}

/* Indeks eritrosit */
function genIndeks(r){
  const Ht = gRi(r, 25, 50), mchc = gRi(r, 26, 35), Hb = r1(Ht * mchc / 100), RBC = r1(Ht * 10 / gRi(r, 62, 105));
  const MCV = Ht * 10 / RBC, MCH = Hb * 10 / RBC, MCHC = Hb * 100 / Ht;
  const tipe = gRi(r, 0, 2);
  const data = "Hasil pemeriksaan: Hb " + nf(Hb, 1) + " g/dL, hematokrit " + Ht + "%, jumlah eritrosit " + nf(RBC, 1) + " juta/µL.";
  const ket = MCV < 80 ? "mikrositik" : MCV > 100 ? "makrositik" : "normositik";
  if (tipe === 0) return { q: data + "\nNilai MCV pasien tersebut adalah...",
    o: opsiAngka(r, r1(MCV), [r1(MCH), r1(MCHC), r1(Ht / RBC), r1(MCV * 10)], fU("fL", 1), 3),
    p: "MCV = hematokrit (%) × 10 ÷ eritrosit (juta/µL) = " + Ht + " × 10 ÷ " + nf(RBC, 1) + " = " + nf(MCV, 1) + " fL. Umumnya normal 80 sampai 100 fL, jadi eritrosit pasien " + ket + "." };
  if (tipe === 1) return { q: data + "\nNilai MCH pasien tersebut adalah...",
    o: opsiAngka(r, r1(MCH), [r1(MCV), r1(MCHC), r1(Hb / RBC), r1(MCH + 10)], fU("pg", 1), 2),
    p: "MCH = Hb (g/dL) × 10 ÷ eritrosit (juta/µL) = " + nf(Hb, 1) + " × 10 ÷ " + nf(RBC, 1) + " = " + nf(MCH, 1) + " pg. Umumnya normal sekitar 27 sampai 31 pg." };
  return { q: data + "\nNilai MCHC pasien tersebut adalah...",
    o: opsiAngka(r, r1(MCHC), [r1(MCH), r1(MCV), r1(Hb * 10 / Ht), r1(MCHC + 5)], fU("g/dL", 1), 2),
    p: "MCHC = Hb (g/dL) × 100 ÷ hematokrit (%) = " + nf(Hb, 1) + " × 100 ÷ " + Ht + " = " + nf(MCHC, 1) + " g/dL. Umumnya normal 32 sampai 36 g/dL; di bawah itu disebut hipokrom." };
}

/* LDL Friedewald */
function genLDL(r){
  const TC = gRi(r, 150, 300), HDL = gRi(r, 30, 70), TG = 5 * gRi(r, 16, 70), LDL = TC - HDL - TG / 5;
  return { q: "Hasil profil lipid pasien puasa: kolesterol total " + TC + " mg/dL, HDL " + HDL + " mg/dL, trigliserida " + TG + " mg/dL. Kadar LDL menurut rumus Friedewald adalah...",
    o: opsiAngka(r, LDL, [TC - HDL - TG, TC - HDL + TG / 5, TC - TG / 5, TC + HDL - TG / 5], fU("mg/dL", 0), 5),
    p: "LDL = kolesterol total - HDL - (trigliserida ÷ 5) = " + TC + " - " + HDL + " - " + (TG / 5) + " = " + LDL + " mg/dL. Rumus ini hanya boleh dipakai kalau trigliserida di bawah 400 mg/dL; di atas itu LDL harus diperiksa langsung." };
}

/* Koefisien variasi */
function genCV(r){
  const cv = gPick(r, [1.5, 2, 2.5, 3, 3.5, 4, 5, 6]), mean = 20 * gRi(r, 4, 15), sd = cv * mean / 100;
  return { q: "Hasil pemeriksaan bahan kontrol berulang memberikan rerata " + mean + " mg/dL dan simpangan baku (SD) " + nf(sd) + " mg/dL. Nilai koefisien variasi (CV) pemeriksaan tersebut adalah...",
    o: opsiAngka(r, cv, [sd / mean, mean / sd, cv * 2, cv + 1, cv / 2], v => nf(v) + "%", 0.5),
    p: "CV = SD ÷ rerata × 100% = " + nf(sd) + " ÷ " + mean + " × 100% = " + nf(cv) + "%. CV menggambarkan presisi (ketelitian): makin kecil CV, makin teliti pemeriksaannya." };
}

/* Pengenceran */
function genEncer(r){
  const tipe = gRi(r, 0, 2);
  if (tipe === 0){
    const C1 = gPick(r, [100, 200, 500, 1000]), k = gPick(r, [2, 4, 5, 10, 20]), V2 = gPick(r, [5, 10, 20, 50, 100]), C2 = C1 / k, V1 = V2 / k;
    return { q: "Tersedia larutan standar stok " + C1 + " mg/dL. Akan dibuat larutan standar " + nf(C2) + " mg/dL sebanyak " + V2 + " mL. Volume larutan stok yang dipipet adalah...",
      o: opsiAngka(r, V1, [V2 - V1, V2 * k, C2 / V2, V1 * 2, V1 / 2], fU("mL"), V1 >= 2 ? 1 : 0.25),
      p: "Pakai rumus C1 × V1 = C2 × V2: " + C1 + " × V1 = " + nf(C2) + " × " + V2 + ", jadi V1 = " + nf(V1) + " mL. Sisanya (" + nf(V2 - V1) + " mL) adalah pelarut." };
  }
  if (tipe === 1){
    const C1 = gPick(r, [100, 200, 500, 1000]), k = gPick(r, [2, 4, 5, 10]), V2 = gPick(r, [10, 20, 50, 100]), V1 = V2 / k;
    return { q: "Untuk membuat " + V2 + " mL larutan " + nf(C1 / k) + " mg/dL dari larutan stok " + C1 + " mg/dL, volume pelarut (akuades) yang perlu ditambahkan adalah...",
      o: opsiAngka(r, V2 - V1, [V1, V2, V2 + V1, V2 * k], fU("mL"), 1),
      p: "C1 × V1 = C2 × V2 memberi V1 = " + nf(C1 / k) + " × " + V2 + " ÷ " + C1 + " = " + nf(V1) + " mL stok. Pelarut yang ditambahkan = " + V2 + " - " + nf(V1) + " = " + nf(V2 - V1) + " mL." };
  }
  const f = gPick(r, [2, 5, 10, 20]), baca = gPick(r, [12, 18, 25, 32, 45, 64, 75, 88, 120, 150]);
  return { q: "Kadar suatu analit melebihi batas linearitas alat sehingga serum diencerkan " + f + " kali (1 bagian serum ditambah " + (f - 1) + " bagian pelarut). Hasil yang terbaca alat " + baca + " mg/dL. Kadar sebenarnya adalah...",
    o: opsiAngka(r, baca * f, [baca * (f - 1), baca * (f + 1), baca / f, baca + f], fU("mg/dL", 1), 10),
    p: "Pengenceran " + f + " kali (1 + " + (f - 1) + ") berarti faktor pengalinya " + f + ". Kadar sebenarnya = " + baca + " × " + f + " = " + nf(baca * f) + " mg/dL. Jebakan: mengalikan dengan " + (f - 1) + "." };
}

/* Konversi glukosa */
function genGlukosa(r){
  const mg = 9 * gRi(r, 8, 45), mmol = mg / 18;
  if (r() < 0.5) return { q: "Kadar glukosa darah pasien " + mg + " mg/dL. Jika dinyatakan dalam satuan SI, kadar tersebut setara dengan...",
    o: opsiAngka(r, mmol, [mg / 10, mg * 18, mg / 1.8, mmol * 2], fU("mmol/L", 1), 0.5),
    p: "Faktor konversi glukosa: 1 mmol/L sekitar 18 mg/dL. Jadi " + mg + " ÷ 18 = " + nf(mmol, 1) + " mmol/L." };
  return { q: "Kadar glukosa darah pasien dilaporkan " + nf(mmol, 1) + " mmol/L. Jika dinyatakan dalam mg/dL, kadar tersebut setara dengan...",
    o: opsiAngka(r, mg, [mmol * 10, mmol / 18, mmol * 1.8, mg + 18], fU("mg/dL", 1), 9),
    p: "Kalikan dengan faktor 18: " + nf(mmol, 1) + " × 18 = " + mg + " mg/dL." };
}

/* Kamar hitung Improved Neubauer */
function genKamar(r){
  if (r() < 0.5){
    const N = gRi(r, 60, 250), hasil = N * 50;
    return { q: "Hitung leukosit dengan kamar hitung Improved Neubauer memakai pengenceran 20 kali. Jumlah sel pada 4 bidang besar (masing-masing 1 mm², tinggi kamar 0,1 mm) adalah " + N + " sel. Jumlah leukosit pasien adalah...",
      o: opsiAngka(r, hasil, [N * 20, N * 200, N * 10, N * 500], fU("sel/µL", 0), 500),
      p: "Volume yang dihitung = 4 × 1 mm² × 0,1 mm = 0,4 µL. Jumlah leukosit = " + N + " × 20 ÷ 0,4 = " + N + " × 50 = " + nf(hasil, 0) + " sel/µL." };
  }
  const N = gRi(r, 250, 600), hasil = N * 10000;
  return { q: "Hitung eritrosit dengan kamar hitung Improved Neubauer memakai pengenceran 200 kali. Jumlah sel pada 5 bidang sedang (masing-masing 0,04 mm², tinggi kamar 0,1 mm) adalah " + N + " sel. Jumlah eritrosit pasien adalah...",
    o: opsiAngka(r, hasil, [N * 200, N * 50, N * 1000, N * 100000], fU("sel/µL", 0), 100000),
    p: "Volume yang dihitung = 5 × 0,04 mm² × 0,1 mm = 0,02 µL. Jumlah eritrosit = " + N + " × 200 ÷ 0,02 = " + N + " × 10.000 = " + nf(hasil, 0) + " sel/µL (" + nf(hasil / 1e6, 2) + " juta/µL)." };
}

/* Klirens kreatinin */
function genKlirens(r){
  let V, Pcr, C, Ucr;
  do { V = gPick(r, [720, 1440, 2160, 2880]); Pcr = gPick(r, [0.8, 1, 1.2, 1.5, 2]); C = 5 * gRi(r, 6, 26); Ucr = C * Pcr * 1440 / V; } while (!Number.isInteger(Math.round(Ucr * 1000) / 1000) || Ucr < 20 || Ucr > 250);
  return { q: "Data pasien: volume urin 24 jam " + nf(V, 0) + " mL, kreatinin urin " + nf(Ucr, 0) + " mg/dL, kreatinin serum " + nf(Pcr, 1) + " mg/dL. Nilai klirens kreatinin pasien adalah...",
    o: opsiAngka(r, C, [Ucr * V / Pcr, Ucr * Pcr * 1440 / V, Pcr * V / (Ucr * 1440) * 100, C * 2], fU("mL/menit", 1), 5),
    p: "Klirens = (kreatinin urin × volume urin) ÷ (kreatinin serum × 1.440 menit) = (" + nf(Ucr, 0) + " × " + nf(V, 0) + ") ÷ (" + nf(Pcr, 1) + " × 1.440) = " + C + " mL/menit. Angka 1.440 adalah jumlah menit dalam 24 jam." };
}

/* Aturan Westgard */
const WG_OPSI = ["1-3s", "2-2s", "4-1s", "10x", "Hanya peringatan 1-2s, tidak ada aturan penolakan yang dilanggar"];
function genWestgard(r){
  const mean = 5 * gRi(r, 16, 50), sd = gPick(r, [2, 2.5, 3, 4, 5]), sign = r() < 0.5 ? 1 : -1;
  const u = (a, b) => a + r() * (b - a), z = [];
  const kasus = gRi(r, 0, 4);
  const acak = n => { for (let i = 0; i < n; i++) z.push((i % 2 ? 1 : -1) * u(0.1, 0.9)); };
  if (kasus === 0){ acak(9); z.push(sign * u(3.1, 3.6)); }
  else if (kasus === 1){ acak(8); z.push(sign * u(2.1, 2.8), sign * u(2.1, 2.8)); }
  else if (kasus === 2){ acak(6); z.push(sign * u(1.2, 1.9), sign * u(1.2, 1.9), sign * u(1.2, 1.9), sign * u(2.05, 2.4)); }
  else if (kasus === 3){ for (let i = 0; i < 9; i++) z.push(sign * u(0.2, 0.9)); z.push(sign * u(2.05, 2.4)); }
  else { acak(9); z.push(sign * u(2.1, 2.8)); }
  const vals = z.map(x => Math.round((mean + x * sd) * 10) / 10);
  const zz = vals.map(v => (v - mean) / sd);
  const benar = WG_OPSI[kasus];
  const pemb = [
    "Nilai terakhir " + nf(vals[9], 1) + " berada lebih dari 3 SD dari rerata (batas " + nf(mean - 3 * sd, 1) + " sampai " + nf(mean + 3 * sd, 1) + "). Ini aturan 1-3s, biasanya menandakan galat acak, run ditolak.",
    "Dua nilai berturut-turut terakhir sama-sama melewati 2 SD di sisi yang sama (batas 2 SD: " + nf(mean - 2 * sd, 1) + " sampai " + nf(mean + 2 * sd, 1) + "). Ini aturan 2-2s, menandakan galat sistematik, run ditolak.",
    "Nilai terakhir memicu peringatan 1-2s, lalu dicek aturan lain: empat nilai berturut-turut terakhir melewati 1 SD di sisi yang sama (batas 1 SD: " + nf(mean - sd, 1) + " sampai " + nf(mean + sd, 1) + "). Ini aturan 4-1s, galat sistematik, run ditolak.",
    "Nilai terakhir memicu peringatan 1-2s, lalu dicek aturan lain: sepuluh nilai berturut-turut berada di sisi yang sama dari rerata. Ini aturan 10x, galat sistematik (pergeseran), run ditolak.",
    "Hanya nilai terakhir yang melewati 2 SD (batas " + nf(mean - 2 * sd, 1) + " sampai " + nf(mean + 2 * sd, 1) + ") dan tidak ada aturan lain yang terlanggar, jadi ini cuma peringatan 1-2s. Run dapat diterima."
  ][kasus];
  if (zz.some(x => !isFinite(x))) return genWestgard(r);
  return { q: "Bahan kontrol glukosa memiliki rerata " + mean + " mg/dL dan SD " + nf(sd, 1) + " mg/dL. Hasil kontrol 10 run terakhir (dari yang lama ke yang terbaru):\n" + vals.map(v => v.toFixed(1).replace(".", ",")).join("; ") + "\nAturan Westgard yang dilanggar pada run terakhir adalah...",
    o: [benar].concat(WG_OPSI.filter(x => x !== benar)), p: pemb };
}

const GEN_LAB = {
  indeks:   { label: "Indeks eritrosit", fn: genIndeks },
  ldl:      { label: "LDL Friedewald", fn: genLDL },
  cv:       { label: "Koefisien variasi", fn: genCV },
  encer:    { label: "Pengenceran", fn: genEncer },
  glukosa:  { label: "Konversi satuan glukosa", fn: genGlukosa },
  kamar:    { label: "Kamar hitung", fn: genKamar },
  klirens:  { label: "Klirens kreatinin", fn: genKlirens },
  westgard: { label: "Aturan Westgard", fn: genWestgard }
};
