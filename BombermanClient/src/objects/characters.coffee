class Character extends MovableMapUnit2D
  constructor: (@map, @area) ->
    @hp = 10
    @power = 1
    @level = 1
    @max_missile = 1
    @max_hp = 10
    @bombs = []
    @initializing = true
    @frozen = false
    super(@map, @area)
    @bom_on_destroy = true

  dead: () -> @hp <= 0


  hp_up: (lives) -> @hp_down(-lives)

  hp_down: (lives) ->
    @hp -= lives
    if @dead()
      @destroy()
    else
      @level = _.max([1, @level - 1])
      @_level_adjust()

  on_ship: (@ship) -> @update_display()

  handle_move: (cmd, delta_time) -> super(cmd, delta_time) unless @frozen

  handle_turn: (cmd) -> super(cmd) unless @frozen

  integration: (delta_time) ->
    return if @initializing or @destroyed
    super(delta_time)
    @handle_fire(cmd) for cmd in @commands

  after_new_display: () ->
    super()
    @display_object.afterFrame 4, () =>
      @initializing = false
      @update_display()

  destroy: () ->
    super()

class UserCharacter extends Character
  constructor: (@map, @area) ->

  speed: 0.13

  animation_state: () ->
    return "tank_born" if @initializing
    return "#{@type()}_lv#{@level}_with_guard" if @guard
    return "#{@type()}_lv#{@level}_frozen" if @frozen
    return "#{@type()}_lv#{@level}_with_ship" if @ship
    "#{@type()}_lv#{@level}"
  accept: (map_unit) ->
    (map_unit instanceof Missile) and (map_unit.parent is this)

  handle_move: (cmd, delta_time) ->
    super(cmd, delta_time)
    @map.trigger('user_moved')

class NPCharacter extends Character 
