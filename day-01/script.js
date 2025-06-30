const card = document.getElementById("card");
const btn = document.getElementById("toggleTheme");
const githubLink = document.getElementById("githubLink");

// Apply saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  card.classList.add("dark");
  btn.textContent = "☀️ Change Theme";
  githubLink.textContent = "Vida's Github";
  githubLink.href = "https://github.com/VIDAKHOSHPEY22";
} else {
  btn.textContent = "🌙 Change Theme";
  githubLink.textContent = "Yalda's Github";
  githubLink.href = "https://github.com/YALDAKHOSHPEY";
}

// Theme toggle button click event
btn.addEventListener("click", () => {
  card.classList.toggle("dark");

  if (card.classList.contains("dark")) {
    btn.textContent = "☀️ Change Theme";
    localStorage.setItem("theme", "dark");

    // Change GitHub link and text for dark mode
    githubLink.textContent = "Vida's Github";
    githubLink.href = "https://github.com/VIDAKHOSHPEY22";
  } else {
    btn.textContent = "🌙 Change Theme";
    localStorage.setItem("theme", "light");

    // Revert GitHub link and text to default
    githubLink.textContent = "Yalda's Github";
    githubLink.href = "https://github.com/YALDAKHOSHPEY";
  }
});
