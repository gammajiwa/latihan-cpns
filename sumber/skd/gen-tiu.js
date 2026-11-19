/* Generator soal TIU numerik dan figural. Tiap generator: (rand) => {q, fig?, figOpt?, o:[benar, 4 pengecoh], p}
   Angka diacak tiap dipanggil, jadi soal hitungan tidak pernah habis. */
function gRi(r, a, b){ return a + Math.floor(r() * (b - a + 1)); }
function gPick(r, arr){ return arr[Math.floor(r() * arr.length)]; }
function gShuf(r, arr){ const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function nf(n){
  const neg = n < 0; n = Math.abs(n);
  const r = Math.round(n * 100) / 100;
  let [i, d] = String(r).split(".");
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "-" : "") + i + (d ? "," + d : "");
}
const fRp = n => "Rp" + nf(n);
const fPct = n => nf(n) + "%";
const fUnit = u => n => nf(n) + " " + u;
function fJam(min){ min = ((Math.round(min) % 1440) + 1440) % 1440; return String(Math.floor(min / 60)).padStart(2, "0") + "." + String(min % 60).padStart(2, "0"); }
function durasi(min){ const h = Math.floor(min / 60), m = min % 60; return (h ? h + " jam" : "") + (h && m ? " " : "") + (m ? m + " menit" : ""); }
function autoStep(n){ n = Math.abs(n); if (n >= 1e6) return 50000; if (n >= 1e5) return 10000; if (n >= 1e4) return 1000; if (n >= 1000) return 50; if (n >= 100) return 5; if (n >= 20) return 2; return 1; }
function opsiAngka(r, benar, cands, fmt, step){
  fmt = fmt || nf;
  const out = [fmt(benar)], seen = new Set(out);
  const add = v => { if (out.length >= 5 || typeof v !== "number" || !isFinite(v) || v <= 0) return; const s = fmt(v); if (!seen.has(s)){ seen.add(s); out.push(s); } };
  gShuf(r, cands).forEach(add);
  step = step || autoStep(benar);
  for (let k = 1; out.length < 5 && k < 80; k++){ add(benar + step * k * (r() < 0.5 ? -1 : 1)); add(benar + step * k); add(benar - step * k); }
  return out;
}
const TANYA_DERET = "Suku berikutnya dari deret berikut adalah...\n";

/* ---------- DERET ---------- */
function genDeret(r){
  const tipe = gRi(r, 0, 6);
  let s = [], ans, p, c = [];
  if (tipe === 0){
    const m = gPick(r, [2, 3]), k = gPick(r, [-2, -1, 1, 2, 3]); let x = k < 0 ? gRi(r, 3, 6) : gRi(r, 1, 6);
    const n = m === 3 ? 5 : 6;
    for (let i = 0; i < n; i++){ s.push(x); x = x * m + k; }
    ans = x; const L = s[s.length - 1];
    p = "Polanya dikali " + m + " lalu " + (k > 0 ? "ditambah " : "dikurangi ") + Math.abs(k) + ". Suku berikutnya: " + nf(L) + " × " + m + (k > 0 ? " + " : " - ") + Math.abs(k) + " = " + nf(ans) + ".";
    c = [L * m, L * m + 2 * k, L + (L - s[s.length - 2]), ans + 1, ans - 1];
  } else if (tipe === 1){
    const a = gRi(r, 2, 20), d = gRi(r, 1, 6), dd = gRi(r, 1, 4);
    let x = a; const diffs = [];
    for (let i = 0; i < 6; i++){ s.push(x); if (i < 5){ diffs.push(d + i * dd); x += d + i * dd; } }
    const nd = d + 5 * dd; ans = s[5] + nd;
    p = "Selisih antarsuku: " + diffs.join(", ") + " (selisihnya bertambah " + dd + "). Selisih berikutnya " + nd + ", jadi " + nf(s[5]) + " + " + nd + " = " + nf(ans) + ".";
    c = [s[5] + diffs[4], s[5] + nd + dd, ans + 1, ans - 1, s[5] + 2 * diffs[4]];
  } else if (tipe === 2){
    const k0 = gRi(r, 1, 3), turun = r() < 0.5;
    let x = turun ? gRi(r, 200, 320) : gRi(r, 1, 30); const sq = [];
    for (let i = 0; i < 6; i++){ s.push(x); if (i < 5){ const q = (k0 + i) * (k0 + i); sq.push(q); x += turun ? -q : q; } }
    const nq = (k0 + 5) * (k0 + 5); ans = turun ? s[5] - nq : s[5] + nq;
    p = "Selisihnya bilangan kuadrat: " + sq.map(v => (turun ? "-" : "+") + v).join(", ") + ", berikutnya " + (turun ? "-" : "+") + nq + " (" + (k0 + 5) + "²). Jadi " + nf(ans) + ".";
    const prevq = (k0 + 4) * (k0 + 4), nextq = (k0 + 6) * (k0 + 6);
    c = turun ? [s[5] - prevq, s[5] - nextq, ans + 1, ans - 1, s[5] - 2 * prevq] : [s[5] + prevq, s[5] + nextq, ans + 1, ans - 1, s[5] + 2 * prevq];
  } else if (tipe === 3){
    let a = gRi(r, 1, 9), b = gRi(r, a, 12);
    s = [a, b]; while (s.length < 6) s.push(s[s.length - 1] + s[s.length - 2]);
    ans = s[4] + s[5];
    p = "Tiap suku = jumlah dua suku sebelumnya (pola Fibonacci): " + nf(s[4]) + " + " + nf(s[5]) + " = " + nf(ans) + ".";
    c = [s[5] + (s[5] - s[4]), s[5] * 2, ans + 1, ans - 1, s[5] + s[3]];
  } else if (tipe === 4){
    const a0 = gRi(r, 1, 10), da = gRi(r, 1, 5), b0 = gRi(r, 10, 40), kali = r() < 0.35, db = gRi(r, 2, 9);
    const A = [0, 1, 2, 3].map(i => a0 + i * da), B = [b0]; for (let i = 1; i < 4; i++) B.push(kali ? B[i - 1] * 2 : B[i - 1] + db);
    s = [A[0], B[0], A[1], B[1], A[2], B[2], A[3]]; ans = B[3];
    p = "Deret loncat (dua deret diselang-seling). Suku ganjil: " + A.join(", ") + " (+" + da + "). Suku genap: " + B.slice(0, 3).join(", ") + ", berikutnya " + nf(ans) + " (" + (kali ? "×2" : "+" + db) + ").";
    c = [A[3] + da, kali ? B[2] + B[2] / 2 : B[2] + db + 1, ans + 1, ans - 1, B[2] + A[3]];
  } else if (tipe === 5){
    const a = gRi(r, 1, 5), m = gPick(r, [2, 3]); let x = gRi(r, 1, 6);
    for (let i = 0; i < 6; i++){ s.push(x); x = (i % 2 === 0) ? x + a : x * m; }
    ans = x;
    p = "Polanya bergantian: +" + a + ", ×" + m + ", +" + a + ", ×" + m + ", dan seterusnya. Langkah berikutnya ×" + m + ": " + nf(s[5]) + " × " + m + " = " + nf(ans) + ".";
    c = [s[5] + a, s[5] * m + a, ans + 1, ans - 1, (s[5] + a) * m];
  } else {
    const pw = r() < 0.75 ? 2 : 3, n0 = pw === 2 ? gRi(r, 1, 8) : gRi(r, 1, 3), k = gPick(r, [-3, -2, -1, 1, 2, 3]);
    for (let i = 0; i < 5; i++) s.push(Math.pow(n0 + i, pw) + k);
    ans = Math.pow(n0 + 5, pw) + k;
    const nama = pw === 2 ? "kuadrat" : "kubus";
    p = "Polanya bilangan " + nama + " " + (k > 0 ? "ditambah " : "dikurangi ") + Math.abs(k) + ": " + [0, 1, 2, 3, 4].map(i => (n0 + i) + (pw === 2 ? "²" : "³")).join(", ") + ". Berikutnya " + (n0 + 5) + (pw === 2 ? "²" : "³") + (k > 0 ? " + " : " - ") + Math.abs(k) + " = " + nf(ans) + ".";
    c = [Math.pow(n0 + 5, pw), Math.pow(n0 + 6, pw) + k, s[4] + (s[4] - s[3]), ans + 1, ans - 1];
  }
  return { q: TANYA_DERET + s.map(nf).join(", ") + ", ...", o: opsiAngka(r, ans, c), p };
}

