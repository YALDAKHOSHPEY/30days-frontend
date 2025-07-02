newFunction();

function newFunction() {
    document.addEventListener("DOMContentLoaded", () => {
        const moodBtn = document.getElementById("moodBtn");
        const moodText = document.getElementById("moodText");
        const themeToggle = document.getElementById("themeToggle");
        const body = document.body;

        const moods = [
            {
                emoji: "😐",
                text: "Hey!how are you don't click ok.",
                color: "#dfe6e9"
            },
            {
                emoji: "😠",
                text: "Seriously? You clicked why?!",
                color: "#ffeaa7"
            },
            {
                emoji: "😡",
                text: "what do you want to achieve!",
                color: "#fab1a0"
            },
            {
                emoji: "🤬",
                text: "I WILL KILL YOU!",
                color: "#ff7675"
            },
            {
                emoji: "💣",
                text: "That's it. Self-destruct in 3... 2... 💥",
                color: "#e17055"
            },
            {
                emoji: "🤖",
                text: "Error 404: Patience not found.",
                color: "#81ecec"
            },
            {
                emoji: "🧠",
                text: "You’re lucky I don’t have hands.",
                color: "#55efc4"
            },
            {
                emoji: "😵",
                text: "I'm too pretty for this kind of stress.",
                color: "#a29bfe"
            }
        ];

        let moodIndex = 0;

        moodBtn.addEventListener("click", () => {
            const mood = moods[moodIndex % moods.length];

            moodBtn.textContent = mood.emoji;
            moodText.textContent = mood.text;

            if (body.classList.contains("dark")) {
                body.style.backgroundColor = shadeColor(mood.color, -50);
            } else {
                body.style.backgroundColor = mood.color;
            }

            moodIndex++;
        });

        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            themeToggle.textContent = body.classList.contains("dark")
                ? "☀️ Toggle Theme"
                : "🌙 Toggle Theme";

            const currentMood = moods[moodIndex % moods.length];
            body.style.backgroundColor = body.classList.contains("dark")
                ? shadeColor(currentMood.color, -50)
                : currentMood.color;
        });

        function shadeColor(color, percent) {
            const num = parseInt(color.replace("#", ""), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;

            return "#" + (
                0x1000000 +
                (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 0 ? 0 : B) : 255)
            ).toString(16).slice(1);
        }
    });
}
    