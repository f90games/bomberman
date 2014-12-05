"use scrict"

window.PLAY_SCENE = 1;
window.START_SCENE = 2;
window.LOADING_SCENE = 3;
window.MENU_SCENE = 4;
window.SELECT_ROOM_SCENE = 5;
window.YOU_LOST_SCENE = 6;
window.SHOP_SCENE = 7;

var Scene = function(c){

  this.elId = c.elId || 'game-canvas';
  this.embedToId = c.embedToId || 'canvas-wrapper';


  this.camera = new Camera({
    elId: this.elId,
    embedToId: this.embedToId,

    width: c.width,
    height: c.height
  });

  

}

var LoadingScene = function(c){
  LoadingScene.superclass.constructor.apply(this, arguments);
}

extend(LoadingScene, Scene);

LoadingScene.prototype.run = function(){
  var cl = new CanvasLoader(this.embedToId);
  cl.setDiameter(55); // default is 40
  cl.setDensity(42); // default is 40
  cl.setSpeed(1); // default is 2
  cl.setFPS(33); // default is 24
  cl.show(); // Hidden by default
}

var PlayScene = function(c){
  PlayScene.superclass.constructor.apply(this, arguments);
  this.camera.updateCanvasHtml();
}

extend(PlayScene, Scene);

PlayScene.prototype.run = function(){
  this.drawMap(); //первый кадр
}

PlayScene.prototype.frame = function(){
  this.drawMap();
  this.drawHeroes();
}


PlayScene.prototype.drawMap  = function() {
  
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

PlayScene.prototype.drawHeroes = function (){

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


var StartScene = function(c){
  StartScene.superclass.constructor.apply(this, arguments);
}

extend(StartScene, Scene);

StartScene.prototype.run = function(){

}