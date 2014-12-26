"use strict"

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


    }, 2000);


  }
})();