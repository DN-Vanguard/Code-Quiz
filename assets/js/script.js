// global variables
    //header
var timerEl = document.querySelector("#timer");
var timeRemaining;
var timerInterval;
    // Start
var startButtonEl = document.querySelector("#startButton");
var startEl = document.querySelector("#start");
    // Questions
var questionsScreenEl = document.querySelector("#questionsScreen");
var questionsEl = document.querySelector("#questions");
var multipleChoiceOptionsEl = document.querySelector("#multipleChoiceOptions");
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var correctAnswers;
var correctOrWrongPopUp;
var index;
    //Ending
var finishedEl = document.querySelector("#finished");
var correctScoreSpan = document.querySelector("#correctScore");
var formEl = document.querySelector("#initialForm");
var initalsEl = document.querySelector("#initials");


//updates the timer to its current value
function updateTimer(){
    timerEl.textContent = timeRemaining;
}
//once the start button is clicked, the starting screen will be hidden, and the questions screen will appear because the questions screen default state is hidden.
function gameStart() {
    startEl.classList.add("hidden");
    questionsScreenEl.classList.remove("hidden");

    index = 0;
    correctAnswers = 0;
    timeRemaining = 75;

    timer();
    loadQuestions();
}
//Timer will begin ticking down by 1 second.
function timer(){
    timerInterval = setInterval(function(){
        timeRemaining -= 1;

        updateTimer();

        if(timeRemaining <= 0 || index === questions.length){
            gameOver();
        } 

    } ,1000);
}
//This function calls the separate js file named questions.js, and applies the questions into the HTML. All 5 questions are stored as an array.
function loadQuestions() {
    multipleChoiceOptionsEl.innerHTML = "";
    questionsEl.textContent = questions[index].question; // Here we are calling all the strings in "question" from the separate questions.js file.
    questions[index].choices;

    //Down below, for loop allows access to the multiple choice options from the separate file questions.
    for(var i = 0; i < questions[index].choices.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("data-answer", questions[index].choices[i]);
        button.textContent = questions[index].choices[i];
        multipleChoiceOptionsEl.append(button);
    }
}
//signals to the user that they either selected the right OR wrong answer, and eventually disappears.
function correctOrWrongTimer() {
    correctOrWrongPopUp = setTimeout(hideCorrectOrWrongPopUp, 1000);
}
//Change default to hidden
function hideCorrectOrWrongPopUp() {
    correctEl.classList.add("hidden");
    wrongEl.classList.add("hidden");
}
//display "correct" prompt
function correctAnswer() {
    correctAnswers++;
    correctEl.classList.remove("hidden");
}
//subtract 10 seconds from timer and display "wrong" prompt
function wrongAnswer() {
    timeRemaining -= 10;
    updateTimer();
    wrongEl.classList.remove("hidden");
}
//Making sure if answer was correct or not.
function checkAnswer(event) {
    if(event.target.type === "submit") {
        clearTimeout(correctOrWrongPopUp);
        hideCorrectOrWrongPopUp();
        
        var answer = event.target.getAttribute("data-answer");

        answer === questions[index].correct ? correctAnswer() : wrongAnswer();

        nextQuestion();
    }
}
//Index will continue to flow through the series of questions and if user has reached the last question, coding-challenge will end.
function nextQuestion() {
    index++;

    correctOrWrongTimer();

    if(index === questions.length) {
        gameOver();
    }

    loadQuestions();
}
//Stops timer and transition into finished screen.
function gameOver(){
    clearInterval(timerInterval);

    if (timeRemaining < 0){
        timeRemaining = 0;
    }

    updateTimer();

    questionsScreenEl.classList.add("hidden");
    finishedEl.classList.remove("hidden");
    
    correctScoreSpan.textContent = correctAnswers;
}
//Saves users score locally, and prepares to show once it is called when pressing the submit button.
function score(event){
    event.preventDefault();

    var scoreData = {
        initials: initialsEl.value,
        answerScore: correctAnswers,
        timeScore: timeRemaining
    };

    var storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
    storedScores.push(scoreData);
    localStorage.setItem("storedScores", JSON.stringify(storedScores));

    window.location = "assets/html/highscore.html";
}


//Event Listeners
startButtonEl.addEventListener("click", gameStart);
questionsScreenEl.addEventListener("click", checkAnswer);
formEl.addEventListener("submit", score);