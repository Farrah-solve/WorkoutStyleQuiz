const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("save-score");
const finalScore = document.getElementById("quiz-score");

const lastQuizScore = localStorage.getItem("lastQuizScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScore = 5;

finalScore.innerText = "Score: " + lastQuizScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: lastQuizScore,
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
}
