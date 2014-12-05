"use strict"

var Render = function(с){
  this.sprites = [];
  this.tiles = [];
  this.sounds = [];

}

Render.prototype.setScene = function(){

}

Render.prototype.setContext = function(ctx) {
  this.ctx = ctx;
}

Render.prototype.playSound = function(sound, onplay, onstop, volume){
    if (BM.sounds[sound]){
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

Render.prototype.clear = function() {  
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
}

Render.prototype.drawMap  = function() {
  
  var idx = 30, pos = 0, bomb, fx;
  var row = Math.floor(idx / 8);
  var column = idx % 8 - 1;
  
  for (var j=0; j < BM.level.mapHeight; j++)
  {
    for (var i=0; i < BM.level.mapWidth; i++)
    {
      
      pos = i + j * BM.level.mapWidth;

      idx = BM.map[pos];
      
      //map into real tiles
      if (idx == 0) idx = 30;
      
      var xDisp = idx % 8;
      if (xDisp)
      {
        row = Math.floor(idx / 8);
        column = xDisp - 1;
      }
      else
      {
        row = Math.floor(idx / 8) - 1;
        column = 7;
      }
    
      this.ctx.drawImage(BM.tiles, column * 32 + column + 1, row * 32 + row + 1,  32, 32, i*32, j*32, 32, 32);

      if (bomb = BM.bombs[pos]){
        if (bomb.status == BOMB_START)
          this.ctx.drawImage(BM.items, 0, 0,  32, 32, i*32, j*32, 32, 32);
        else if (bomb.status == BOMB_EXPLODE)
          this.ctx.drawImage(BM.items, 32 * 2, 0,  32, 32, i*32, j*32, 32, 32);   
        else if (bomb.status == 0)
          delete BM.bombs[pos];
      }

      if (fx = BM.fx[pos]){
        if (fx.status == 3){

          if (fx.direction == 0  || fx.direction == 3 )
            this.ctx.drawImage(BM.items, (32 * 3), 0,  32, 32, i*32, j*32, 32, 32);   
          else 
            this.ctx.drawImage(BM.items, (32 * 4), 0,  32, 32, i*32, j*32, 32, 32); 

          // this.ctx.drawImage(BM.items, (32 * (3 + (fx.direction % 2))), 0,  32, 32, i*32, j*32, 32, 32);   
        }
        else if (fx.status == 0)
          delete BM.fx[pos];
      }

    }
  }
  
}

Render.prototype.drawHeroes = function (){

  for (var i=0, max = BM.heros.length; i < max; i++)
  {
    var hero = BM.heros[i],
      hx = 0,
      hy = 0;

    var hx = 32 * ((hero.heroTileIndex % 4) - 1) * 3 + 32 * hero.step;
    if (hero.up)
    {
      hy = 32 * 3;
    }
    else if (hero.down)
    {
      hy = 0;
    }
    else if(hero.left)
    {
      hy = 32 * 1;
    }
    else if(hero.right)
    {
      hy = 32 * 2;
    }
    
    if (hero.heroTileIndex > 4) hy += 32 * 4;
    
    // var row = Math.floor(hero.pos / BM.level.mapWidth);
    // var column = hero.pos % BM.level.mapWidth - 1;
    
    hero.moveTo();
    
    if (hero.pos != hero.posTarget)
    {
      hero.step = 0
      Connector.sendHeroState()
    }

    var row = hero.point.y;
    var column = hero.point.x;

    //lifebar
    if (hero.hp > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(column * 32, row * 32 - 5);
      this.ctx.lineTo(column * 32 + hero.hp * 10, row * 32 - 5);
      this.ctx.lineWidth = 4;
      
      if (hero.hp == 3){
        this.ctx.strokeStyle = 'green';
      } else if (hero.hp == 2) {
        this.ctx.strokeStyle = 'yellow';
      } else if (hero.hp == 1) {
        this.ctx.strokeStyle = 'red';
      }
      
      this.ctx.stroke();

      this.ctx.drawImage(hero.herotiles, hx + hero.skin * 96, hy, 32, 32, column * 32, row * 32, 32, 32);
    }
  }

}

var Camera = function(c){

  this.elId = c.elId || 'game-canvas';
  this.embedToId = c.embedToId || 'canvas-wrapper';

  this.screenWidth = c.screenWidth || 640;
  this.screenHeight = c.screenHeight || 480;

  this.mapTileSize = c.mapTileSize || 32;

  this.mapWidth = c.mapWidth || 20;
  this.screenWidth = c.mapWidth || 15;

  this.screenOffset = {};
}


Camera.prototype.updateCanvasHtml = function(){
  
  if (!level) return;
  
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
  
  if (!level) return;

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