/* ---------- BERHITUNG ---------- */
function genHitung(r){
  const tipe = gRi(r, 0, 3);
  if (tipe === 0){
    const [pp, mult, pec] = gPick(r, [[12.5, 8, "1/8"], [37.5, 8, "3/8"], [62.5, 8, "5/8"], [87.5, 8, "7/8"], [25, 4, "1/4"], [75, 4, "3/4"], [20, 5, "1/5"], [40, 5, "2/5"], [60, 5, "3/5"], [15, 20, "3/20"], [35, 20, "7/20"]]);
    const N = mult * gRi(r, 6, 40), k = gRi(r, 11, 35), a = pp * N / 100, ans = a + k;
    return { q: "Hasil dari " + nf(pp) + "% × " + nf(N) + " + √" + nf(k * k) + " adalah...",
      o: opsiAngka(r, ans, [a - k, pp * N / 10 + k, a + k + 1, a + 2 * k, ans + 10]),
      p: nf(pp) + "% = " + pec + ", jadi " + pec + " × " + nf(N) + " = " + nf(a) + ". √" + nf(k * k) + " = " + k + " karena " + k + " × " + k + " = " + nf(k * k) + ". Hasilnya " + nf(a) + " + " + k + " = " + nf(ans) + "." };
  }
  if (tipe === 1){
    const A = gRi(r, 12, 35), B = gRi(r, 11, 29), D = gPick(r, [4, 5, 6, 8, 12, 15]), C = D * gRi(r, 10, 40), ans = A * B - C / D;
    return { q: "Hasil dari " + A + " × " + B + " - " + nf(C) + " ÷ " + D + " adalah...",
      o: opsiAngka(r, ans, [A * B + C / D, (A * B - C) / D, ans + 10, ans - 10, A * B]),
      p: "Kali dan bagi dikerjakan lebih dulu daripada kurang: " + A + " × " + B + " = " + nf(A * B) + ", " + nf(C) + " ÷ " + D + " = " + nf(C / D) + ". Jadi " + nf(A * B) + " - " + nf(C / D) + " = " + nf(ans) + "." };
  }
  if (tipe === 2){
    const F = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8]];
    const [n1, d1] = gPick(r, F), [n2, d2] = gPick(r, F), N = d1 * d2 * gRi(r, 2, 9), ans = N * n1 * n2 / (d1 * d2);
    return { q: "Nilai dari " + n1 + "/" + d1 + " dari " + n2 + "/" + d2 + " dari " + nf(N) + " adalah...",
      o: opsiAngka(r, ans, [N * n1 / d1, N * n2 / d2, ans * 2, ans / 2, ans + n1]),
      p: "Kata “dari” berarti dikali: " + n1 + "/" + d1 + " × " + n2 + "/" + d2 + " × " + nf(N) + " = " + nf(ans) + "." };
  }
  const [a0, b0, c0] = gPick(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  const k = c0 > 20 ? 1 : gRi(r, 1, 4), a = a0 * k, b = b0 * k, ans = c0 * k;
  return { q: "Nilai dari √(" + a + "² + " + b + "²) adalah...",
    o: opsiAngka(r, ans, [a + b, ans + k, ans - k, ans + 1, ans - 1]),
    p: a + "² = " + nf(a * a) + " dan " + b + "² = " + nf(b * b) + ", jumlahnya " + nf(a * a + b * b) + ", akarnya " + ans + ". Hafalkan tripel Pythagoras (" + a0 + ", " + b0 + ", " + c0 + ") biar cepat." };
}

