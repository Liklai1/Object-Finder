status="";
objects= "";
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
    function draw(){
        image(video, 0 , 0 , 380, 380);
        if(status != "" ){
         objectDetector.detect(video, gotResult);
         for(i = 0; i < objects.length; i++){
             document.getElementById("status").innerHTML= "status: objects detected";
             document.getElementById("number_of_objects").innerHTML="number of objects detected are : " + objects.length;
             fill("red");
             percent= floor(objects[i].confidence*100);
             text(objects[i].label+""+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
             noFill();
             stroke("red");
             rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);
             if(objects[i].label == object_name ){
                 video_webcamLiveView.stop();
                 objectDetector.detect(gotResult);
                 document.getElementById("status").innerHTML= object_name + "found";
                 var synth=window.speechSynthesis;
                 speak_data_1="object mentioned found"; 
                 var utterThis=new SpeechSynthesisUtterance(speak_data_1);
                 synth.speak(utterThis);
             }
             else{
                document.getElementById("status").innerHTML="Object not found.";
             }
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    object_name = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
 }