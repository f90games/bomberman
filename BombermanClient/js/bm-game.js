"use strict"

//***********************************************************************************
// Game - он же State Manager
var Game = function(c){
  this.interval = null;

  this.em = new EventManager();
}

Game.prototype.init = function(){

};

Game.prototype.createScene = function(s){

  if (this.scene)
    this.scene.stop();

  var state = this.state;

  switch (s) {
    case PLAY_SCENE:
      
      var level = state.level;      

      this.scene = new PlayScene({
        screenWidth: level.screenWidth,
        screenHeight: level.screenHeight,
        mapTileSize: level.mapTileSize,
        mapWidth: level.mapWidth,
        mapHeight: level.mapHeight,
        heroSpown : level.heroSpown        
      });
    break;

    case START_SCENE:
      this.scene = new StartScene({
      });
    break;

    case LOADING_SCENE:
      this.scene = new LoadingScene({
      });
    break;

    case MENU_SCENE:
      this.scene = new LoadingScene({
      });
    break;

    case SELECT_ROOM_SCENE:
      this.scene = new LoadingScene({
      });
    break;

    case YOU_LOST_SCENE:
      this.scene = new LoadingScene({
      });
    break;

    case SHOP_SCENE:
      this.scene = new LoadingScene({
      });
    break;
  } 

  this.scene.run();

  this.render.setScene(this.scene);
}

Game.prototype.updateState = function(){

}

Game.prototype.loadLevel = function(levelId){

  if (!levelId){
    var levelId = this.state.currentLevel;
  }
  
  var levels = 
  [
    {
      "level" : 0,
      "maptiles" : "tmw_desert_spacing.png",
      "screenWidth": 672,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 21,
      "mapHeight": 15,
      "heroSpown" : 23,
      
      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 38, 38, 38, 38, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 0, 10, 10, 0, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 38, 0, 38, 0, 0, 0, 10, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 38, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [38, 39]             
    },

    {
      "level" : 1,
      "maptiles" : "tmw_desert_spacing.png",

      "screenWidth": 800,
      "screenHeight": 500,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 46, 0, 0, 38, 0, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 38, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 32, 47, 47, 47, 47, 47, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 38, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 47, 10, 47, 10, 47, 10, 47, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 38, 0, 0, 0, 38, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 32, 47, 47, 47, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 38, 38, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 38, 0, 38, 0, 0, 0, 38, 0, 0, 0, 0, 0, 47, 0, 47, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 31, 0, 31, 0, 31, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 32, 0, 32, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31]             
    },


  ];

  this.state.level = levels[levelId];
  this.state.map = this.state.level.map;

  return this.state.level;

}

Game.prototype.setGameLoop = function(gameLoop){
  this.gameLoop = gameLoop;
}

//***************************************************************************
// Getters and setters
Game.prototype.setState = function(state){
  this.state = state;
  this.state.game = this;
}

Game.prototype.setInput = function(input){
  this.input = input;
  this.input.game = this;
}

Game.prototype.setConnector = function(connector){
  this.connector = connector;
  this.connector.game = this;
}

Game.prototype.setRender = function(render){
  this.render = render;
  this.render.game = this;
}

Game.prototype.setSound = function(sound){
  this.sound = sound;
  this.sound.game = this;
}

Game.prototype.getState = function(){
  return this.state;
}

Game.prototype.getInput = function(){
  return this.input;
}

Game.prototype.getRender = function(){
  return this.render;
}

Game.prototype.getSound = function(){
  return this.sound;
}


//***************************************************************************
// 
// 
var GameState = function(c){

  //GLOBAL
  this.musicMute = false;
  this.soundMute = false;

  //LOADING SCENE
  this.isLoaded = false;

  //PLAY SCENE
  this.room = 0; //local game
  this.currentHeroEntity = null;
  this.currentLevel = c.currentLevel || 0;
  this.heroes = [];
  this.bombs = [];
  this.fx = [];
}


//???
GameState.prototype.setCurrentHero = function(hero){
  this.currentHeroEntity = hero;
}

GameState.prototype.getCurrentHero = function(hero){
  return this.currentHeroEntity;
}

GameState.prototype.setCurrentLevel = function(levelId){
  this.currentLevel = levelId;
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