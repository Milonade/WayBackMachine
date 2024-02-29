let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/u3yrDov73/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let bg1;

let startTime;
let countdownTime = 30; // 30 seconds

// Load the model first

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  bg1 = loadImage("asset/img/90s.jpg");
}

function setup() {
  // Record the start time
  startTime = millis();
  document
    .getElementById("error-button")
    .addEventListener("click", function () {
      document.body.style.backgroundImage = "url('asset/img/90s.jpg')";
      document.getElementById("error-message").style.display = "none"; // Hide the "message-error" element

      createCanvas(160, 120);
      // Create the video
      video = createCapture(VIDEO);
      video.size(160, 120);
      video.hide();

      flippedVideo = ml5.flipImage(video);
      // Start classifying
      classifyVideo();
    });
}

//window.location.href = "/sound.html";

function draw() {
  let elapsedTime = millis() - startTime;
  let secondsElapsed = Math.floor(elapsedTime / 1000);
  let timeRemaining = countdownTime - secondsElapsed;
  timeRemaining = max(timeRemaining, 0);

  background(0, 0, 0, 0);
  // Draw the video
  if (video) {
    image(flippedVideo, 0, 0);
    // Display the timer
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Timer: " + timeRemaining, width / 2, 10);
    // Draw the label
    /*fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);*/
  }
  if (label === "IPod") {
    document.body.style.backgroundImage = "url('asset/img/2000s.png')";
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
