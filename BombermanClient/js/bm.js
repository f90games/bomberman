"use strict"

window.BOMB_START = 1;
window.BOMB_EXPLODE = 2;
window.FX_CATCH_FIRE = 3;

window.PLAYER_LEFT = 1;
window.PLAYER_UP = 2;
window.PLAYER_DOWN = 3;
window.PLAYER_RIGHT = 4;

window.PLAYER_SPEED = 4; //количество фреймов для движения
window.PLAYER_STEPS = 4; //количество шагов

var BM;

function extend(Child, Parent) {
  var F = function() { }
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.superclass = Parent.prototype
}

(function(){
  BM = {}; //для глобальной видимости

  BM.init = function(){
    var game = BM.game = new Game({});
    
    var state = BM.state = new GameState({
      level: 1 //
    });

    var input = BM.input = new Input({});

    var render = BM.render = new Render({
      elId: "game-canvas",
      embedToId: "canvas-wrapper"
    });

    // var canvas = document.getElementById("game-canvas");     

    var connector = BM.connector = new Connector({});

    game.setState(state); //именно state будет обнуляться
    game.setRender(render);
    game.setInput(input);
    game.setConnector(connector);

    game.init();

    game.createScene(LOADING_SCENE);

    setTimeout(3000, game.createScene(PLAY_SCENE));
  }
})();