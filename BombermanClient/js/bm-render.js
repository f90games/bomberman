"use strict"

var GraphEngine = function(c){
  this.sprites = [];
  this.tiles = [];
}

GraphEngine.prototype.setContext = function(ctx) {
  this.ctx = ctx;
}

GraphEngine.prototype.setScene = function(scene) {
  this.scene = scene;
}

GraphEngine.prototype.setCamera = function(camera) {
  this.camera = camera;
}

GraphEngine.prototype.clear = function() {  
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
}

GraphEngine.prototype.resourceFactory = function(resource, isTile){

  if(isTile){
    if(this.tiles[resource])
      return this.tiles[resource]
    else {
      var image  = new Image();
      image.src = "img/sprites/" + resource;
      return this.tiles[resource] = image;
    }
  } else {
    if(this.tiles[resource])
      return this.tiles[resource]
    else {
      var image  = new Image();
      image.src = "img/sprites/" + resource;
      return this.tiles[resource] = image;
    }    
  }
}


var SoundEngine = function(){
  this.sounds = [];
}

SoundEngine.prototype.playSound = function(sound, onplay, onstop, volume){
    if (this.sounds[sound]){
      this.sounds[sound].play();  
    } else {
      this.sounds[sound] = new Howl({
        volume: volume || 0.2,
        onplay: onplay || function(){}, 
        onend: onstop || function(){},
        urls: ['/data/sound/' + sound + '.mp3'] //TODO превести все звуки в mp3
      }).play();          
    }   
}

var Camera = function(c){

  // debugger;

  this.elId = c.elId || 'game-canvas';
  this.embedToId = c.embedToId || 'canvas-wrapper';

  this.screenWidth = c.screenWidth || 672;
  this.screenHeight = c.screenHeight || 480;

  this.mapTileSize = c.mapTileSize || 32;

  this.mapWidth = c.mapWidth || 21;
  this.mapHeight = c.mapWidth || 15;

  this.screenOffset = {};
}


Camera.prototype.updateCanvasHtml = function(){
  
  // if (!level) return;
  
  $('#canvas-wrapper').css({
    'width': this.screenWidth + 'px',
    'height': this.screenHeight + 'px'
    });
  
  $('#canvas-wrapper').html(
    '<canvas id="game-canvas" width="' + this.mapWidth * this.mapTileSize + 'px" height="' + this.mapHeight * this.mapTileSize + 'px" style="position: relative; transition: left 1s, top 1s;"></canvas>'
  );
  $('#canvas-game').attr('width', this.mapTileSize * this.mapWidth);
  $('#canvas-game').attr('height', this.mapTileSize * this.mapHeight);
  
  $('#game-canvas').css('left', '0px');
  $('#game-canvas').css('top', '0px');
  
  // var canvas = document.getElementById("game-canvas");  
  // this.ctx = canvas.getContext("2d");
  
}

Camera.prototype.checkScreenScroll = function(hero, dir){

  var deltaX = 0,
    deltaY = 0,
    step = 3;
  
  // if (!level) return;

  //horizontal
  var heroPosX = ((hero.pos - 1) % this.mapWidth) * this.mapTileSize
  var heroPosY = Math.ceil((hero.pos - 1) / this.mapWidth) * this.mapTileSize;
  
  if (dir.right)
  {
    deltaX = this.screenWidth - (heroPosX + this.screenOffset.x);
  }
  else if(dir.left)
  {
    deltaX = (heroPosX + this.screenOffset.x)
  }
  else if(dir.up)
  {
    deltaY = (heroPosY + this.screenOffset.y)
  }
  else if(dir.down)
  {
    deltaY = this.screenHeight - (heroPosY + this.screenOffset.y)
  }
  
  
  if (right)
  {
    if (deltaX <= step * this.mapTileSize)
    {
      this.screenOffset.x -= step * this.mapTileSize;
    }
  }
  else if(left)
  {
    if (deltaX <= step * this.mapTileSize)
    {
      this.screenOffset.x += step * this.mapTileSize;
    }
  }
  else if(up)
  {
    if (deltaY <= step * this.mapTileSize)
    {
      this.screenOffset.y += step * this.mapTileSize;
    }
  }
  else if (down)
  {
    if (deltaY <= step * this.mapTileSize)
    {
      this.screenOffset.y -= step * this.mapTileSize;
    }
  }
  
  if (this.screenOffset.x < (this.screenWidth - this.mapTileSize * this.mapWidth)) {
    this.screenOffset.x = this.screenWidth - this.mapTileSize * this.mapWidth;
  }
  
  if (this.screenOffset.y < (this.screenHeight - this.mapTileSize * this.mapHeight)) {
    this.screenOffset.y = this.screenHeight - this.mapTileSize * this.mapHeight;
  }
  
  if (Number(this.screenOffset.y) > 0) {
    this.screenOffset.y = 0;
  }
  
  if (this.screenOffset.x > 0) {
    this.screenOffset.x = 0;
  }
  
  $('#game-canvas').css('left', this.screenOffset.x + 'px');
  $('#game-canvas').css('top', this.screenOffset.y + 'px');
  
  
}