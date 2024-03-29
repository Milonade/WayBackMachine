/**
 * Draws the main canvas and handles the timer logic.
 */

function draw() {
  background(0, 0, 0);
  let elapsedTime = millis() - startTime;
  let secondsElapsed = Math.floor(elapsedTime / 1000);
  let timeRemaining = countdownTime - secondsElapsed;
  timeRemaining = max(timeRemaining, 0);
  if (video) {
    function timerFunction() {
      // Your timer logic here
      console.log("Timer function called");
      // Display the timer
      fill(255);
      textSize(50);
      textFont(myFont);
      textAlign(CENTER, TOP);
      text("Timer: " + timeRemaining, width / 2, 10);
      // If the timer is at 0, change the background
      if (timeRemaining === 0) {
        window.location.href = "/index.html";
      }
    }
    timerFunction();
  }

  if (label === object) {
    window.location.href = locationLink;
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
  // Classify again!
  classifyVideo();
}
