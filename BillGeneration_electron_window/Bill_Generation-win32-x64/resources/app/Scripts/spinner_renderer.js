
const contentDiv = document.getElementById('content');

function setup() {

}
  
  function draw() {   
    var canvas = createCanvas(contentDiv.clientWidth, contentDiv.clientHeight);
    canvas.parent('content');
    stroke("#104589");
    fill("#2f7ad6");
    
    center = new Co_ordinate(mouseX, mouseY);
    getNextSpinnerCoordinates(center);
    ellipse(center.x,center.y,10,10);
  }
  
  
  class Co_ordinate{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  }
  
  angle = 0; 
  
  function getNextSpinnerCoordinates(coordinate){
    coordinate.x += 15*cos(angle);
    coordinate.y += 15*sin(angle);
    angle += 1;
  }
  