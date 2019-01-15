function showAnswer() {
  var standard = document.getElementById("standard-id")
  standard.style.display = "none";
  console.log("Show answeer working")

  var speak = document.getElementById("speak-id")
  speak.style.display = "block";

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
