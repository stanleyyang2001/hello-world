// interaction: 
// press space bar for birghting the screen for a short period of time
// note: the first time space bar is pressed, it might refresh the p5js page for unknown reason, but after that it'll function normally

// note2: everytime the space bar is pressed, the eyes that appear on the canvas will increase. A special event will occur when the eye reaches a certain amount

// press the mouse to play the bgm, press the mouse again to stop the bgm

/ p5.js editor link: https://editor.p5js.org/stanleyyang2001/sketches/upbKdTDxK

var s = 4;
var fade = false;
var percentage = 255; 
var angle = 0
var da = 5
var show = true;
var list = [];
var size = 2;

var ghost_x;
var ghost_y;
var ghost_height;
var ghost_dx = 1.5;
var ghost_dy = 1.5;
var ghost_direction = 1;
var ghost_appear = false;

var thunder;
var gbm;

// note: add image/sound to the project
// https://www.youtube.com/watch?v=p0F8nBC1LdE
// plan: horror theme, may include jump scare if possible, and interaction that allowed user to click on

function preload(){
  // https://mixkit.co/free-sound-effects/thunder/
  thunder = loadSound('thunder.wav')
  
  //Music by <a href="https://pixabay.com/users/ashot-danielyan-composer-27049680/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=114064">Ashot Danielyan</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=114064">Pixabay</a>
  bgm = loadSound('mysterious-celesta.mp3')
  
  
}
function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES)
  ghost_x = -200;
  ghost_y = height/2;
  for (i = 0; i < size; i++){
    list[i] = new Eye(random(20, width-50),random(20, height-50),30, random(0,360))
  }
}

function draw() {
  background(220);
  
  
  // eye control
  eye_control()
  // ghost appearance
  ghost_control()
  // thunder and focus control
  thunder_control()
  


  }
function trans_background(percentage){
  translate(mouseX, mouseY)
  var vision = 50
  noStroke()
  fill(0,0,0,percentage)
  beginShape()
  vertex(200*s,200*s)
  vertex(0,200*s)
  noFill()
  for (i = 0; i < 101; i++){
    vertex(vision*sin(i*3.6), vision*cos(i*3.6))
  }
  fill(0,0,0,percentage)
  vertex(0,200*s)
  vertex(-200*s,200*s)
  vertex(-200*s,-200*s)

  vertex(200*s,-200*s)
  endShape()
  
  fill(40,10)
  circle(0, 0, vision+ 40)
  fill(100, 10)
  circle(0,0,vision +20)
}

function fade_out(percentage){
  fill(255,255,255,percentage)
  rect(-600,-600, 1800, 1800)
}

function ghost(x,y, direction){
  fill("white")
  push()
  translate(x,y)
  scale(direction,1)
  // left arm
  stroke(1)
  beginShape()
  vertex( -20, 0)
  vertex( 60, 0)
  vertex( 50,  30)
  vertex( 40,  30)
  endShape()
  
  // body
  beginShape()
  vertex( -60,  50)
  vertex( -40,  30)
  vertex( -25, 0-10)
  vertex( -15, 0-30)
  vertex( -5, 0-35)
  vertex( 5, 0-35)
  vertex( 15, 0-30)
  vertex( 20, 0-28)
  vertex( 25, 0-10)
  vertex( 30,  30)
  vertex( 20,  50)
  endShape()
  
  // right arm
  beginShape()
  vertex( -10,  10)
  vertex( 50,  10)
  vertex( 40,  40)
  vertex( 30,  40)
  endShape()

  // eyes
  fill("black")
  circle( 5, -10,7)
  circle( 19, -10,7)
  pop()
  
}

function mousePressed(){
  
  if(bgm.isPlaying()) {
    bgm.stop()
  }else{
    bgm.loop()
    bgm.play()
  }
}

