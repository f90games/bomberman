"use strict"

var Input = function(c){

  var em = BM.game.em;

  //menu scene ===================================================
  em.addListener('menu_scene.press_down', MenuScene.press_down);
  em.addListener('menu_scene.press_up', MenuScene.press_up);
  em.addListener('menu_scene.press_menu', function(){
    if (BM.game.getState().getCurrentHero())
      if(BM.game.getState().getCurrentHero().hp > 0)
        BM.game.createScene(PLAY_SCENE);
  });

  em.addListener('menu_scene.press_enter', function(){
    BM.game.makeGame();
  });  

  em.addListener('play_scene.place_bomb', PlayScene.place_bomb);

  em.addListener('play_scene.press_left', PlayScene.press_left);
  em.addListener('play_scene.press_up', PlayScene.press_up);
  em.addListener('play_scene.press_right', PlayScene.press_right);
  em.addListener('play_scene.press_down', PlayScene.press_down);

  em.addListener('play_scene.press_switch', PlayScene.press_switch);

  em.addListener('play_scene.press_menu', PlayScene.press_menu);  

  //

  this.init();
}

Input.prototype.init = function(){



  kd.run(function () {
    kd.tick();
  });

}

Input.prototype.reset = function(){

  kd.LEFT.down = kd.UP.down = kd.DOWN.down = kd.RIGHT.down = kd.SPACE.down = kd.ESC.down = function(){};

}

