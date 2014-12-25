"use strict"

if (typeof require !== "undefined") 
{
	var _ =  require('underscore')
}


function extend(Child, Parent) {
  var F = function() { }
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.superclass = Parent.prototype
}

//***********************************************************************************
// Game - он же State Manager
var Game = function(c){
  this.interval = null;

  if (typeof exports === "undefined") 
  {
	this.em = new EventManager();

	this.em.addListener('hero.die', Hero.die);
  }

}

Game.prototype.init = function(){

};

Game.prototype.addNewHero = function(data){
	
	BM.game.state.mode = 2
	BM.game.makeGame()
	
	var state = this.state;
	var level = state.level;

	var hero = new Hero(_.extend(data, {level: level}));
	
	this.state.heros.push(hero)
	
}

Game.prototype.bindConnector = function(){
	
	BM.connector.on('newHero', _.bind(this.addNewHero, this))
	
}

Game.prototype.createScene = function(s){

  if (this.scene)
    this.scene.stop();

  var state = this.state;

  switch (s) {
    case PLAY_SCENE:
      
      var level = state.level;      

      this.scene = new PlayScene({
        staticScene: false,
        screenWidth: level.screenWidth,
        screenHeight: level.screenHeight,
        mapTileSize: level.mapTileSize,
        mapWidth: level.mapWidth,
        mapHeight: level.mapHeight,
        heroSpown : level.heroSpown        
      });

      Bomb.EXPLODE_MATRIX_3x3 = [-level.mapWidth, -1, 1, level.mapWidth];

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
      this.scene = new MenuScene({
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
      "screenWidth": 600,
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

      "screenWidth": 600,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 10, 10, 0, 10, 40, 10, 0, 10, 38, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 33, 34, 34, 34, 35, 38, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 10, 10, 0, 10, 0, 10, 40, 10, 38, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 10, 10, 0, 10, 40, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31]             
    },

    {
      "level" : 2,
      "maptiles" : "tmw_desert_spacing.png",

      "screenWidth": 600,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 46, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 33, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 0, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 33, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 46, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },
    {
      "level" : 3,
      "maptiles" : "tmw_desert_spacing.png",

      "screenWidth": 600,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 46, 0, 0, 38, 0, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 38, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 32, 47, 47, 47, 47, 47, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 38, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 47, 10, 47, 10, 47, 10, 47, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 38, 0, 0, 0, 38, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 32, 47, 47, 47, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 38, 38, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 38, 0, 38, 0, 0, 0, 38, 0, 0, 0, 0, 0, 47, 0, 47, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 31, 0, 31, 0, 31, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 32, 0, 32, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },

    {
      "level" : 4,
      "maptiles" : "tmw_desert_spacing.png",

      "screenWidth": 600,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 40, 0, 0, 0, 40, 0, 40, 40, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 10, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },

    {
      "level" : 5,
      "maptiles" : "tmw_desert_spacing.png",

      "screenWidth": 600,
      "screenHeight": 480,
      
      "mapTileSize": 32,
      "mapWidth": 45,
      "mapHeight": 15,
      "heroSpown" : 47,

      "herotiles": "vx_chara00.png",
      "bombtiles": "bomb.png",
      "heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 40, 40, 40, 0, 40, 40, 0, 40, 0, 0, 0, 0, 40, 0, 0, 40, 40, 40, 0, 0, 40, 0, 0, 0, 40, 40, 0, 0, 0, 0, 40, 0, 40, 32, 0, 32, 40, 0, 0, 40, 0, 10, 10, 0, 0, 32, 0, 0, 0, 32, 40, 0, 40, 0, 40, 0, 0, 0, 40, 40, 40, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 32, 40, 0, 32, 32, 40, 0, 0, 32, 40, 0, 0, 0, 0, 10, 10, 0, 46, 0, 40, 0, 40, 0, 40, 0, 32, 0, 0, 32, 0, 0, 32, 40, 0, 40, 40, 0, 39, 0, 0, 40, 40, 40, 40, 32, 0, 40, 0, 0, 40, 0, 40, 32, 40, 32, 0, 32, 0, 0, 10, 10, 0, 0, 40, 0, 32, 0, 0, 40, 40, 40, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 40, 32, 0, 39, 0, 0, 40, 0, 32, 40, 0, 40, 0, 0, 40, 40, 40, 40, 0, 32, 0, 0, 10, 10, 0, 0, 0, 0, 40, 0, 0, 40, 39, 32, 40, 40, 0, 32, 40, 40, 0, 40, 0, 48, 40, 0, 0, 0, 39, 40, 32, 40, 0, 0, 40, 32, 0, 40, 40, 40, 0, 39, 0, 40, 32, 0, 0, 10, 10, 0, 0, 0, 0, 32, 0, 40, 32, 0, 0, 0, 40, 0, 40, 39, 40, 40, 0, 0, 48, 48, 0, 0, 40, 0, 40, 40, 40, 0, 40, 40, 40, 40, 0, 0, 0, 32, 0, 40, 40, 32, 0, 0, 10, 10, 0, 40, 0, 40, 0, 0, 0, 40, 39, 0, 40, 40, 39, 0, 0, 0, 0, 0, 40, 0, 0, 48, 48, 0, 0, 32, 0, 0, 40, 40, 0, 40, 40, 40, 32, 32, 0, 32, 40, 40, 0, 32, 0, 10, 10, 0, 0, 0, 40, 40, 0, 0, 40, 0, 40, 40, 0, 0, 40, 40, 0, 32, 0, 40, 40, 0, 0, 48, 48, 0, 32, 32, 0, 40, 40, 32, 32, 0, 40, 40, 40, 32, 32, 0, 40, 0, 32, 0, 10, 10, 0, 40, 0, 0, 0, 32, 40, 40, 32, 40, 32, 40, 40, 40, 0, 40, 40, 40, 40, 0, 0, 0, 0, 0, 40, 48, 40, 40, 0, 32, 0, 40, 40, 0, 40, 0, 40, 40, 0, 32, 32, 0, 0, 10, 10, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 40, 0, 0, 0, 40, 40, 0, 32, 32, 0, 40, 0, 40, 0, 0, 40, 32, 40, 40, 40, 32, 0, 40, 0, 0, 40, 40, 40, 40, 40, 0, 10, 10, 0, 0, 0, 0, 32, 40, 40, 40, 40, 40, 0, 0, 40, 40, 40, 40, 0, 0, 32, 0, 32, 40, 0, 0, 40, 40, 40, 40, 0, 40, 0, 0, 32, 0, 0, 0, 40, 0, 40, 40, 40, 40, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },        

  ];

  this.state.level = levels[levelId];
  this.state.map = this.state.level.map;

  return this.state.level;

}

Game.prototype.makeGame = function(level){
  
  if (!level)
    var level = this.getState().getCurrentLevel() || 0;

  this.getState().resetState();

  this.getState().setCurrentLevel(level);
  this.loadLevel();
  this.spawnHero();

  if(this.getState().mode == GAMEMODE_SINGLE)
    this.spawnNPC(10);

  this.createScene(PLAY_SCENE);
}

Game.prototype.makeServerGame = function(level){
  
  if (!level)
    var level = this.getState().getCurrentLevel() || 0;

  this.getState().resetState();

  this.getState().setCurrentLevel(level);
  this.loadLevel();
  this.spawnHero();

}


Game.prototype.spawnHero = function(){
  var state = this.state;
  var level = state.level;

  var hero = new Hero({
    pos: level.heroSpown,
    posTarget: level.heroSpown,
    heroTileIndex: level.heroTileIndex,
    sprite: 0,
    skin: 0,
    hp: 3,
    level: level
  });

  hero.uid = state.player_uid;
  hero.player_name = state.player_name;
  hero.player_photo = state.player_photo;

  state.setCurrentHero(hero);

  state.heros.push(hero);

}

Game.prototype.spawnNPC = function(n){
  var state = this.state;
  var level = state.level;

  var num = n || 5;

  var hero, npcSpawn;

  for (var i = 0; i < num; i++) {

    do
      npcSpawn = _.random(1, level.map.length);
    while (level.map[npcSpawn-1]!==0); 
    
    hero = new NPC({
      pos: npcSpawn,
      posTarget: npcSpawn,
      heroTileIndex: level.heroTileIndex,
      sprite: 0,
      skin: 0,
      hp: 3,
      type: _.random(1, 3),
      level: level
    });

    state.heros.push(hero);

  };

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
  this.heros = [];
  this.bombs = [];
  this.fx = [];

  this.mode = GAMEMODE_SINGLE;

  this.player_name = 'Player 1';
  this.player_photo = './img/static/no-profile-image.jpg';
  this.player_uid = '';
  this.player_highscore = 0;
  this.player_lastscore = 0;

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

GameState.prototype.getCurrentLevel = function(levelId){
  return this.currentLevel;
}

GameState.prototype.resetState = function(){
  this.currentHeroEntity = null;

  var hero;
  for (var i = 0; i < this.heros.length; i++) {
    if(this.heros[i].isNPC()){
      // hero = this.heros.splice(0, 1);
      this.heros[i].stopAI();
      // delete this.heros[i];
    }
  };
  this.heros = [];

  this.player_lastscore = 0;


  for (var i = 0; i < this.bombs.length; i++) {

    delete this.bombs[i]
  };  
  this.bombs = [];

  for (var i = 0; i < this.fx.length; i++) {

    delete this.fx[i]
  };  
  this.fx = [];
}

GameState.prototype.heroDie = function(hero){

  if (!hero.isNPC()){
    this.resetState();
    BM.game.createScene(MENU_SCENE);
  } else {

    // if ()
    hero.stopAI();

    for (var i = 0; i < this.heros.length; i++) {

      if (hero === this.heros[i]){
        
        if(hero.isNPC()){
          
          this.heros.splice(i, 1);
          // delete this.heros[i];

          BM.game.spawnNPC(1);        
        }

      }
    };
  }



  // debugger;
}

//***************************************************************************
// HERO
//

var HUMAN_CHARACTER_TYPE = 0;
var GHOST_CHARACTER_TYPE = 1;
var SCELET_CHARACTER_TYPE = 2;
var MONSTR_CHARACTER_TYPE = 3;
var BOMB_START = 1;
var BOMB_EXPLODE = 2;
var FX_CATCH_FIRE = 3;

var PLAYER_LEFT = 1;
var PLAYER_UP = 2;
var PLAYER_DOWN = 3;
var PLAYER_RIGHT = 4;

var GAMEMODE_SINGLE = 1;
var GAMEMODE_MULTI = 2;

var PLAYER_SPEED = 4; //количество фреймов для движения
var PLAYER_STEPS = 4; //количество шагов
// window.HUMAN_CHARACTER_TYPE = 4;

var Hero = function(c){

  this.uid = 'h_' + new Date().getTime();

  this.flagNPC = false;

  this.type = HUMAN_CHARACTER_TYPE;

  this.path = c.path || [];

  this.pos = c.pos || 30;
  this.posTarget = c.posTarget || this.pos;
  this.heroTileIndex = c.heroTileIndex || 1;

  this.step = c.step || 0;
  this.blinkStep = c.blinkStep || 0;

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

Hero.die = function(hero){
  var state = BM.game.getState();
  state.heroDie(hero);
}

Hero.prototype.moveTo = function(){

  var self = this;

  var from_y = Math.floor(this.pos / this.level.mapWidth);
  var from_x = this.pos % this.level.mapWidth - 1;

  var to_y = this.pointTarget.y = Math.floor(this.posTarget / this.level.mapWidth);
  var to_x = this.pointTarget.x = this.posTarget % this.level.mapWidth - 1;

  var delta_y = to_y - from_y;
  var delta_x = to_x - from_x;

  var speed_x, speed_y; 

  speed_x = speed_y = 1 / PLAYER_SPEED;

  // debugger;

  this.point = {
    x: this.point.x + delta_x * speed_x,
    y: this.point.y + delta_y * speed_y
  } 

  if (this.step_up || this.step_down || this.step_left || this.step_right) {
    this.step++;
    this.step %= 3; 

    //playSound('pl_step4');
  }

  this.blinkStep++;
  this.blinkStep %= 3;

  if ((this.point.x == this.pointTarget.x) && (this.point.y == this.pointTarget.y)){
    this.pos = this.posTarget;
    this.step_left = this.step_right = this.step_up = this.step_down = false;

    var heros = BM.game.state.heros;

    for (var i = 0; i < heros.length; i++) {
      var hero = heros[i];
      if (hero.pos == this.pos){
        if (this.isNPC() && (!hero.isNPC())){
          
          if(!hero.blink)
            hero.hpDec(1);

          if(hero.hp == 0){
            BM.game.createScene(MENU_SCENE);
          }
        }

        if (!this.isNPC() && (hero.isNPC())){
          
          if(!this.blink)
            this.hpDec(1);
          
          if(this.hp == 0){
            BM.game.createScene(MENU_SCENE);
          }          
        }

      }

    };


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

Hero.prototype.isNPC = function(){
  return this.flagNPC;
}

Hero.prototype.hpDec = function(){
  this.hp--;
  this.blink = true;

  var self = this;
  setTimeout(function(){
    self.blink = false;
  }, 3000);
}

var NPC = function(c){

  NPC.superclass.constructor.apply(this, arguments);

  this.type = c.type || 1;

  this.skin = this.type - 1;

  this.startAI();
  this.flagNPC = true;

} 

extend(NPC, Hero);

NPC.prototype.startAI = function(){
  var self = this;

  this.interval = setInterval(function(){
    self.doAI();
  }, 300);
}

NPC.prototype.stopAI = function(){
  // var self = this;

  clearInterval(this.interval);
}

NPC.prototype.doAI = function(){
  var action = _.random(1,5);
  var state = BM.game.getState();

  if(BM.game.scene.type !== PLAY_SCENE){
    return;
  }

  if (this.hp > 0){
    if (action < 5){
      this.turn(action);

      if (this.left) this.step_left = true;
      if (this.up) this.step_up = true;
      if (this.down) this.step_down = true;
      if (this.right) this.step_right = true;
    } else {
      if(_.random(1,10) === 10){ //чтобы не часто взрывать

        var bomb = new Bomb({
          power: 2,
          pos: this.pos,
          hero: this,
          timeLeft: 3000,
          status: BOMB_START,
          level: state.level
        }, state.map);
        
        if (PlayScene.checkBombPos(state, this.pos-1))
        {
          state.bombs[this.pos-1] = bomb;
          bomb.start();
          // Connector && Connector.sendB(bomb)
        }      

      }
    }    
  }
}

// NPC.prototype.drop = function(){

// }

// Item = function(){
    
// }



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

  this.uid = 'b_' + new Date().getTime();

  var config = c || {};

  this.hero = c.hero || BM.game.getState().getCurrentHero(); //типа себе
  this.level = c.level;
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode, 3: flame
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

Bomb.prototype.start = function (){

  BM.game.em && BM.game.em.fire('bomb.place', [self]);

  var self = this;
  setTimeout(function(){
    self.explode();
  }, this.timeLeft);
}

Bomb.prototype.explode = function() {
  var self = this;
  this.status = BOMB_EXPLODE;

  BM.game.em && BM.game.em.fire('bomb.explode', [self]);

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

  setTimeout(function(){
    self.destroy();
  }, 1000);
}

Bomb.prototype.setFlame = function(pos, d) { //форк на осколки

  var fx = BM.game.state.fx;

  var flame = fx[pos] = new Flame({
    pos: pos,
    status: 3,
    direction: d
  });

  flame.start();
}

Bomb.prototype.damage = function(pos, d) {

  //TODO переделать!!!
  var state = BM.game.getState();
  var map = BM.game.getState().map;

  // var hero = BM.game.state.currentHeroEntity;

  var hero;

  if (_.contains(this.level.fixed_terrian_sprite, map[pos])) {
    //do nothing
    return false;
  } else if (_.contains(this.level.destroy_terrian_sprite, map[pos])) {
    // debugger;
    map[pos] = 0;

    if(this.hero === state.getCurrentHero()){
      state.player_lastscore += 5;
    }

    this.setFlame(pos, d);
  } else if (map[pos] == 0) {
    this.setFlame(pos, d);
  }

  for (var i = 0; i < state.heros.length; i++) {
    hero = state.heros[i]

    if ((hero.pos - 1) == pos) {
      // hero.hp -= 1;

      hero.hpDec(1);

      if(this.hero === state.getCurrentHero()){
        state.player_lastscore += 10;
      }

      if (hero.hp == 0){
        BM.game.em && BM.game.em.fire('hero.die', [hero]);
      }
    }; 
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
  exports.Hero = Hero;
  exports.Game = Game;
  exports.GameState = GameState;
}