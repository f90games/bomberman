window.PLAYER_LEFT = 1;
window.PLAYER_UP = 2;
window.PLAYER_DOWN = 3;
window.PLAYER_RIGHT = 4;

window.PLAYER_SPEED = 4; //количество фреймов для движения

window.PLAYER_STEPS = 4; //количество шагов, 

// game.hero.js
Hero = function(c){
  this.path = c.path || [];

  this.pos = c.pos || 30;
  this.posTarget = c.posTarget || 30;

  this.step = c.step || 0;

  this.moveTick = c.moveTick || 0;

  this.skin = c.skin || 0;

  this.up = c.up || false;
  this.down = c.down || true;
  this.left = c.left || false;
  this.right = c.right || false;

  this.point = {
    y: Math.floor(this.pos / 20),
    x: this.pos % 20 - 1
  }

  this.pointTarget = {
    y: this.point.x,
    x: this.point.y
  }  

  this.hp = 3;
}

Hero.prototype.getCoord = function(){ //
  return this.point;
}

Hero.prototype.pushPoint = function(){

}

Hero.prototype.popPoint = function(){

}

Hero.prototype.updatePointTarget = function(){

}

Hero.prototype.moveTo = function(){

  var from_y = Math.floor(this.pos / 20);
  var from_x = this.pos % 20 - 1;

  var to_y = this.pointTarget.y = Math.floor(this.posTarget / 20);
  var to_x = this.pointTarget.x = this.posTarget % 20 - 1;

  var delta_y = to_y - from_y;
  var delta_x = to_x - from_x;

  var speed_x = speed_y = 1 / PLAYER_SPEED;

  // debugger;

  this.point = {
    x: this.point.x + delta_x * speed_x,
    y: this.point.y + delta_y * speed_y
  }

  // console.log(this.point);

  if (this.step_up || this.step_down || this.step_left || this.step_right) {
    this.step++;
    this.step %= 3;
  }

  console.log(this.point);

  if ((this.point.x == this.pointTarget.x) && (this.point.y == this.pointTarget.y)){
    this.pos = this.posTarget;
    this.step_left = this.step_right = this.step_up = this.step_down = false;
  }

}


Hero.prototype.turn = function(direction){
  this.up = this.down = this.left = this.right = false;

  switch (direction) {
    case PLAYER_LEFT:
      this.left = true;
    break;

    case PLAYER_UP:
      this.up = true;
    break;

    case PLAYER_RIGHT:
      this.right = true;
    break;

    case PLAYER_DOWN:
      this.down = true;
    break;            
  }

}