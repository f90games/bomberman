Flame = function(c){
  var config = c || {};
  this.pos = config.pos || 0;
  this.status = config.status || 0;
  this.direction = config.direction || 0;
}

Flame.prototype.start = function(){
  var self = this;

  setTimeout(function(){
    self.destroy();
  }, 300);  
}

Flame.prototype.destroy = function(){
  this.status = 0;
}

Bomb = function(c){

  var config = c || {};
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode, 3: flame
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

Bomb.EXPLODE_MATRIX_3x3 = [-20, -1, 1, 20];
Bomb.EXPLODE_MATRIX_5x5 = [-40, -20, -2, -1,  1, 2, 20, 40];
// Bomb.EXPLODE_MATRIX_3x3 = [-21, -20, -19, -1, 0, 1, 19, 20, 21];

Bomb.prototype.start = function (){
  var self = this;
  setTimeout(function(){
    self.explode();
  }, this.timeLeft);
}

Bomb.prototype.explode = function() {
  var self = this;
  this.status = BOMB_EXPLODE;

  // for (var i = 0; i < Bomb.EXPLODE_MATRIX_5x5.length; i++) {
  //   var pos = this.pos - 1 + Bomb.EXPLODE_MATRIX_5x5[i];

  //   if ((pos >= 0) && (pos<=(15*20))){
  //     this.damage(pos);
  //   }
  // };

  this.damage(this.pos)

  for (var d = 0; d < 4; d++) { //d = direction
    var i = 1, goExplode = true;
    do {

      var pos = this.pos - 1 + (Bomb.EXPLODE_MATRIX_3x3[d] * i);

      if ((pos >= 0) && (pos<=(15*20))){
        goExplode = this.damage(pos, d);
      }

      i++;
    } while ((i <= this.power) && goExplode);
  };

  // debugger;
  // console.log(BM.fx);

  setTimeout(function(){
    self.destroy();
  }, 1000);
}

Bomb.prototype.setFlame = function(pos, d) { //форк на осколки
  var flame = BM.fx[pos] = new Flame({
    pos: pos,
    status: 3,
    direction: d
  });

  flame.start();
}

Bomb.prototype.damage = function(pos, d) {
  if (BM.map[pos] == 10) {
    //do nothing
    return false;
  } else if (BM.map[pos] == 38) {
    // debugger;
    BM.map[pos] = 0;
    this.setFlame(pos, d);
  } else if (BM.map[pos] == 0) {
    this.setFlame(pos, d);
  }

  if ((BM.hero.pos - 1) == pos) {
    BM.hero.hp -= 1;

    if (BM.hero.hp == 0)
      alert('Герой убит!');
  }; 

  return true; 
}

//удаление бомбы с поля
Bomb.prototype.destroy = function(){
  this.status = 0;
}

if (typeof exports !== "undefined") //for node
{
  exports.Bomb = Bomb;
}