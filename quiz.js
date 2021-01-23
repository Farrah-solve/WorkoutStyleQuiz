const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCountText = document.getElementById("questionCount");
var scoreText = document.getElementById("score");
var timerText = document.getElementById("timer");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var timer = 90;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
  {
    question: "What style of exercise is Cycling?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 1,
  },
  {
    question: "What style of exercise is Plough?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 4,
  },
  {
    question: "What style of exercise is Bench Press?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 3,
  },
  {
    question: "What style of exercise is Burpees?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 2,
  },
  {
    question: "What style of exercise is Downward-Facing Dog?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 4,
  },
  {
    question: "What style of exercise is Seated Row?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 3,
  },
  {
    question: "What style of exercise is Plank?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 2,
  },
  {
    question: "What style of exercise is Skipping Rope?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 1,
  },
  {
    question: "What style of exercise is Squat Jumps?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 2,
  },
  {
    question: "What style of exercise is Locust?",
    choice1: "Aerobic",
    choice2: "Bodyweight",
    choice3: "Strength Training",
    choice4: "Yoga",
    answer: 4,
  },
];

const correctBonus = 10;
const maxQuestions = 10;
const wrongPenalty = -15;

function startGame() {
  questionCounter = 0;
  score = 0;
  timeDown();
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (
    availableQuestions.length === 0 ||
    questionCounter > maxQuestions ||
    timer === 0
  ) {
    localStorage.setItem("lastQuizScore", score);
    return window.location.assign("result.html");
  }
  questionCounter++;
  questionCountText.innerText = questionCounter + "/" + maxQuestions;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    var classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      scoreUp(correctBonus);
    } else {
      timer -= 15;
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function scoreUp(num) {
  score += num;
  scoreText.innerText = score;
}

function timeDown() {
  timer = 90;
  var interval = setInterval(function () {
    document.getElementById("timer").innerHTML = timer;
    timer--;
    timerText.innerText = timer;
    if (timer <= 0) {
      clearInterval(interval);
      localStorage.setItem("lastQuizScore", score);
      return window.location.assign("result.html");
    }
  }, 1000);
}

startGame();
