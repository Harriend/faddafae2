img = "";
status = ""
objects = [];

function preload(){
    img = loadImage('2.jpg');
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Object is being detected"
}

function modelLoaded(){
    console.log('model Loaded');
    status = true;
    objectDetector.detect(img , gotResults)
}

function gotResults(error , results){
    if(error){
        console.error(error);
    }

    console.log(results);

    objects = results;
}

function draw(){
    image(img , 0 , 0 , 600 , 400);

    if(status != ""){
       console.log('in if');

        for(i = 0; i < objects.length; i++){
            console.log('in for loop');

            document.getElementById('status').innerHTML = "Object Detected";

            fill('red');
            percent = objects[i].confidence * 100;
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
        }

    }
}