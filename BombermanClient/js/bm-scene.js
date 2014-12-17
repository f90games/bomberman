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

  this.gameFrameTime = c.gameFrameTime || 50;

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

Scene.prototype.stop = function(){
  $('#' + this.embedToId).text('');
}

///////////////////////////////////////////////////////////////////////////

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
  LoadingScene.superclass.stop.apply(this, arguments);
}

///////////////////////////////////////////////////////////////////////////

var PlayScene = function(c){
  PlayScene.superclass.constructor.apply(this, arguments);
  this.camera.updateCanvasHtml();

  var canvas = document.getElementById("game-canvas"); 
  this.render.setContext(canvas.getContext("2d")); 

}

extend(PlayScene, Scene);


//STATIC!!! ---

PlayScene.checkBombPos = function(state, pos){ 
  if(state.bombs[pos])
    state.bombs[pos].power++;

  return state.bombs[pos] == null
}

PlayScene.place_bomb = function(self){
  var state = self.game.getState();
  var hero = state.getCurrentHero();

  // var bomb_idx = new Date().getTime();

  var bomb = new Bomb({
    power: 2,
    pos: hero.pos,
    timeLeft: 3000,
    status: BOMB_START,
    level: state.level
  }, state.map);

  bomb.start();
  
  if (PlayScene.checkBombPos(state, hero.pos-1))
  {
    state.bombs[hero.pos-1] = bomb;
    // Connector && Connector.sendB(bomb)
  }
}

PlayScene.press_left = function(self){
  var hero = self.game.state.getCurrentHero();

  self.camera.checkScreenScroll(hero, {right: false, left: true, up: false, down: false});  
  hero.turn(PLAYER_LEFT);
  if (hero.left) hero.step_left = true;
}

PlayScene.press_up = function(self){
  var hero = self.game.state.getCurrentHero();
  
  self.camera.checkScreenScroll(hero, {right: false, left: false, up: true, down: false});
  hero.turn(PLAYER_UP);
  if (hero.up) hero.step_up = true;
}

PlayScene.press_right = function(self){
  var hero = self.game.state.getCurrentHero();

  self.camera.checkScreenScroll(hero, {right: true, left: false, up: false, down: false});
  hero.turn(PLAYER_RIGHT);
  if (hero.right) hero.step_right = true;
}

PlayScene.press_down = function(self){
  var hero = self.game.state.getCurrentHero();

  self.camera.checkScreenScroll(hero, {right: false, left: false, up: false, down: true});
  hero.turn(PLAYER_DOWN);
  if (hero.down) hero.step_down = true;  
}

PlayScene.press_switch = function(self){
  
}

PlayScene.press_pause = function(self){
  
}

PlayScene.press_menu = function(self){
  self.game.createScene(MENU_SCENE);
}

PlayScene.checkHeroPos = function(map, newPos){
  return map[newPos - 1] === 0
}




PlayScene.prototype.run = function(){

  var self = this;

  var game = this.game;

  var state = this.game.getState(); 

  this.drawMap(state); //первый кадр
  this.initControls();
  // this.spawnHero();

  this.timer = setInterval(function(){
      self.frame.call(self);
    },
    this.gameFrameTime
  );  

}

PlayScene.prototype.stop = function(){
  clearInterval(this.timer);
  PlayScene.superclass.stop.apply(this, arguments);
}

PlayScene.prototype.initControls = function(){

  var em = this.game.em;

  this.game.input.reset();  

  var self = this; //коряво

  kd.LEFT.down = function(){

    em.fire('play_scene.press_left', [self]);

  }
  
  kd.UP.down = function(){

    em.fire('play_scene.press_up', [self]);

  }
  
  kd.DOWN.down = function(){

    em.fire('play_scene.press_down', [self]);

  }
  
  kd.RIGHT.down = function(){

    em.fire('play_scene.press_right', [self]);

  }
  
  kd.SPACE.down = function(){

    em.fire('play_scene.place_bomb', [self]);

    // hero.place_bomb = true;
  }

  kd.ENTER.down = function(){

    em.fire('play_scene.press_switch', [self]);
    
    // hero.place_bomb = true;
  }

  kd.ESC.down = function(){

    em.fire('play_scene.press_menu', [self]);
    
    // hero.place_bomb = true;
  }

}


