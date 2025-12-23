const orbiters = document.querySelectorAll(".orbiter");

orbiters.forEach(orbiter => {
  const style = getComputedStyle(orbiter);

  // Durasi animasi
  const speedStr = style.getPropertyValue("--speed-animation").trim();
  const duration = speedStr.endsWith("s")
    ? parseFloat(speedStr) * 1000
    : parseFloat(speedStr);

  // Index orbiter
  const i = parseFloat(style.getPropertyValue("--i")) || 1;
  const baseAngle = (i - 1) * 36;

  const startTime = performance.now();

  function loop(time) {
    const elapsed = (time - startTime) % duration;
    const progress = elapsed / duration;

    const rotateY = (progress * 360 + baseAngle) % 360;
    const ry = rotateY / 360;
    orbiter.style.setProperty("--ry", ry.toFixed(4));

    // brightness: 90° = 1, 270° = 0.5 (minimum), 180 & 360 = 0.75
    // Rumus: brightness = 0.5 + 0.5 * cos((rotateY - 90) * PI / 180) * 0.5 + 0.5
    // Sederhananya: brightness = 0.5 + 0.5 * cos((rotateY - 90) * PI / 180) * 0.5
    const brightness = 0.7 + 0.3 * Math.cos((rotateY - 90) * Math.PI / 180); 
    orbiter.style.setProperty("--brightness", brightness.toFixed(3));

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});