/* ---------- DAGANG: diskon, untung rugi, bunga ---------- */
function genDagang(r){
  const tipe = gRi(r, 0, 4);
  if (tipe === 0){
    const d = gPick(r, [10, 15, 20, 25, 30, 40]), O = 10000 * gRi(r, 10, 90), after = O * (100 - d) / 100;
    return { q: "Harga sebuah barang setelah diskon " + d + "% adalah " + fRp(after) + ". Harga barang sebelum diskon adalah...",
      o: opsiAngka(r, O, [after * (100 + d) / 100, after + d * 1000, O + 10000, O - 10000], fRp),
      p: "Setelah diskon " + d + "%, harga tinggal " + (100 - d) + "% dari harga awal. Harga awal = " + fRp(after) + " ÷ " + (100 - d) + "% = " + fRp(O) + ". Jebakan: " + fRp(after) + " × " + (100 + d) + "% itu salah, karena diskon dihitung dari harga awal." };
  }
  if (tipe === 1){
    const d1 = gPick(r, [10, 20, 25, 30, 40, 50]), d2 = gPick(r, [10, 20, 25]), tot = d1 + d2 - d1 * d2 / 100;
    return { q: "Sebuah toko memberi diskon " + d1 + "%, lalu diskon tambahan " + d2 + "% dari harga setelah diskon pertama. Total diskon tersebut setara dengan...",
      o: opsiAngka(r, tot, [d1 + d2, tot + 2, tot - 2, tot + 5, tot - 5], fPct, 1),
      p: "Sisa harga = " + (100 - d1) + "% × " + (100 - d2) + "% = " + nf((100 - d1) * (100 - d2) / 100) + "%. Total diskon = 100% - " + nf((100 - d1) * (100 - d2) / 100) + "% = " + nf(tot) + "%, bukan " + (d1 + d2) + "%." };
  }
  if (tipe === 2){
    const B = 5000 * gRi(r, 10, 100), u = gPick(r, [10, 15, 20, 25, 30, 40, 50]), J = B * (100 + u) / 100;
    return { q: "Seorang pedagang membeli barang seharga " + fRp(B) + " dan menjualnya seharga " + fRp(J) + ". Persentase keuntungannya adalah...",
      o: opsiAngka(r, u, [Math.round((J - B) / J * 1000) / 10, u + 5, u - 5, u + 10], fPct, 5),
      p: "Untung = " + fRp(J) + " - " + fRp(B) + " = " + fRp(J - B) + ". Persentase untung dihitung dari harga beli: " + fRp(J - B) + " ÷ " + fRp(B) + " × 100% = " + u + "%." };
  }
  if (tipe === 3){
    const rg = gPick(r, [10, 20, 25, 40]), B = 10000 * gRi(r, 5, 60), J = B * (100 - rg) / 100;
    return { q: "Sebuah barang dijual seharga " + fRp(J) + " dan pedagang mengalami kerugian " + rg + "%. Harga beli barang tersebut adalah...",
      o: opsiAngka(r, B, [J * (100 + rg) / 100, J + rg * 1000, B + 10000, B - 10000], fRp),
      p: "Rugi " + rg + "% berarti harga jual = " + (100 - rg) + "% dari harga beli. Harga beli = " + fRp(J) + " ÷ " + (100 - rg) + "% = " + fRp(B) + "." };
  }
  let rr, n;
  do { rr = gPick(r, [6, 9, 12, 15, 18]); n = gPick(r, [3, 4, 6, 8, 9, 10, 12, 18, 24]); } while ((rr * n) % 3 !== 0);
  const M = 100000 * gRi(r, 10, 100), bunga = M * rr * n / 1200, tot = M + bunga;
  return { q: "Andi menabung " + fRp(M) + " di bank dengan bunga tunggal " + rr + "% per tahun. Jumlah tabungan Andi setelah " + n + " bulan adalah...",
    o: opsiAngka(r, tot, [bunga, M + M * rr / 100, tot + 10000, tot - 10000, M * (1 + rr * n / 100)], fRp),
    p: "Bunga = " + fRp(M) + " × " + rr + "% × " + n + "/12 = " + fRp(bunga) + ". Jumlah tabungan = " + fRp(M) + " + " + fRp(bunga) + " = " + fRp(tot) + "." };
}

