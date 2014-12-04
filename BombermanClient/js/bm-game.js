"use strict"

//***********************************************************************************
// Game - он же State Manager
var Game = function(c){

}

Game.prototype.init = function(){

};


Game.prototype.gameloop = function(BM) {  
  
  // clear();

  // setupMap();
  
  // runGameFrame(BM);
  
  // updateHeros();
  
  /* if (Socket && Socket.readyState == 1)
  {
    Socket.send(JSON.stringify({ Type: "D", Data: _.omit(BM.hero, ['herotiles']) }));
  } */
}

Game.prototype.setState = function(state){
  this.state = state;
}

Game.prototype.setInput = function(input){
  this.input = input;
}

Game.prototype.setConnector = function(connector){
  this.connector = connector;
}

Game.prototype.setRender = function(render){
  this.render = render;
}

Game.prototype.setState = function(state){
  this.state = state;
}

Game.prototype.setScene = function(scene){
  this.scene = scene;

  // this.render
}

Game.prototype.loadLevel = function(){
  
}

Game.prototype.runGameFrame = function(BM){
  
  var hero = BM.hero;

  if (hero.hp > 0){

    // if((hero.point.x == hero.pointTarget.x) && (hero.point.y == hero.pointTarget.y)){
    if((hero.posTarget == hero.pos)){     

      if(hero.step_up)
      {
        if (checkHeroPos(BM, hero.pos - BM.level.mapWidth))
        {
          hero.posTarget -= BM.level.mapWidth;
        }
      }
      else if (hero.step_down)
      {
        
        if (checkHeroPos(BM, hero.pos + BM.level.mapWidth))
        {
          hero.posTarget += BM.level.mapWidth;
        }
      }
      else if (hero.step_left)
      {
        if (checkHeroPos(BM, hero.pos - 1))
        {
          hero.posTarget--;
        }
      }
      else if (hero.step_right)
      {
        if (checkHeroPos(BM, hero.pos + 1))
        {
          hero.posTarget++;
        }
      }


    }  

    // if ((hero.newpos != hero.pos) && (herp.path.length > 1)) {
      
    // }    
    
    if (hero.place_bomb) {
      var bomb_idx = new Date().getTime();

      var bomb = new Bomb({
        power: 2,
        pos: hero.pos,
        timeLeft: 3000,
        status: BOMB_START,
        level: BM.level
      }, BM.map);

      bomb.start();
      
      if (checkBombPos(BM, hero.pos-1))
      {
        BM.bombs[hero.pos-1] = bomb;
        Connector && Connector.sendB(bomb)
      }

    }

  }
  
  // hero.place_bomb = hero.step_left = hero.step_right = hero.step_up = hero.step_down = false;

  hero.place_bomb = false;
  
}


//***************************************************************************
// 
// 
var GameState = function(c){

}

//***************************************************************************
// HERO
//
var Hero = function(c){
  this.path = c.path || [];

  this.pos = c.pos || 30;
  this.posTarget = c.posTarget || this.pos;

  this.step = c.step || 0;

  this.moveTick = c.moveTick || 0;

  this.skin = c.skin || _.random(0, 3);

  this.up = c.up || false;
  this.down = c.down || true;
  this.left = c.left || false;
  this.right = c.right || false;

  this.level = c.level;

  this.point = {
    y: Math.floor(this.pos / this.level.mapWidth),
    x: this.pos % this.level.mapWidth - 1
  }

  this.pointTarget = {
    y: this.point.x,
    x: this.point.y
  }  

  this.isTopTop = false

  this.hp = 3;
}


Hero.prototype.moveTo = function(){

  var self = this;

  var from_y = Math.floor(this.pos / this.level.mapWidth);
  var from_x = this.pos % this.level.mapWidth - 1;

  var to_y = this.pointTarget.y = Math.floor(this.posTarget / this.level.mapWidth);
  var to_x = this.pointTarget.x = this.posTarget % this.level.mapWidth - 1;

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
    //playSound('pl_step4');
  }

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

//*********************************************************************************
// FLAME
var Flame = function(c){
  var config = c || {};
  this.pos = config.pos || 0;
  this.status = config.status || 0;
  this.direction = config.direction || 0;
}

Flame.prototype.start = function(){
  var self = this;

  setTimeout(function(){
    self.destroy();
  }, 300);  
}

Flame.prototype.destroy = function(){
  this.status = 0;
}


//*********************************************************************************
// BOMB
var Bomb = function(c){

  var config = c || {};
  this.level = c.level;
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode, 3: flame
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

Bomb.prototype.start = function (){

  if (BM.sounds['click']){
    BM.sounds['click'].play();  
  } else {
    BM.sounds['click'] = new Howl({
      volume: 0.3,
      urls: ['/data/sound/click.mp3']
    }).play();          
  }  

  var self = this;
  setTimeout(function(){
    self.explode();
  }, this.timeLeft);
}

Bomb.prototype.explode = function() {
  var self = this;
  this.status = BOMB_EXPLODE;

  if (BM.sounds['bomb']){
    BM.sounds['bomb'].play();
  } else {
    BM.sounds['bomb'] = new Howl({
      volume: 0.2,
      urls: ['/data/sound/bomb.mp3']
    }).play();            
  }  

  this.damage(this.pos)

  for (var d = 0; d < 4; d++) { //d = direction
    var i = 1, goExplode = true;
    do {

      var pos = this.pos - 1 + (Bomb.EXPLODE_MATRIX_3x3[d] * i);

      if ((pos >= 0) && (pos<=(this.level.mapHeight*this.level.mapWidth))){
        goExplode = this.damage(pos, d);
      }

      i++;
    } while ((i <= this.power) && goExplode);
  };

  // debugger;
  // console.log(BM.fx);

  setTimeout(function(){
    self.destroy();
  }, 1000);
}

Bomb.prototype.setFlame = function(pos, d) { //форк на осколки
  var flame = BM.fx[pos] = new Flame({
    pos: pos,
    status: 3,
    direction: d
  });

  flame.start();
}

Bomb.prototype.damage = function(pos, d) {
  if (_.contains(this.level.fixed_terrian_sprite, BM.map[pos])) {
    //do nothing
    return false;
  } else if (_.contains(this.level.destroy_terrian_sprite, BM.map[pos])) {
    // debugger;
    BM.map[pos] = 0;
    this.setFlame(pos, d);
  } else if (BM.map[pos] == 0) {
    this.setFlame(pos, d);
  }

  if ((BM.hero.pos - 1) == pos) {
    BM.hero.hp -= 1;

    if (BM.hero.hp == 0){

      if (BM.sounds['die']){
        BM.sounds['die'].play();  
      } else {
        BM.sounds['die'] = new Howl({
          volume: 0.3,
          urls: ['/data/sound/die.mp3']
        }).play(); 
      }
      
    }
  }; 

  return true; 
}

//удаление бомбы с поля
Bomb.prototype.destroy = function(){
  this.status = 0;
}

if (typeof exports !== "undefined") //for node
{
  exports.Bomb = Bomb;
}