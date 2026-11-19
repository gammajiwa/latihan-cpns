/* Rakit semua halaman jadi file statis di root repo (siap GitHub Pages).
   Pakai:  node sumber/build.js          -> index.html, skd.html, skb.html, sw.js
           node sumber/build.js --pdf    -> + render ulang PDF di folder pdf/ (butuh Microsoft Edge)
   Isi soal diedit di sumber/skd/*.js dan sumber/skb/*.js, lalu jalankan build lagi. */
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const SRC = __dirname, ROOT = path.join(SRC, "..");
const baca = (...p) => fs.readFileSync(path.join(SRC, ...p), "utf8");
const ada = (...p) => fs.existsSync(path.join(SRC, ...p));
const CSS = baca("shared", "style.css") + baca("shared", "style-tambahan.css");
const HEAD = baca("shared", "pwa-head.html");

function rakit(template, isi){
  let html = template.replace("<!--__HEAD__-->", () => HEAD);
  for (const [k, v] of Object.entries(isi)) html = html.replace(k, () => v);
  if (/[\u2013\u2014]/.test(html)) throw new Error("ada em dash / en dash");
  if (/__[A-Z_]+__/.test(html)) throw new Error("placeholder belum terisi: " + html.match(/__[A-Z_]+__/)[0]);
  return html;
}
function hitung(code, nama){ return new Function(code + "\nreturn " + nama + ";")(); }

/* ---- SKD ---- */
const skdBanks = ["bank-twk.js", "bank-lama.js", "bank-tiu-verbal.js", "bank-tkp-baru.js", "gen-tiu.js"].map(f => baca("skd", f)).join("\n");
const skd = rakit(baca("skd", "app.html"), {
  "/*__CSS__*/": CSS, "<!--__CONTEKAN__-->": baca("skd", "contekan.html"), "<!--__TIPS__-->": baca("skd", "tips.html"), "/*__BANKS__*/": skdBanks
});
const nSKD = hitung(skdBanks, "BANK_TWK.length + LAMA_TIU_VERBAL.length + BANK_TIU_VERBAL.length + LAMA_TKP.length + BANK_TKP_BARU.length");
const gSKD = hitung(skdBanks, "Object.keys(GEN_TIU).length");

/* ---- SKB ---- */
const skbFiles = ["bank-skb-a.js", "bank-skb-b.js", "bank-skb-c.js", "gen-lab.js"].filter(f => ada("skb", f));
const skbBanks = skbFiles.map(f => baca("skb", f)).join("\n");
const skb = rakit(baca("skb", "app-skb.html"), {
  "/*__CSS__*/": CSS + baca("skb", "skb-theme.css"), "<!--__CONTEKAN__-->": baca("skb", "contekan-skb.html"), "<!--__TIPS__-->": baca("skb", "tips-skb.html"), "/*__BANKS__*/": skbBanks
});
const nSKB = hitung(skbBanks, "BANK_SKB_A.length + BANK_SKB_B.length + (typeof BANK_SKB_C !== 'undefined' ? BANK_SKB_C.length : 0)");
const gSKB = hitung(skbBanks, "Object.keys(GEN_LAB).length");
const bSKB = hitung(skbBanks, "new Set(BANK_SKB_A.concat(BANK_SKB_B, typeof BANK_SKB_C !== 'undefined' ? BANK_SKB_C : []).map(x => x.t)).size");

/* ---- Halaman depan ---- */
const index = rakit(baca("landing.html"), {
  "/*__CSS__*/": CSS, "__N_SKD__": String(nSKD), "__G_SKD__": String(gSKD), "__N_SKB__": String(nSKB), "__G_SKB__": String(gSKB), "__B_SKB__": String(bSKB)
});

/* ---- Service worker (versi baru tiap build supaya HP ambil update) ---- */
const ver = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
const sw = baca("shared", "sw.js").replace("__VER__", ver);

for (const [f, isi] of [["index.html", index], ["skd.html", skd], ["skb.html", skb], ["sw.js", sw]]) fs.writeFileSync(path.join(ROOT, f), isi);
console.log("OK build " + ver + " | SKD " + nSKD + " soal + " + gSKD + " generator | SKB " + nSKB + " soal, " + bSKB + " bidang + " + gSKB + " generator");

/* ---- PDF (opsional) ---- */
if (process.argv.includes("--pdf")){
  const edge = ["C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].find(p => fs.existsSync(p));
  if (!edge) throw new Error("Microsoft Edge tidak ditemukan");
  const pdfDir = path.join(ROOT, "pdf"); fs.mkdirSync(pdfDir, { recursive: true });
  const prof = path.join(require("os").tmpdir(), "latihan-cpns-edge");
  const url = f => "file:///" + path.join(ROOT, f).replace(/\\/g, "/").replace(/ /g, "%20");
  for (const [file, hash, out] of [["skd.html", "#cetak-soal", "Bank-Soal-SKD.pdf"], ["skd.html", "#cetak-contekan", "Contekan-SKD.pdf"],
                                  ["skb.html", "#cetak-soal", "Bank-Soal-SKB-Analis-Lab.pdf"], ["skb.html", "#cetak-contekan", "Contekan-SKB-Analis-Lab.pdf"]]){
    execFileSync(edge, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--user-data-dir=" + prof, "--virtual-time-budget=6000",
      "--print-to-pdf=" + path.join(pdfDir, out), url(file) + hash], { stdio: "ignore" });
    console.log("PDF " + out);
  }
}