/* ---------- JARAK & KECEPATAN ---------- */
function genKecepatan(r){
  const tipe = gRi(r, 0, 2);
  if (tipe === 0){
    const s0 = gPick(r, [360, 390, 420, 450, 480]), v1 = 10 * gRi(r, 4, 8), v2 = 10 * gRi(r, 4, 9), h = gPick(r, [0, 30, 60]), T = 6 * gRi(r, 10, 35);
    const jalan = v1 * h / 60, D = jalan + (v1 + v2) * T / 60, temu = s0 + h + T;
    const q = "Kota A dan kota B berjarak " + nf(D) + " km. Andi berangkat dari A menuju B pukul " + fJam(s0) + " dengan kecepatan " + v1 + " km/jam. Budi berangkat dari B menuju A pukul " + fJam(s0 + h) + " dengan kecepatan " + v2 + " km/jam. Mereka berpapasan pukul...";
    const p = (h ? "Saat Budi berangkat, Andi sudah menempuh " + v1 + " × " + (h / 60).toString().replace(".", ",") + " jam = " + nf(jalan) + " km, sisa jarak " + nf(D - jalan) + " km. " : "") +
      "Mereka saling mendekat dengan " + v1 + " + " + v2 + " = " + (v1 + v2) + " km/jam. Waktu = " + nf(D - jalan) + " ÷ " + (v1 + v2) + " = " + durasi(T) + ". Jadi " + fJam(s0 + h) + " + " + durasi(T) + " = " + fJam(temu) + ".";
    return { q, o: opsiAngka(r, temu, [s0 + Math.round(D / (v1 + v2) * 60), temu + 10, temu - 10, temu + 30, s0 + T], fJam, 6), p };
  }
  if (tipe === 1){
    let v1, v2, h, t;
    do { v1 = 10 * gRi(r, 3, 6); v2 = v1 + 10 * gRi(r, 1, 3); h = gPick(r, [30, 60, 90, 120]); t = v1 * h / (v2 - v1); } while (!Number.isInteger(t) || t > 360);
    const s0 = gPick(r, [360, 420, 480, 540]), ans = s0 + h + t, unggul = v1 * h / 60;
    return { q: "Andi berangkat pukul " + fJam(s0) + " dengan kecepatan " + v1 + " km/jam. Dari tempat yang sama, Budi menyusul pukul " + fJam(s0 + h) + " dengan kecepatan " + v2 + " km/jam melalui jalan yang sama. Budi berhasil menyusul Andi pukul...",
      o: opsiAngka(r, ans, [s0 + t, ans + 10, ans - 10, ans + 30, s0 + h + Math.round(unggul / (v1 + v2) * 60)], fJam, 6),
      p: "Saat Budi berangkat, Andi sudah unggul " + v1 + " × " + (h / 60).toString().replace(".", ",") + " jam = " + nf(unggul) + " km. Selisih kecepatan " + v2 + " - " + v1 + " = " + (v2 - v1) + " km/jam. Waktu menyusul = " + nf(unggul) + " ÷ " + (v2 - v1) + " = " + durasi(t) + ". Jadi " + fJam(s0 + h) + " + " + durasi(t) + " = " + fJam(ans) + "." };
  }
  const [v1, v2, ans] = gPick(r, [[60, 40, 48], [30, 60, 40], [60, 90, 72], [20, 30, 24], [45, 90, 60], [40, 120, 60], [50, 75, 60], [36, 45, 40], [30, 70, 42], [48, 80, 60]]);
  return { q: "Seseorang pergi dari kota A ke kota B dengan kecepatan rata-rata " + v1 + " km/jam dan pulang melalui jalan yang sama dengan kecepatan rata-rata " + v2 + " km/jam. Kecepatan rata-rata untuk seluruh perjalanan pergi-pulang adalah...",
    o: opsiAngka(r, ans, [(v1 + v2) / 2, ans + 2, ans - 2, ans + 5, v1 + v2], fUnit("km/jam"), 1),
    p: "Kecepatan rata-rata = total jarak ÷ total waktu, bukan rata-rata biasa (" + nf((v1 + v2) / 2) + "). Untuk jarak pergi dan pulang yang sama: 2 × " + v1 + " × " + v2 + " ÷ (" + v1 + " + " + v2 + ") = " + ans + " km/jam." };
}

/* ---------- PEKERJAAN ---------- */
const PASANG_KERJA = [[6, 12, 4], [10, 15, 6], [12, 24, 8], [20, 30, 12], [4, 12, 3], [3, 6, 2], [15, 30, 10], [18, 9, 6], [8, 24, 6], [10, 40, 8], [21, 42, 14], [12, 36, 9], [24, 40, 15]];
function genKerja(r){
  const tipe = gRi(r, 0, 2), hari = fUnit("hari");
  if (tipe === 0){
    const [a, b, c] = gPick(r, PASANG_KERJA);
    return { q: "Sebuah pekerjaan dapat diselesaikan A dalam " + a + " hari dan oleh B dalam " + b + " hari. Jika dikerjakan bersama-sama, pekerjaan itu selesai dalam...",
      o: opsiAngka(r, c, [(a + b) / 2, a + b, Math.abs(a - b), c + 1, c - 1], hari, 1),
      p: "Dalam sehari A menyelesaikan 1/" + a + " dan B 1/" + b + " bagian. Bersama: 1/" + a + " + 1/" + b + " = 1/" + c + " per hari, jadi selesai " + c + " hari. Rumus cepat: " + a + " × " + b + " ÷ (" + a + " + " + b + ") = " + c + "." };
  }
  if (tipe === 1){
    let n, m, k;
    do { n = gRi(r, 6, 20); m = gRi(r, 12, 40); k = gRi(r, 6, m - 3); } while ((n * m) % k !== 0 || n * m / k <= n);
    const tot = n * m / k, ans = tot - n;
    return { q: "Sebuah proyek dapat diselesaikan oleh " + n + " pekerja dalam " + m + " hari. Agar proyek selesai dalam " + k + " hari, banyak pekerja tambahan yang diperlukan adalah...",
      o: opsiAngka(r, ans, [tot, ans + 1, ans - 1, m - k, ans + 2], fUnit("orang"), 1),
      p: "Perbandingan berbalik nilai: beban kerja = " + n + " × " + m + " = " + (n * m) + " orang-hari. Untuk " + k + " hari perlu " + (n * m) + " ÷ " + k + " = " + tot + " pekerja. Tambahannya " + tot + " - " + n + " = " + ans + " orang." };
  }
  let a, b, c, t, x;
  do { [a, b, c] = gPick(r, PASANG_KERJA); t = gRi(r, 1, c - 1); x = (c - t) * b / c; } while (!Number.isInteger(x * 2));
  const tot = t + x;
  return { q: "Sebuah pekerjaan dapat diselesaikan A dalam " + a + " hari dan oleh B dalam " + b + " hari. Mereka bekerja bersama selama " + t + " hari, lalu A berhenti dan sisanya dikerjakan B sendirian. Total waktu sampai pekerjaan selesai adalah...",
    o: opsiAngka(r, tot, [c, b, t + b, tot + 1, tot - 1, c + t], hari, 1),
    p: "Bersama: 1/" + a + " + 1/" + b + " = 1/" + c + " per hari. Dalam " + t + " hari selesai " + t + "/" + c + " bagian, sisa " + (c - t) + "/" + c + ". B butuh " + (c - t) + "/" + c + " × " + b + " = " + nf(x) + " hari. Total " + t + " + " + nf(x) + " = " + nf(tot) + " hari." };
}

