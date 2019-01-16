function showAnswer() {
  var standard = document.getElementById("standard-id")
  standard.style.display = "none";


  var speak = document.getElementById("speak-id")
  speak.style.display = "block";

  // const inner = doument.getElementById("inner")
  // inner.style.transform = "rotateY(180deg)"
  // // inner.style.webkitTransform = "rotateY(180deg)"
  //
  // const answer = document.getElementById("answer")
  // answer.style.transform = "rotateY(180deg)"
  // // answer.style.webkitTransform = "rotateY(180deg)"

  var answer = document.getElementById("answer");
  answer.classList.add("show-answer")

}

// Pronounce Help Function

let questionSpeech = document.getElementById('question').innerHTML;

function pronounce() {
    var utterThis = new SpeechSynthesisUtterance(questionSpeech);
    utterThis.lang = "en-AU";
    utterThis.rate = 0.9;
    utterThis.pitch = 1.4;
    window.speechSynthesis.speak(utterThis);
}
