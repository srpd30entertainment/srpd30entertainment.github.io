const infomartion_data = document.getElementById("info-data");
const scene = document.querySelector(".scene"); // target .scene untuk --result-test
const startTime = performance.now();

// ===================== CSS VARIABLE READER =====================
function cssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// ===================== ROTATE DEBUG SETUP =====================
const speed = getComputedStyle(infomartion_data)
  .getPropertyValue("--speed-animation")
  .trim();

const duration =
  speed.endsWith("s")
    ? parseFloat(speed) * 1000
    : parseFloat(speed);

const index =
  parseInt(getComputedStyle(infomartion_data).getPropertyValue("--i")) || 1;

const baseAngleY = (index - 1) * 36;
// =============================================================

function update(time) {
  const container = document.getElementById("controls");
  const rect = infomartion_data.getBoundingClientRect();
  container.textContent = "";

  // ===================== PANEL DEBUG DASAR =====================
  const debugItems = [
    { label: "class", value: infomartion_data.className || "(no class)" },
    {
      label: "inline style",
      value: infomartion_data.style.length
        ? [...infomartion_data.style].join(", ")
        : "(no inline style)"
    },
    { label: "window width", value: window.innerWidth },
    { label: "window height", value: window.innerHeight },
    { label: "scrollX", value: window.scrollX.toFixed(2) },
    { label: "scrollY", value: window.scrollY.toFixed(2) },
  ];

  debugItems.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.label} : ${item.value}`;
    container.appendChild(p);
  });

  container.appendChild(document.createElement("hr"));

  // ===================== ROTATE DEBUG =====================
  const elapsed = (time - startTime) % duration;
  const progress = elapsed / duration;
  const rotateY = (progress * 360 + baseAngleY) % 360;

  const rotateXValue = cssVar("--rotX3d") || "0deg";

  const rotateInfoItems = [
    { label: "rotateY", value: rotateY.toFixed(2) + "deg" },
    { label: "rotateX", value: rotateXValue }
  ];

  rotateInfoItems.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.label} : ${item.value}`;
    container.appendChild(p);
  });

  container.appendChild(document.createElement("hr"));

  // ===================== CSS VARIABLE DEBUG =====================
  const debugVars = [
    "--window-width",
    "--window-height",
    "--scrollXport",
    "--scrollYport",
    "--rotX3d",
    "--pos_y_planet",
    "--result-test"
  ];

  debugVars.forEach(v => {
    const p = document.createElement("p");
    p.textContent = `${v} : ${cssVar(v)}`;
    container.appendChild(p);
  });

  container.appendChild(document.createElement("hr"));

  // ===================== BOUNDING RECT =====================
  for (const key in rect) {
    if (typeof rect[key] !== "function") {
      const p = document.createElement("p");
      p.textContent = `${key} : ${rect[key]}`;
      container.appendChild(p);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  function loop(time) {
    update(time);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