/* ---------- PERBANDINGAN & UMUR ---------- */
function genRasio(r){
  const tipe = gRi(r, 0, 4);
  if (tipe === 0){
    const [a, b] = gPick(r, [[3, 5], [2, 3], [3, 7], [4, 5], [5, 7], [1, 3], [2, 5], [5, 9]]), k = 2000 * gRi(r, 3, 25), x = (b - a) * k / 2;
    return { q: "Perbandingan uang Ani dan Budi adalah " + a + " : " + b + ". Jika Budi memberikan " + fRp(x) + " kepada Ani, uang mereka menjadi sama banyak. Uang Ani mula-mula adalah...",
      o: opsiAngka(r, a * k, [b * k, x, (a + b) * k, a * k + x, a * k * 2], fRp),
      p: "Misal Ani = " + a + "k dan Budi = " + b + "k. " + a + "k + " + nf(x) + " = " + b + "k - " + nf(x) + ", jadi " + (b - a) + "k = " + nf(2 * x) + " dan k = " + nf(k) + ". Uang Ani = " + a + " × " + nf(k) + " = " + fRp(a * k) + "." };
  }
  if (tipe === 1){
    let m, j, n, c;
    do { m = gPick(r, [3, 4, 5]); j = gPick(r, [2, 3]); n = gRi(r, 4, 20); c = n * (j - 1) / (m - j); } while (j >= m || !Number.isInteger(c) || c < 4 || c > 20);
    return { q: "Umur ayah sekarang " + m + " kali umur anaknya. " + n + " tahun lagi, umur ayah menjadi " + j + " kali umur anaknya. Umur ayah sekarang adalah...",
      o: opsiAngka(r, m * c, [c, m * c + n, m * c + 2, m * c - 2, j * (c + n) + 1], fUnit("tahun"), 1),
      p: "Misal umur anak = a, ayah = " + m + "a. " + n + " tahun lagi: " + m + "a + " + n + " = " + j + "(a + " + n + "), jadi " + (m - j) + "a = " + (n * (j - 1)) + " dan a = " + c + ". Umur ayah = " + m + " × " + c + " = " + (m * c) + " tahun." };
  }
  if (tipe === 2){
    const S = gPick(r, [100000, 200000, 250000, 400000, 500000, 1000000, 1500000, 2000000]), cm = gRi(r, 2, 12), km = cm * S / 100000;
    return { q: "Jarak dua kota pada peta berskala 1 : " + nf(S) + " adalah " + cm + " cm. Jarak sebenarnya kedua kota tersebut adalah...",
      o: opsiAngka(r, km, [km * 10, km / 10, km * 100, km + cm, km / 100], fUnit("km")),
      p: "Jarak sebenarnya = " + cm + " × " + nf(S) + " = " + nf(cm * S) + " cm. Karena 1 km = 100.000 cm, hasilnya " + nf(km) + " km." };
  }
  if (tipe === 3){
    let P, H, Q;
    do { P = gRi(r, 20, 80); H = gRi(r, 10, 40); Q = gRi(r, 5, 40); } while ((P * H) % (P + Q) !== 0);
    const ans = P * H / (P + Q);
    return { q: "Persediaan makanan cukup untuk " + P + " orang selama " + H + " hari. Jika jumlah orang bertambah " + Q + ", persediaan makanan itu akan habis dalam...",
      o: opsiAngka(r, ans, [Math.round(H * (P + Q) / P), H - Q > 0 ? H - Q : H + 1, ans + 1, ans - 1, ans + 2], fUnit("hari"), 1),
      p: "Perbandingan berbalik nilai: makin banyak orang, makin cepat habis. " + P + " × " + H + " = " + (P + Q) + " × x, jadi x = " + (P * H) + " ÷ " + (P + Q) + " = " + ans + " hari." };
  }
  const rate = gRi(r, 8, 16), L = gRi(r, 3, 12), D = rate * L, ans = gRi(r, 5, 30), D2 = rate * ans;
  return { q: "Sebuah mobil menghabiskan " + L + " liter bensin untuk menempuh jarak " + D + " km. Bensin yang diperlukan untuk menempuh " + D2 + " km adalah...",
    o: opsiAngka(r, ans, [ans + 1, ans - 1, ans + 2, Math.round(D2 / L), ans * 2], fUnit("liter"), 1),
    p: "Perbandingan senilai: 1 liter untuk " + D + " ÷ " + L + " = " + rate + " km. Untuk " + D2 + " km perlu " + D2 + " ÷ " + rate + " = " + ans + " liter." };
}

