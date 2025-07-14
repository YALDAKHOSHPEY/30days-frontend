const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hot Mail", "How To Make Lasagna"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS"],
    answer: "CSS"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>", "<javascript>"],
    answer: "<script>"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  nextBtn.disabled = true;
  const currentQ = questions[currentIndex];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";

  currentQ.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, option));
    optionsEl.appendChild(li);
  });
}

function selectOption(element, selected) {
  const allOptions = document.querySelectorAll("ul li");
  allOptions.forEach(li => li.classList.remove("selected"));
  element.classList.add("selected");
  nextBtn.disabled = false;

  if (selected === questions[currentIndex].answer) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

restartBtn.addEventListener("click", () => {
  score = 0;
  currentIndex = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  showQuestion();
});

function endQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

showQuestion();
