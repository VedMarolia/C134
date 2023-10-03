objects = [];
status = "";

function preload() {

}


function setup() {
  canvas = createCanvas(500, 400);
  canvas.center();

  video = createCapture(VIDEO)
  video.size(500, 400)
  video.hide()


}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 500, 400);

  if (status != "") {
    r = random(255)
    g = random(255)
    b = random(255)

    objectDetector.detect(video, gotResult);

    for (var i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("quantity").innerHTML = "Number of Objects : " +objects.length 

      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}