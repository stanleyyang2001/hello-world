function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(210, 175, 143);
  strokeWeight(20);
  
  // "S"
  stroke("white");
  line(100,50, 25, 50);
  line(25,50, 25, 100);
  line(25,100, 100, 100);
  line(100,100, 100, 150);
  line(100, 150, 25, 150);
  
  // "T"
  stroke("red");
  line(150, 50, 250, 50);
  line(200, 50, 200, 150);
  
  // "A"
  stroke("black");
  line(275, 150, 325, 50);
  line(375, 150, 325, 50);
  line(300, 120, 350, 120);
  
  // "N"
  stroke("silver");
  line(425, 150, 425, 50);
  line(425,50, 525, 150);
  line(525,150, 525,50);
  
  // "L"
  stroke("yellow");
  line(25, 200, 25, 300);
  line(25, 300, 100, 300);
  
  //"E"
  stroke("blue");
  line(150, 200, 150, 300);
  line(150, 200, 250, 200);
  line(150, 250, 250, 250);
  line(150, 300, 250, 300);
  
  // "Y"
  stroke("green");
  line(275, 200, 325, 250);
  line(375, 200, 325, 250);
  line(325, 250, 325, 300);

  

}
