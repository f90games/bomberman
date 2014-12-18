"use strict"

//***********************************************************************************
// Game - он же State Manager
var Game = function(c){
  this.interval = null;

  this.em = new EventManager();

  this.em.addListener('hero.die', Hero.die);

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
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 0, 25, 26, 26, 26, 27, 10, 10, 0, 10, 40, 10, 0, 10, 38, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 33, 34, 34, 34, 35, 38, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 0, 33, 34, 34, 34, 35, 10, 10, 0, 10, 0, 10, 40, 10, 38, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 33, 10, 34, 10, 35, 10, 10, 0, 0, 40, 40, 40, 0, 38, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 0, 41, 42, 42, 42, 43, 10, 10, 0, 10, 40, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 32, 10, 0, 10, 32, 10, 46, 10, 0, 10, 0, 10, 10, 0, 0, 40, 40, 40, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 32, 32, 32, 32, 32, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31]             
    },

    {
      "level" : 2,
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
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 46, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 33, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 0, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 33, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 40, 0, 46, 33, 34, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 35, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 46, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },
    {
      "level" : 3,
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
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },

    {
      "level" : 4,
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
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 40, 0, 0, 0, 40, 0, 40, 40, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 10, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 40, 40, 40, 0, 0, 0, 0, 31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      "fixed_terrian_sprite" : [10],
      "destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31, 48, 49]             
    },

    {
      "level" : 5,
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

  console.log('Make new game!!!-------------------------');
  
  if (!level)
    var level = this.getState().getCurrentLevel() || 0;

  this.getState().resetState();

  this.getState().setCurrentLevel(level);
  this.loadLevel();
  this.spawnHero();

  this.spawnNPC(5);

  this.createScene(PLAY_SCENE);
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
    while (level.map[npcSpawn]!==0); 
    
    hero = new NPC({
      pos: npcSpawn,
      posTarget: npcSpawn,
      heroTileIndex: level.heroTileIndex,
      sprite: 0,
      skin: 0,
      hp: 3,
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
        console.log(hero.uid + ' is die!');
        
        if(hero.isNPC()){
          
          this.heros.splice(i, 1);
          // delete this.heros[i];
          console.log(hero);

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
var Hero = function(c){

  this.uid = 'h_' + new Date().getTime();

  this.flagNPC = false;

  this.path = c.path || [];

  this.pos = c.pos || 30;
  this.posTarget = c.posTarget || this.pos;
  this.heroTileIndex = c.heroTileIndex || 1;

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

  console.log('User ' + this.uid + ' заспаунился в позиции ' + this.pos);
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

Hero.prototype.isNPC = function(){
  return this.flagNPC;
}

var NPC = function(){
  NPC.superclass.constructor.apply(this, arguments);
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
          timeLeft: 3000,
          status: BOMB_START,
          level: state.level
        }, state.map);

        console.log('User ' + this.uid + ' поставил бомбу ' + bomb.uid + ' в позиции ' + this.pos);
        
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
  this.level = c.level;
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode, 3: flame
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

Bomb.prototype.start = function (){

  BM.game.em.fire('bomb.place', [self]);

  var self = this;
  setTimeout(function(){
    self.explode();
  }, this.timeLeft);
}

Bomb.prototype.explode = function() {
  var self = this;
  this.status = BOMB_EXPLODE;

  console.log('Бомба ' + this.uid + ' в позиции ' + this.pos + ' взорвалась.');

  BM.game.em.fire('bomb.explode', [self]);

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
    this.setFlame(pos, d);
  } else if (map[pos] == 0) {
    this.setFlame(pos, d);
  }

  for (var i = 0; i < state.heros.length; i++) {
    hero = state.heros[i]

    if ((hero.pos - 1) == pos) {
      hero.hp -= 1;

      if (hero.hp == 0){
        BM.game.em.fire('hero.die', [hero]);
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
}