song1 = '';
song2 = '';
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
score_leftwrist = 0;
score_rightwrist = 0;
function preload()
{
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}
function draw()
{
    image(video,0,0,700,500)

    fill("#FF0000");
    stroke("#FF0000");

    if(score_leftwrist>0.2)
    {
        circle(leftwristX,leftwristY,20);
        song2.stop();
        if(song1.isPlaying()== false)
        {
            song1.play();
            console.log("false")
            document.getElementById("sn12").innerHTML = 'Song Name : Harry Potter';
        }
    }
    if(score_rightwrist>0.2)
    {
        circle(rightwristX,rightwristY,20);
        song1.stop();
        if(song2.isPlaying()== false)
        {
            song2.play();
            console.log("false")
            document.getElementById("sn12").innerHTML = 'Song Name : Peter Pan';
        }
    }
    
}
function setup()
{
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    pn = poseNet(video,modelLoaded)
    pn.on('pose',gotPoses)
}
function modelLoaded()
{
    console.log('model has been loaded')
}
function gotPoses(results)
{
    if(results.length>0)
    {
    console.log(results)
    score_leftwrist = results[0].pose.keypoints[9].score;
    score_rightwrist = results[0].pose.keypoints[10].score;
    console.log("leftwrist score = "+score_leftwrist+"rightwrist score = "+score_rightwrist);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    }
    
}