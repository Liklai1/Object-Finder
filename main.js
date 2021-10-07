status="";

function setup(){
   canvas=createCanvas(480, 390);
   canvas.center();
   video=createCapture(VIDEO);
   video.hide;
}
function draw(){
    image(video, 0, 0, 480, 390);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status= true;
}
