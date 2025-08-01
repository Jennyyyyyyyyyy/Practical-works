// DOM 元素
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "貓一天大約會花多少時間在睡覺？",
    answers: [
      { text: "8 小時", correct: false },
      { text: "16 小時", correct: true },
      { text: "24 小時", correct: false },
      { text: "12 小時", correct: false },
    ],
  },
  {
    question: "哪一種水果的籽是長在外面的？",
    answers: [
      { text: "奇異果", correct: false },
      { text: "芒果", correct: false },
      { text: "草莓 ", correct: true },
      { text: "西瓜", correct: false },
    ],
  },
  {
    question: "世界上最愛喝咖啡的國家是哪一個？",
    answers: [
      { text: "義大利", correct: false },
      { text: "美國", correct: false },
      { text: "法國", correct: false },
      { text: "芬蘭", correct: true },
    ],
  },
  {
    question: "以下哪個動物可以睡覺時保持站立？",
    answers: [
      { text: "狗", correct: false },
      { text: "貓", correct: false },
      { text: " 馬", correct: true },
      { text: "熊", correct: false },
    ],
  },
  {
    question: "章魚有幾顆心臟？",
    answers: [
      { text: "3 顆", correct: true },
      { text: "2 顆", correct: false },
      { text: "1 顆", correct: false },
      { text: "4 顆", correct: false },
    ],
  },
];

// 測驗狀態變數
let currentQuestionIndex = 0; //目前問題索引
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//事件監聽器(偵測使用者操作)
startButton.addEventListener("click" , startQuiz);
restartButton.addEventListener("click" , restartQuiz);

function startQuiz(){
  // 重設變數
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion(); 
}

function showQuestion() {
  // 重設狀態
  answersDisabled = false

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length)*100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("div");//
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    //dataset:是按鈕元素（button element）的一個屬性，可以用來儲存自訂的資料
    button.dataset.correct = answer.correct;

    button.addEventListener("click" ,selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event){
  // 最佳化檢查
  if(answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect =selectedButton.dataset.correct ==="true";

  Array.from(answersContainer.children).forEach((button) => {
    if(button.dataset.correct ==="true"){
      button.classList.add("correct");
    }else if (button === selectedButton){
      button.classList.add("incorrect");
    } 
  });

  if(isCorrect){
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() =>{
    currentQuestionIndex++;

    // 檢查是否還有更多題目，或是問答遊戲已經結束
    if(currentQuestionIndex < quizQuestions.length){
      showQuestion();
    }else{
      showResults();
    }
  },1000);
}

function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length)*100;

  if(percentage === 100){
    resultMessage.textContent = "你根本外星人吧？全對！請收下這座虛擬金牌🥇";
  }else if (percentage >= 80){
    resultMessage.textContent = "大腦發燙中建議你冷靜一下，太聰明會冒煙🧠";
  }else if (percentage >= 60){
    resultMessage.textContent = "你這分數剛好可以拿去換一碗滷肉飯😏";
  }else if (percentage >= 40){
    resultMessage.textContent = "嗯...你肯定是在靠第六感在作答🤪";
  }else{
    resultMessage.textContent = "我看你這種成績齁……只能轉生成史萊姆了🫠"
  }
}

function restartQuiz(){
  resultScreen.classList.remove("active");

  startQuiz();
}


