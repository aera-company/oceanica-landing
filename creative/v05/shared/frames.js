const f = new URLSearchParams(location.search).get("f") || "1";
document.body.dataset.f = f;
if (f === "m") {
  document.documentElement.classList.add("m");
  const nav = document.querySelector(".nav"); if (nav) nav.style.display = "none";
  const r = document.querySelector(".r"); if (r) r.innerHTML = "<span>PT / EN</span><span>☰</span>";
  const m = document.querySelector(".meter"); if (m) { m.style.left = "20px"; m.style.right = "20px"; m.style.top = "60px"; }
  const h = document.querySelector(".head"); if (h) { h.style.left = "20px"; h.style.right = "20px"; h.style.height = "60px"; }
}
const p = { 1: 0.04, 2: 0.42, 3: 0.86, m: 0.04 }[f];
document.querySelectorAll(".meter i").forEach((i) => (i.style.width = p * 100 + "%"));
