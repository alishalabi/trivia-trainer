// Pronounce Help Function

let questionSpeech = document.getElementById('question').innerHTML;

function pronounce() {
    var utterThis = new SpeechSynthesisUtterance(questionSpeech);
    utterThis.lang = "en-AU";
    utterThis.rate = 0.9;
    utterThis.pitch = 1.5;
    window.speechSynthesis.speak(utterThis);
}

// function showAnswer() {
//   var answer = document.getElementById("answer")
//   answer.style.backgroundColor = "white";
//
//   var fyi = document.getElementById("fyi")
//   fyi.style.display = "block";
//
//   var show = document.getElementById("show")
//   show.style.display= "none";
//
//   var question = document.getElementById("question")
//   question.style.display = "block";
//
// }
