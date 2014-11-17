Bomb = function(c, map){

  var config = c || {};
  this.map = map;
  this.pos = config.pos || 0;
  this.status = config.status || 0; //0: destroyed, 1: normal, 2: explode
  this.timeLeft = config.timeLeft || 3000; //3 секунды

  this.power = config.power || 1; //radius
}

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

//поражение всего вокруг каждую игровую петлю.
Bomb.prototype.damage = function() {
  
}

//удаление бомбы с поля
Bomb.prototype.destroy = function(){
  this.status = 0;
}

if (typeof exports !== "undefined") //for node
{
  exports.Bomb = Bomb;
}