/* ---------- RATA-RATA ---------- */
function genRata(r){
  const tipe = gRi(r, 0, 2);
  if (tipe === 0){
    let n, r1, d, v;
    do { n = gRi(r, 4, 9); r1 = gRi(r, 65, 85); d = gRi(r, 1, 3); v = (n + 1) * (r1 + d) - n * r1; } while (v > 100);
    const r2 = r1 + d;
    return { q: "Rata-rata nilai " + n + " siswa adalah " + r1 + ". Setelah ditambah nilai seorang siswa baru, rata-ratanya menjadi " + r2 + ". Nilai siswa baru tersebut adalah...",
      o: opsiAngka(r, v, [r2 + d, 2 * r2 - r1, v + 2, v - 2, r2], nf, 1),
      p: "Jumlah awal = " + n + " × " + r1 + " = " + (n * r1) + ". Jumlah baru = " + (n + 1) + " × " + r2 + " = " + ((n + 1) * r2) + ". Nilai siswa baru = " + ((n + 1) * r2) + " - " + (n * r1) + " = " + v + "." };
  }
  if (tipe === 1){
    let n1, r1, n2, r2;
    do { n1 = gRi(r, 10, 30); r1 = gRi(r, 60, 90); n2 = gRi(r, 10, 30); r2 = gRi(r, 60, 90); } while (r1 === r2 || n1 === n2 || ((n1 * r1 + n2 * r2) * 2) % (n1 + n2) !== 0);
    const ans = (n1 * r1 + n2 * r2) / (n1 + n2);
    return { q: "Rata-rata nilai kelas A yang terdiri atas " + n1 + " siswa adalah " + r1 + ", sedangkan rata-rata kelas B yang terdiri atas " + n2 + " siswa adalah " + r2 + ". Rata-rata nilai gabungan kedua kelas adalah...",
      o: opsiAngka(r, ans, [(r1 + r2) / 2, ans + 1, ans - 1, ans + 0.5, ans - 0.5], nf, 1),
      p: "Rata-rata gabungan = (" + n1 + " × " + r1 + " + " + n2 + " × " + r2 + ") ÷ (" + n1 + " + " + n2 + ") = " + (n1 * r1 + n2 * r2) + " ÷ " + (n1 + n2) + " = " + nf(ans) + ". Jangan dirata-rata biasa (" + nf((r1 + r2) / 2) + ") karena jumlah siswanya beda." };
  }
  let vals, X, fifth;
  do { vals = [0, 1, 2, 3].map(() => gRi(r, 55, 98)); X = gRi(r, 65, 90); fifth = 5 * X - vals.reduce((a, b) => a + b, 0); } while (fifth < 40 || fifth > 100);
  const sum4 = vals.reduce((a, b) => a + b, 0);
  return { q: "Rata-rata lima bilangan adalah " + X + ". Empat bilangan di antaranya adalah " + vals.join(", ") + ". Bilangan kelima adalah...",
    o: opsiAngka(r, fifth, [X, fifth + 5, fifth - 5, 4 * X - sum4 > 0 ? 4 * X - sum4 : fifth + 10, fifth + 1], nf, 1),
    p: "Jumlah lima bilangan = 5 × " + X + " = " + (5 * X) + ". Jumlah empat bilangan = " + sum4 + ". Bilangan kelima = " + (5 * X) + " - " + sum4 + " = " + fifth + "." };
}

