class Direction
  @UP   : 0
  @DOWN : 180
  @LEFT : 270
  @RIGHT: 90
  @all  : () -> [@UP, @DOWN, @LEFT, @RIGHT]

class BaseSprite
  @width : 32
  @height: 48

class BaseTile
  @width :  32
  @height:  32

class Animations
  @movables: {

  }

  @movable: (type) -> @movables[type]

  @gifts: {

  }

  @terrains: {
    brick         : [{x: 0, y: 240, width: 32, height: 32}],
    floor         : [{x: 0, y: 240, width: 32, height: 32}]
  }

  @terrain: (type) -> @terrains[type]

