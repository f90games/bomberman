Flame = function(c){
  var config = c || {};  
}

Bomb = function(c, map){

  var config = c || {};
  this.map = map;
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

Bomb.EXPLODE_MATRIX_3x3 = [-21, -20, -19, -1, 0, 1, 19, 20, 21];
// Bomb.EXPLODE_MATRIX_3x3 = [-21, -20, -19, -1, 0, 1, 19, 20, 21];

Bomb.prototype.start = function (){
  var self = this;
  setTimeout(function(){
    self.explode();
  }, this.timeLeft);
}

Bomb.prototype.explode = function() {
  var self = this;
  this.status = 2;
  this.damage();
  setTimeout(function(){
    self.destroy();
  }, 1000);
}

Bomb.prototype.setFlame = function() {

}

//поражение всего вокруг каждую игровую петлю.
Bomb.prototype.damage = function() {
  for (var i = 0; i < Bomb.EXPLODE_MATRIX_3x3.length; i++) {
    var pos = this.pos - 1 + Bomb.EXPLODE_MATRIX_3x3[i];
    if ((pos >= 0) && (pos<=(15*20))){

      if (BM.map[pos] == 10) {
        //do nothing
      } else if (BM.map[pos] == 38) {
        // debugger;
        BM.map[pos] = 0;
        this.setFlame(pos);
      } else if (BM.map[pos] == 0) {
        this.setFlame(pos);
      }
      
    }
  };
  
}

//удаление бомбы с поля
Bomb.prototype.destroy = function(){
  this.status = 0;
}

if (typeof exports !== "undefined") //for node
{
  exports.Bomb = Bomb;
}