PlayScene.prototype.gameLoop = function (){
  var state = this.game.getState();
  // var hero = state.getCurrentHero();

  var hero;

  for (var i = 0; i < state.heros.length; i++) {
    hero = state.heros[i]
  

    if (hero.hp > 0){

      if((hero.posTarget == hero.pos)){     

        if(hero.step_up)
        {
          if (PlayScene.checkHeroPos(state.map, hero.pos - state.level.mapWidth))
          {
            hero.posTarget -= state.level.mapWidth;
          }
        }
        else if (hero.step_down)
        {
          
          if (PlayScene.checkHeroPos(state.map, hero.pos + state.level.mapWidth))
          {
            hero.posTarget += state.level.mapWidth;
          }
        }
        else if (hero.step_left)
        {
          if (PlayScene.checkHeroPos(state.map, hero.pos - 1))
          {
            hero.posTarget--;
          }
        }
        else if (hero.step_right)
        {
          if (PlayScene.checkHeroPos(state.map, hero.pos + 1))
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
          level: state.level
        }, BM.map);

        bomb.start();
        
        if (PlayScene.checkBombPos(BM, hero.pos-1))
        {
          state.bombs[hero.pos-1] = bomb;
          Connector && Connector.sendB(bomb)
        }

      }


    }

  };
  
  // hero.place_bomb = hero.step_left = hero.step_right = hero.step_up = hero.step_down = false;

  hero.place_bomb = false;
}

PlayScene.prototype.frame = function(){

  var state = this.game.getState();

  this.gameLoop();

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
          this.render.ctx.drawImage(itemsImage, 0, 0,  32, 32, i*32, j*32, 32, 32);
        else if (bomb.status == BOMB_EXPLODE)
          this.render.ctx.drawImage(itemsImage, 32 * 2, 0,  32, 32, i*32, j*32, 32, 32);   
        else if (bomb.status == 0)
          delete state.bombs[pos];
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
          delete state.fx[pos];
      }

    }
  }
  
}

PlayScene.prototype.drawHeroes = function (state){

  var spritesImage = this.render.resourceFactory('vx_chara00.png');

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
      // Connector.sendHeroState()
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

      this.render.ctx.drawImage(spritesImage, hx + hero.skin * 96, hy, 32, 32, column * 32, row * 32, 32, 32);
    }
  }

}


var MenuScene = function(c){
  MenuScene.superclass.constructor.apply(this, arguments);

  this.currentLevelPage = 0;

  this.camera.updateCanvasHtml();

  var canvas = document.getElementById("game-canvas"); 
  this.render.setContext(canvas.getContext("2d"));

  this.levels = ['Level 0', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

}

extend(MenuScene, Scene);

MenuScene.prototype.run = function(){
  this.initControls();

  var self = this;

  this.timer = setInterval(function(){
      self.frame.call(self);
    },
    this.gameFrameTime
  );   

}

MenuScene.prototype.stop = function(){
  clearInterval(this.timer);
}

MenuScene.prototype.frame = function(){
  this.drawBackground();
  this.drawLevels();
}

MenuScene.prototype.drawBackground = function(){
  var img = this.render.resourceFactory('menu_screen_bm.png');
  this.render.ctx.drawImage(img, 0, 0, 672, 480, 0, 0, 672, 480);

}

MenuScene.prototype.drawLevels = function(){
  var ctx = this.render.ctx;

  ctx.fillStyle = "#ffba00";
  ctx.font = "30pt Arial";

  var levelText = '';

  for (var i = 0; i < this.levels.length; i++) {

    levelText = this.levels[i];

    if (this.game.getState().getCurrentLevel() == i){
      levelText += ' ←';
    }

    ctx.fillText(levelText, 100, 100 + 50 * i);
  };

}

MenuScene.prototype.initControls = function(){

  this.game.input.reset();

  var em = this.game.em;


  kd.DOWN.down = function(){

    em.fire('menu_scene.press_down', [self]);

  }
  
  kd.UP.down = function(){

    em.fire('menu_scene.press_up', [self]);

  }

  kd.ESC.down = function(){

    em.fire('menu_scene.press_menu', [self]);

  }

  kd.ENTER.down = function(){

    em.fire('menu_scene.press_enter', [self]);

  }  

}

MenuScene.press_up = function(self){

  var currentLevel = BM.game.getState().getCurrentLevel();

  if(currentLevel > 0){
    currentLevel--;
    BM.game.getState().setCurrentLevel(currentLevel);
  }
}

MenuScene.press_down = function(self){
  var currentLevel = BM.game.getState().getCurrentLevel();

  if(currentLevel < 5){
    currentLevel++;
    BM.game.getState().setCurrentLevel(currentLevel);
  }
}


var StartScene = function(c){
  StartScene.superclass.constructor.apply(this, arguments);

  this.camera.updateCanvasHtml();

  var canvas = document.getElementById("game-canvas"); 
  this.render.setContext(canvas.getContext("2d"));

}

extend(StartScene, Scene);

StartScene.prototype.run = function(){
  this.drawBackground();
}


StartScene.prototype.drawBackground = function(){
  var img = this.render.resourceFactory('start_screen_bm.png');
  this.render.ctx.drawImage(img, 0, 0, 672, 480, 0, 0, 672, 480);

}
