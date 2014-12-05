"use strict"

var Input = function(){

}

Input.prototype.init = function(){

  kd.run(function () {
    kd.tick();
  });

  kd.LEFT.down = function(){

    checkScreenScroll(BM.hero, false, true);
  
    BM.hero.turn(PLAYER_LEFT);
    
    if (BM.hero.left) BM.hero.step_left = true;

  }
  
  kd.UP.down = function(){

    checkScreenScroll(BM.hero, false, false, true, false);
  
    BM.hero.turn(PLAYER_UP);
    
    if (BM.hero.up) BM.hero.step_up = true;
    
  }
  
  kd.DOWN.down = function(){
    
    checkScreenScroll(BM.hero, false, false, false, true);
    
    BM.hero.turn(PLAYER_DOWN);

    if (BM.hero.down) BM.hero.step_down = true;

  }
  
  kd.RIGHT.down = function(){

    checkScreenScroll(BM.hero, true, false);
  
    BM.hero.turn(PLAYER_RIGHT);
        
    if (BM.hero.right) BM.hero.step_right = true;

  }
  
  kd.SPACE.down = function(){
    BM.hero.place_bomb = true;
  }
}

