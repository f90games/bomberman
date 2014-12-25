"use strict"

window.BOMB_START = 1;
window.BOMB_EXPLODE = 2;
window.FX_CATCH_FIRE = 3;

window.PLAYER_LEFT = 1;
window.PLAYER_UP = 2;
window.PLAYER_DOWN = 3;
window.PLAYER_RIGHT = 4;

window.GAMEMODE_SINGLE = 1;
window.GAMEMODE_MULTI = 2;

window.PLAYER_SPEED = 4; //количество фреймов для движения
window.PLAYER_STEPS = 4; //количество шагов

function extend(Child, Parent) {
  var F = function() { }
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.superclass = Parent.prototype
}

var BM;

(function(){
  BM = {}; //для глобальной видимости

  BM.init = function(){
    var game = BM.game = new Game({});
    
    var state = new GameState({
      currentLevel: 0
    });

    var input = new Input({});

    var render = BM.graphEngine = new GraphEngine({
      elId: "game-canvas",
      embedToId: "canvas-wrapper"
    });

    // var sound = BM.soundEngine = new SoundEngine({

    // });  

    var connector = BM.connector = new BM.Connector({});
	
	connector.on('connected', _.bind(game.bindConnector, game))
	
    game.setState(state); //именно state будет обнуляться
    game.setRender(render);
    // game.setSound(sound);
    game.setInput(input);
    game.setConnector(connector);

    game.init();

    game.createScene(LOADING_SCENE);

    //load resources
    render.resourceFactory('start_screen_bm.png');
    render.resourceFactory('menu_screen_bm.png');
    render.resourceFactory('tmw_desert_spacing.png');
    render.resourceFactory('vx_chara00.png');

    setTimeout(function(){

      game.createScene(START_SCENE);

      setTimeout(function(){
        game.makeGame(0);
      }, 2000);
    }, 1000);


  }
})();