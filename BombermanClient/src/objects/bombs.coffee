class Bomb extends MovableMapUnit2D
  speed: 0.20
  constructor: (@map, @parent) ->
    @area = @born_area(@parent)
    super(@map, @area)
    @power = @parent.power
    @energy = @power
    @direction = @parent.direction
    @exploded = false
    @commander = new MissileCommander(this)


  type: -> 'missile'
  explode: -> @exploded = true

  destroy: () ->
    super()
    @parent.delete_missile(this)

  animation_state: () -> 'missile'

  destroy_area: ->
    switch @direction
      when Direction.UP
        new MapArea2D(
          @area.x1 - @default_width/4,
          @area.y1 - @default_height/4,
          @area.x2 + @default_width/4,
          @area.y1
        )
      when Direction.RIGHT
        new MapArea2D(
          @area.x2,
          @area.y1 - @default_height/4,
          @area.x2 + @default_width/4,
          @area.y2 + @default_height/4
        )
      when Direction.DOWN
        new MapArea2D(
          @area.x1 - @default_width/4,
          @area.y2,
          @area.x2 + @default_width/4,
          @area.y2 + @default_height/4
        )
      when Direction.LEFT
        new MapArea2D(
          @area.x1 - @default_width/4,
          @area.y1 - @default_height/4,
          @area.x1,
          @area.y2 + @default_height/4
        )
  defend: (missile, destroy_area) ->
    @destroy()
    @max_defend_point - 1
  accept: (map_unit) ->
    map_unit is @parent or
      (map_unit instanceof Missile and map_unit.parent is @parent)
