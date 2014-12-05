"use scrict"

window.PLAY_SCENE = 1;
window.START_SCENE = 2;
window.LOADING_SCENE = 2;
window.MENU_SCENE = 3;
window.SELECT_ROOM_SCENE = 4;
window.YOU_LOST_SCENE = 5;
window.SHOP_SCENE = 6;

var Scene = function(c){

  this.elId = c.elId || 'game-canvas';
  this.embedToId = c.embedToId || 'canvas-wrapper';


  this.camera = new Camera({
    elId: this.elId,
    embedToId: this.embedToId,

    width: c.width,
    height: c.height
  });

  camera.updateCanvasHtml();

}

var LoadingScene = function(c){
  LoadingScene.superclass.constructor.apply(this, arguments)
}

extend(LoadingScene, Scene);

LoadingScene.prototype.run = function(){
  var cl = new CanvasLoader(this.elId);
  cl.setDiameter(55); // default is 40
  cl.setDensity(42); // default is 40
  cl.setSpeed(1); // default is 2
  cl.setFPS(33); // default is 24
  cl.show(); // Hidden by default
}

var PlayScene = function(){

}

extend(PlayScene, Scene);

PlayScene.prototype.run = function(){

}

PlayScene.prototype.run = function(){

}


var StartScene = function(){

}

extend(StartScene, Scene);

StartScene.prototype.run = function(){

}