/* ---------- PERBANDINGAN KUANTITATIF ---------- */
const PK_OPSI = ["P > Q", "P < Q", "P = Q", "2P = Q", "Hubungan P dan Q tidak dapat ditentukan"];
function pkHasil(P, Q){ return Math.abs(P - Q) < 1e-9 ? "P = Q" : (P > Q ? "P > Q" : "P < Q"); }
function pkOpsi(benar){ return [benar].concat(PK_OPSI.filter(x => x !== benar)); }
function genPK(r){
  for (let tries = 0; tries < 50; tries++){
    const tipe = gRi(r, 0, 3);
    if (tipe === 0){
      const L = [10, 20, 25, 30, 40, 50, 60, 75, 80];
      let a = gPick(r, L), b = 20 * gRi(r, 2, 20), c, d;
      if (r() < 0.3){ c = b; d = a; } else { c = gPick(r, L); d = 20 * gRi(r, 2, 20); }
      const P = a * b / 100, Q = c * d / 100;
      if (Math.abs(Q - 2 * P) < 1e-9) continue;
      const h = pkHasil(P, Q);
      return { q: "P = " + a + "% dari " + b + "\nQ = " + c + "% dari " + d + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(h),
        p: "P = " + nf(P) + " dan Q = " + nf(Q) + ", jadi " + h + "." + (c === b && d === a ? " Ingat: a% dari b selalu sama dengan b% dari a." : "") };
    }
    if (tipe === 1){
      const F = [[3, 8], [5, 8], [2, 3], [5, 7], [7, 10], [3, 4], [4, 5], [5, 6], [7, 9], [9, 11], [6, 7], [11, 15]];
      let [a, b] = gPick(r, F), [c, d] = gPick(r, F);
      if (a * d === c * b && a !== c) continue;
      if (r() < 0.25){ c = a * 2; d = b * 2; }
      const P = a / b, Q = c / d;
      if (Math.abs(Q - 2 * P) < 1e-9) continue;
      const h = pkHasil(P, Q);
      return { q: "P = " + a + "/" + b + "\nQ = " + c + "/" + d + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(h),
        p: "Bandingkan dengan kali silang: " + a + " × " + d + " = " + (a * d) + " dan " + c + " × " + b + " = " + (c * b) + ". Karena " + (a * d) + (a * d > c * b ? " > " : a * d < c * b ? " < " : " = ") + (c * b) + ", maka " + h + "." };
    }
    if (tipe === 2){
      const k = gRi(r, 3, 15), v = gRi(r, 0, 2);
      if (v === 0) return { q: "P² = " + (k * k) + "\nQ = " + k + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(PK_OPSI[4]),
        p: "P² = " + (k * k) + " berarti P bisa " + k + " atau -" + k + ". Kalau P = " + k + " maka P = Q, kalau P = -" + k + " maka P < Q. Karena tidak pasti, hubungannya tidak dapat ditentukan." };
      if (v === 1){ const kk = gRi(r, 2, 9), sgn = r() < 0.5 ? 1 : -1, Qv = sgn * kk; const h = pkHasil(kk, Qv);
        return { q: "P³ = " + (kk * kk * kk) + "\nQ = " + Qv + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(h),
          p: "Akar pangkat tiga hanya punya satu nilai: P = " + kk + ". Jadi " + h + ". Beda dengan kuadrat yang bisa positif atau negatif." }; }
      const Qv = k + gPick(r, [-1, 1]); const h = pkHasil(k, Qv);
      if (Math.abs(Qv - 2 * k) < 1e-9) continue;
      return { q: "P = √" + (k * k) + "\nQ = " + Qv + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(h),
        p: "Lambang √ berarti akar positif, jadi P = " + k + ". Karena Q = " + Qv + ", maka " + h + "." };
    }
    const pairs = [["0,375", 3, 8], ["0,625", 5, 8], ["0,875", 7, 8], ["0,125", 1, 8], ["0,6", 3, 5], ["0,75", 3, 4], ["0,4", 2, 5], ["0,35", 7, 20]];
    const [dec, a, b] = gPick(r, pairs), geser = gPick(r, [0, 0, 0.01, -0.01, 0.05]);
    const Pv = Math.round((parseFloat(dec.replace(",", ".")) + geser) * 1000) / 1000, Pstr = String(Pv).replace(".", ","), Q = a / b;
    const h = pkHasil(Pv, Q);
    if (h === "P < Q" && Math.abs(Q - 2 * Pv) < 1e-9) continue;
    return { q: "P = " + Pstr + "\nQ = " + a + "/" + b + "\nHubungan P dan Q yang tepat adalah...", o: pkOpsi(h),
      p: a + "/" + b + " = " + dec + ". Bandingkan dengan P = " + Pstr + ", jadi " + h + ". Hafalkan pecahan per 8 (1/8 = 0,125) biar cepat." };
  }
  return genPK(r);
}

