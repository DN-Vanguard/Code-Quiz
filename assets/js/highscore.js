// global variables
var highscoreListEl = document.querySelector("#highscoreList");
var clearButton = document.querySelector("#clear");

// Retrieval of users scores
var storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];

// Load List
for(var i = 0; i < storedScores.length; i++) {
    var li = document.createElement("li");
    li.textContent = 
    `${i+1}. ${storedScores[i].initials} - ${storedScores[i].answerScore}/5`;
    highscoreListEl.append(li);
}
// Clicking the clear button will not only clear the highscores, but also wipe them from your local storage.
clearButton.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});