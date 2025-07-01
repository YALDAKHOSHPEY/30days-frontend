const container = document.getElementById("container");
const toggleBtn = document.getElementById("toggleTheme");
const clock = document.getElementById("clock");

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  container.classList.add("dark");
  toggleBtn.textContent = "☀️ Toggle Theme";
} else {
  toggleBtn.textContent = "🌙 Toggle Theme";
}

// Update clock every second
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock(); // first call

// Theme switcher
toggleBtn.addEventListener("click", () => {
  container.classList.toggle("dark");

  if (container.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ light Theme";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 dark Theme";
  }
});