function ghost_control(){
if (!ghost_appear){
    var r = random(0,1)
    if (r < 0.005){
      ghost_appear = true
      console.log(r)
      ghost_height = random(150,300)
    }
  } else if (ghost_appear){
    ghost(ghost_x, sin(ghost_y)*100+ghost_height, ghost_direction)
    /*
    if (ghost_y > height*5/6 | ghost_y < height*1/4 ){
      ghost_dy = - ghost_dy
    } */
    if (ghost_x > width+200 | ghost_x < -200 ){
      ghost_dx = - ghost_dx
      ghost_appear = !ghost_appear
      if (ghost_dx < 0){
        ghost_direction = -1
      } else {
        ghost_direction = 1
      }
  } 
 
  ghost_x += ghost_dx;
  ghost_y += ghost_dy
  }
}

function thunder_control(){
  if (keyIsPressed){
      size +=1
      if (keyCode == 32){
        fade = true
        thunder.play()
      }
  } else if (!fade){
    trans_background(percentage);
    if (percentage < 255){
      percentage+=3
    }
  }
  
  if (fade){
    fade_out(percentage)
    percentage-=5
    if (percentage < 0){
      //percentage = 255;
      fade = false;
      console.log(fade)
    }
  }
}

function eye_control(){
    for (i = 0; i < list.length; i++){
    list[i].portraryEye()
    if (list[i].x-list[i].radius*2 < mouseX & mouseX < list[i].x+list[i].radius*2){
      if (list[i].y-list[i].radius < mouseY & mouseY< list[i].y+list[i].radius){
        list[i].blink()
      }
    }
  }
  
  if (list.length < size){
    for(i = 0; i < size-list.length; i++){
      list.push(new Eye(random(20, width-50),random(20, height-50),30, random(0,360)))
    }
  }
  
  if (size > 30)
    {
      list = []
      list.push(new Eye(width/2,height/2,200))
      size = 1;
    }  
}

class Eye{
  
  constructor(x,y, radius, rotation){

    this.x = x;
    this.y = y;
    this.radius = radius
    this.angle = 40
    this.rotation = rotation
    this.da = 4
    this.blinkOnce = false;
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    
    this.portraryEye();

    this.blnk = false;
    
  }
  portraryEye(){
    push()
    translate(this.x,this.y)
    rotate(this.rotation)
    this.eyeSocket()
    this.eyeBall()
    pop()
    push()
    translate(this.x,this.y)
    this.iris()
    pop()
    
  }
  
  iris(){
    
    var angle = atan2(mouseX-this.x, mouseY-this.y);
    var posX = this.radius/3 * cos(angle)
    var posY = this.radius/3 * sin(angle)
    fill('red')
    circle(posY,posX,this.radius/4)
  }
  eyeBall(){
    //fill(0,0,0,180)
    fill(this.r, this.g, this.b,180)
    circle(0, 0, this.radius)
  }
  
  eyeSocket(){
    fill("white")
    ellipse(0, 0, this.radius*2, this.radius)
    noFill()
    stroke(0)
    arc(0-this.radius*0.5, 0+this.radius*0.5, 50, 50, 210, 240);
    arc(0+this.radius*0.55, 0+this.radius*0.5, 50, 50, 290, 320);   
    //line(0-this.radius, 0, 0-this.radius*1.5, 0+this.radius*0.75)
  }
  
  eyeLid(){
    if (this.blink){
      //fill(220, 180)
      push()
      translate(this.x,this.y)
      rotate(this.rotation)
      fill("black")
      arc(0,0,this.radius*2, this.radius, 270-this.angle, 270+this.angle, CHORD)
      pop()


  }
  }
  
  adjustAngle(){
    this.angle += this.da;

    if (this.angle >= 160){
      this.da = -4
      this.blinkOnce = true;  
    }
    if (this.angle < 40){
      this.da = 4
    }
  }
  
  blink(){

    if (this.angle >= 170 & this.blinkOnce){
      this.angle = 0
    } else{
      this.portraryEye()
      this.eyeLid()
      this.adjustAngle()
    }
  }

}
