let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/rU2E0kBfl/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let bg1;

let startTime;
let countdownTime = 30; // 30 seconds
let myFont;

// Load the model first

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  myFont = loadFont(typography);
}

function setup() {
  // Record the start time
  startTime = millis();

  createCanvas(200, 100);
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);

  flippedVideo = ml5.flipImage(video);
  video.hide(); // Hide the video
  flippedVideo.hide();
  // Start classifying
  classifyVideo();
}

//window.location.href = "/sound.html";