/* ---------- FIGURAL (simbol) ---------- */
const PANAH = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
const md8 = i => ((i % 8) + 8) % 8;
function opsiSimbol(r, benar, pool){
  const o = [benar], lain = gShuf(r, pool.filter(x => x !== benar));
  for (const x of lain){ if (o.length >= 5) break; if (!o.includes(x)) o.push(x); }
  return o;
}
function genFigPutar(r){
  const pola = gPick(r, [[1], [2], [3], [1, 2], [2, 1], [1, 3], [3, 1]]), dir = r() < 0.5 ? 1 : -1;
  let i = gRi(r, 0, 7); const seq = [];
  for (let k = 0; k < 6; k++){ seq.push(PANAH[md8(i)]); i += dir * pola[k % pola.length]; }
  const ans = seq.pop();
  const arah = dir > 0 ? "searah jarum jam" : "berlawanan arah jarum jam";
  const desk = pola.length === 1 ? pola[0] * 45 + "° tiap langkah" : "selang-seling " + pola[0] * 45 + "° lalu " + pola[1] * 45 + "°";
  return { q: "Gambar yang tepat untuk menggantikan tanda tanya adalah...", fig: seq.join("   ") + "   ?", figOpt: true,
    o: opsiSimbol(r, ans, PANAH), p: "Panah berputar " + arah + " " + desk + ". Langkah berikutnya menghasilkan " + ans + "." };
}
function genFigTitik(r){
  const n = gRi(r, 5, 6), k = gPick(r, [1, 2]), dir = r() < 0.5 ? 1 : -1; let pos = gRi(r, 0, n - 1);
  const frame = p => Array.from({ length: n }, (_, j) => j === p ? "●" : "○").join("");
  const fr = []; for (let i = 0; i < 5; i++){ fr.push(frame(md(pos, n))); pos += dir * k; }
  function md(x, m){ return ((x % m) + m) % m; }
  const ans = fr.pop();
  const pool = Array.from({ length: n }, (_, j) => frame(j));
  return { q: "Gambar yang tepat untuk menggantikan tanda tanya adalah...", fig: fr.join("   ") + "   ?", figOpt: true,
    o: opsiSimbol(r, ans, pool), p: "Titik hitam bergeser " + k + " kotak ke " + (dir > 0 ? "kanan" : "kiri") + " setiap langkah, dan muncul lagi dari ujung lain kalau melewati batas." };
}
function genFigGrid(r){
  const BORDER = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0]];
  const s = gPick(r, [1, 2]), dir = r() < 0.5 ? 1 : -1; let i = gRi(r, 0, 7);
  const grid = idx => { const [rr, cc] = BORDER[md8(idx)]; return [0, 1, 2].map(y => [0, 1, 2].map(x => (y === rr && x === cc) ? "■" : "□").join("")).join("\n"); };
  const fr = []; for (let k = 0; k < 5; k++){ fr.push(grid(i)); i += dir * s; }
  const ans = fr.pop();
  const rows = [0, 1, 2].map(y => fr.map(g => g.split("\n")[y]).join("   ") + (y === 1 ? "   ?" : "    "));
  const pool = [0, 1, 2, 3, 4, 5, 6, 7].map(grid);
  return { q: "Kotak hitam bergerak mengikuti pola tertentu. Gambar yang tepat untuk menggantikan tanda tanya adalah...", fig: rows.join("\n"), figOpt: true,
    o: opsiSimbol(r, ans, pool), p: "Kotak hitam berjalan di tepi kotak besar " + (dir > 0 ? "searah" : "berlawanan arah") + " jarum jam sejauh " + s + " langkah setiap gambar." };
}
function genFigBeda(r){
  const aturan = gPick(r, [{ d: 4, nama: "saling berlawanan arah" }, { d: 2, nama: "membentuk sudut siku-siku searah jarum jam" }, { d: 0, nama: "menunjuk arah yang sama" }]);
  const awal = gShuf(r, [0, 1, 2, 3, 4, 5, 6, 7]);
  const benarPairs = awal.slice(0, 4).map(a => PANAH[a] + " " + PANAH[md8(a + aturan.d)]);
  const a = awal[4], salahD = gPick(r, [1, 3, 5, 6, 7].filter(x => x !== aturan.d && !(aturan.d === 2 && x === 6)));
  const beda = PANAH[a] + " " + PANAH[md8(a + salahD)];
  return { q: "Manakah pasangan gambar yang berbeda dari yang lain?", figOpt: true, o: [beda].concat(benarPairs),
    p: "Empat pasangan lainnya " + aturan.nama + ". Hanya pasangan " + beda + " yang tidak mengikuti aturan itu." };
}
function genFigPola(r){
  const [s1, s2] = gPick(r, [["●", "○"], ["▲", "△"], ["■", "□"], ["★", "☆"]]), c0 = gRi(r, 1, 2), inc = gPick(r, [1, 2]);
  const grp = i => (i % 2 === 0 ? s1 : s2).repeat(c0 + i * inc);
  const fr = [0, 1, 2, 3].map(grp), ans = grp(4), n = c0 + 4 * inc;
  const salahSimbol = (s1 === ans[0] ? s2 : s1).repeat(n);
  const pool = [salahSimbol, ans[0].repeat(n - 1), ans[0].repeat(n + 1), Array.from({ length: n }, (_, j) => j % 2 ? s2 : s1).join(""), salahSimbol.slice(0, -1)];
  const o = [ans]; pool.forEach(x => { if (o.length < 5 && x && !o.includes(x)) o.push(x); });
  return { q: "Gambar yang tepat untuk melanjutkan pola berikut adalah...", fig: fr.join("   ") + "   ?", figOpt: true, o,
    p: "Jumlah simbol bertambah " + inc + " setiap langkah (" + [0, 1, 2, 3, 4].map(i => c0 + i * inc).join(", ") + ") dan jenis simbolnya bergantian " + s1 + " lalu " + s2 + ". Gambar kelima: " + n + " simbol " + ans[0] + "." };
}
function genFigAnalogi(r){
  const rot = gPick(r, [1, 2, 3, 5, 6, 7]), i = gRi(r, 0, 7); let j = gRi(r, 0, 7); if (j === i) j = md8(i + 3);
  const A = PANAH[i], B = PANAH[md8(i + rot)], C = PANAH[j], ans = PANAH[md8(j + rot)];
  const cw = rot <= 4, deg = (cw ? rot : 8 - rot) * 45;
  return { q: "Setiap pasangan diputar dengan aturan yang sama. Gambar yang tepat untuk menggantikan tanda tanya adalah...", fig: A + " : " + B + "   =   " + C + " : ?", figOpt: true,
    o: opsiSimbol(r, ans, PANAH), p: "Dari " + A + " ke " + B + " panah diputar " + deg + "° " + (cw ? "searah" : "berlawanan arah") + " jarum jam. Putaran yang sama pada " + C + " menghasilkan " + ans + "." };
}

/* ---------- DAFTAR GENERATOR ---------- */
const GEN_TIU = {
  deret:       { label: "Deret angka", grup: "deret", fn: genDeret },
  hitung:      { label: "Berhitung cepat", grup: "hitung", fn: genHitung },
  pk:          { label: "Perbandingan kuantitatif", grup: "pk", fn: genPK },
  dagang:      { label: "Diskon, untung rugi, bunga", grup: "cerita", fn: genDagang },
  kecepatan:   { label: "Jarak dan kecepatan", grup: "cerita", fn: genKecepatan },
  kerja:       { label: "Pekerjaan dan pekerja", grup: "cerita", fn: genKerja },
  rasio:       { label: "Perbandingan, skala, umur", grup: "cerita", fn: genRasio },
  rata:        { label: "Rata-rata", grup: "cerita", fn: genRata },
  fig_putar:   { label: "Figural: rotasi panah", grup: "figural", fn: genFigPutar },
  fig_titik:   { label: "Figural: titik bergeser", grup: "figural", fn: genFigTitik },
  fig_grid:    { label: "Figural: kotak berjalan", grup: "figural", fn: genFigGrid },
  fig_beda:    { label: "Figural: ketidaksamaan", grup: "figural", fn: genFigBeda },
  fig_pola:    { label: "Figural: pola simbol", grup: "figural", fn: genFigPola },
  fig_analogi: { label: "Figural: analogi putaran", grup: "figural", fn: genFigAnalogi }
};
