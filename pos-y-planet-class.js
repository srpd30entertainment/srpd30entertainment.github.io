const planet = document.querySelector('.planet');
const root = document.documentElement;

function updatePlanetPosY() {
  if (!planet) return;

  const rect = planet.getBoundingClientRect();
  root.style.setProperty("--pos_y_planet", rect.top + "px");
}

function loop() {
  updatePlanetPosY();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
