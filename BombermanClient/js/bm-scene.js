"use scrict"

window.PLAY_SCENE = 1;
window.START_SCENE = 2;
window.LOADING_SCENE = 3;
window.MENU_SCENE = 4;
window.SELECT_ROOM_SCENE = 5;
window.YOU_LOST_SCENE = 6;
window.SHOP_SCENE = 7;

var Scene = function(c){

  if (!c)
    var c = {};

  this.elId = c.elId || 'game-canvas';
  this.embedToId = c.embedToId || 'canvas-wrapper';

  this.screenWidth = c.screenWidth || 672;
  this.screenHeight = c.screenHeight || 480;

  this.mapTileSize = c.mapTileSize || 32;

  this.mapWidth = c.mapWidth || 21;
  this.mapHeight = c.mapWidth || 15;

  this.camera = new Camera({
    elId: this.elId,
    embedToId: this.embedToId,

    screenWidth: c.screenWidth,
    screenHeight: c.screenHeight,

    mapTileSize: c.mapTileSize,
    
    mapWidth: c.mapWidth,
    mapHeight: c.mapHeight
  });


  this.game = c.game || BM.game;

  this.render = this.game.getRender();

  this.render.setCamera(this.camera);

}

var LoadingScene = function(c){
  LoadingScene.superclass.constructor.apply(this, arguments);
}

extend(LoadingScene, Scene);

LoadingScene.prototype.run = function(){
  var cl = this.cl = new CanvasLoader(this.embedToId);
  cl.setDiameter(55); // default is 40
  cl.setDensity(42); // default is 40
  cl.setSpeed(1); // default is 2
  cl.setFPS(33); // default is 24
  cl.show(); // Hidden by default
}

LoadingScene.prototype.stop = function(){
  this.cl.hide();
}

var PlayScene = function(c){
  PlayScene.superclass.constructor.apply(this, arguments);
  this.camera.updateCanvasHtml();

  var canvas = document.getElementById("game-canvas"); 

  this.render.setContext(canvas.getContext("2d")); 

}

extend(PlayScene, Scene);

PlayScene.prototype.run = function(){

  var game = this.game;

  var state = this.game.getState();    

  this.drawMap(state); //первый кадр
}

PlayScene.prototype.initControls = function(){



  kd.LEFT.down = function(){
    // this.camera.checkScreenScroll(BM.hero, false, true);  
    // game.turn(PLAYER_LEFT);
    // if (BM.hero.left) BM.hero.step_left = true;
  }
  
  kd.UP.down = function(){
    // this.camera.checkScreenScroll(BM.hero, false, false, true, false);
    // BM.hero.turn(PLAYER_UP);
    // if (BM.hero.up) BM.hero.step_up = true;
  }
  
  kd.DOWN.down = function(){
    // this.camera.checkScreenScroll(BM.hero, false, false, false, true);
    // BM.hero.turn(PLAYER_DOWN);
    // if (BM.hero.down) BM.hero.step_down = true;
  }
  
  kd.RIGHT.down = function(){
    // this.camera.checkScreenScroll(BM.hero, true, false);
    // BM.hero.turn(PLAYER_RIGHT);
    // if (BM.hero.right) BM.hero.step_right = true;
  }
  
  kd.SPACE.down = function(){
    // BM.hero.place_bomb = true;
  }


}

PlayScene.prototype.stop = function(){

}

PlayScene.prototype.gameLoop = function (){
  var state = this.game.getState();

  var hero = state.getCurrentHero();

  if (hero.hp > 0){

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

PlayScene.prototype.frame = function(){

  var state = this.game.getState();

  this.drawMap(state);
  this.drawHeroes(state);
}

PlayScene.prototype.drawMap  = function(state) {

  var game = this.game;

  var tilesImage = this.render.resourceFactory('tmw_desert_spacing.png');
  var itemsImage = this.render.resourceFactory('bomb.png');
  var spritesImage = this.render.resourceFactory('vx_chara00.png');
  
  var idx = 30, pos = 0, bomb, fx;
  var row = Math.floor(idx / 8);
  var column = idx % 8 - 1;
  
  for (var j=0; j < state.level.mapHeight; j++)
  {
    for (var i=0; i < state.level.mapWidth; i++)
    {
      
      pos = i + j * state.level.mapWidth;

      idx = state.map[pos];
      
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
    
      this.render.ctx.drawImage(tilesImage, column * 32 + column + 1, row * 32 + row + 1,  32, 32, i*32, j*32, 32, 32);

      if (bomb = state.bombs[pos]){
        if (bomb.status == BOMB_START)
          this.render.ctx.drawImage(state.items, 0, 0,  32, 32, i*32, j*32, 32, 32);
        else if (bomb.status == BOMB_EXPLODE)
          this.render.ctx.drawImage(state.items, 32 * 2, 0,  32, 32, i*32, j*32, 32, 32);   
        else if (bomb.status == 0)
          delete game.bombs[pos];
      }

      if (fx = state.fx[pos]){
        if (fx.status == 3){

          if (fx.direction == 0  || fx.direction == 3 )
            this.render.ctx.drawImage(itemsImage, (32 * 3), 0,  32, 32, i*32, j*32, 32, 32);   
          else 
            this.render.ctx.drawImage(itemsImage, (32 * 4), 0,  32, 32, i*32, j*32, 32, 32); 

          // this.render.ctx.drawImage(BM.items, (32 * (3 + (fx.direction % 2))), 0,  32, 32, i*32, j*32, 32, 32);   
        }
        else if (fx.status == 0)
          delete BM.fx[pos];
      }

    }
  }
  
}

PlayScene.prototype.drawHeroes = function (state){

  if (!state)
    var state = this.game.getState();

  for (var i=0, max = state.heros.length; i < max; i++)
  {
    var hero = state.heros[i],
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
      this.render.ctx.beginPath();
      this.render.ctx.moveTo(column * 32, row * 32 - 5);
      this.render.ctx.lineTo(column * 32 + hero.hp * 10, row * 32 - 5);
      this.render.ctx.lineWidth = 4;
      
      if (hero.hp == 3){
        this.render.ctx.strokeStyle = 'green';
      } else if (hero.hp == 2) {
        this.render.ctx.strokeStyle = 'yellow';
      } else if (hero.hp == 1) {
        this.render.ctx.strokeStyle = 'red';
      }
      
      this.render.ctx.stroke();

      this.render.ctx.drawImage(hero.herotiles, hx + hero.skin * 96, hy, 32, 32, column * 32, row * 32, 32, 32);
    }
  }

}


var StartScene = function(c){
  StartScene.superclass.constructor.apply(this, arguments);
}

extend(StartScene, Scene);

StartScene.prototype.run = function(){

}