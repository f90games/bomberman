class BattleFieldScene extends Scene
  constructor: (@game, @view) ->
    super(@game, @view)
    @layer = @view.layer
    @map   = new Map2D(@layer)
    $.ajax {
      url     : "data/levels.json",
      success : (json) => @builder = new TiledMapBuilder(@map, json),
      dataType: 'json',
      async   : false
    }
    # @reset_config_variables()

  # reset_config_variables: () ->
  #   @fps = 0
  #   @remain_enemy_counts = 0
  #   @current_stage = 0
  #   @last_enemy_born_area_index = 0

  load_config_variables: () ->
    @fps                        = @game.get_config('fps')

  start: () ->
    super()
    @load_config_variables()
    @start_map()
    # @enable_user_control()
    @enable_system_control()
    @start_time_line()
    @running = true

  stop: () ->
    super()
    @stop_time_line()
    @map.reset()

  save_user_status: () ->

  start_map: () ->
    # wait until builder loaded
    @map.bind('map_ready', (() -> @sound.play('start_stage')), this)

    #more binds!
    @builder.setup_stage(1)
    
    @map.trigger('map_ready')

  enable_user_control: () ->
    p1_control_mappings = {
      "UP"   : "up",
      "DOWN" : "down",
      "LEFT" : "left",
      "RIGHT": "right",
      "Z"    : "fire"
    }

  enable_system_control: () ->
    @keyboard.on_key_down "ENTER", (event) =>
      if @running then @pause() else @rescue()

  pause: () ->
    @running = false
    @stop_time_line()
    @disable_user_controls()

  disable_user_controls: () ->
    @keyboard.reset()
    @map.p1_tank().commander.reset() if @map.p1_tank()
    @enable_system_control()

  rescue: () ->
    @running = true
    @start_time_line()
    # @enable_user_control()

  start_time_line: () ->
    last_time = new Date()
    @timeline = setInterval(() =>
      current_time = new Date()
      delta_time = current_time.getMilliseconds() - last_time.getMilliseconds()
      # assume a frame will never last more than 1 second
      delta_time += 1000 if delta_time < 0
      unit.integration(delta_time) for unit in @map.tanks
      last_time = current_time
      @frame_rate += 1
    , parseInt(1000/@fps))
    # show frame rate
    # @frame_timeline = setInterval(() =>
    #   @view.update_frame_rate(@frame_rate)
    #   @frame_rate = 0
    # , 1000)

  stop_time_line: () ->
    clearInterval(@timeline)
    clearInterval(@frame_timeline)

  born_users_units: (unit) ->

  born_user_unit: () ->


  check_user_win: () ->
    if @remain_enemy_counts == 0 and _.size(@map.enemy_tanks()) == 0
      @user_win()

  check_enemy_win: () ->
    @enemy_win() if (@remain_user_p1_lives == 0 and @remain_user_p2_lives == 0)

  user_win: () ->
    return unless _.isNull(@winner)
    @winner = 'user'
    # report
    setTimeout((() =>
      @save_user_status()
      @game.switch_scene('report')
    ), 3000)

  enemy_win: () ->
    return unless _.isNull(@winner)
    @winner = 'enemy'
    @disable_user_controls()
    setTimeout(() =>
      @game.update_status('game_over', true)
      @sound.play('lose')
      @game.switch_scene('report')
    , 3000)

  increase_kill_score_by_user: (tank, killed_by_tank) ->
    tank_score = @game.get_config("score_for_#{tank.type()}")
    if killed_by_tank instanceof UserP1Tank
      @game.increase_p1_score(tank_score)
    else
      @game.increase_p2_score(tank_score)

  increase_enemy_kills_by_user: (tank, killed_by_tank) ->
    if killed_by_tank instanceof UserP1Tank
      p1_kills = @game.get_status('p1_killed_enemies')
      p1_kills.push(tank.type())
    else
      p2_kills = @game.get_status('p2_killed_enemies')
      p2_kills.push(tank.type())

  draw_tank_points: (tank, killed_by_tank) ->
    if tank instanceof EnemyTank
      @view.draw_point_label(tank, @game.get_config("score_for_#{tank.type()}"))

  increase_gift_score_by_user: (gift, tanks) ->
    _.each(tanks, (tank) =>
      gift_score = @game.get_config("score_for_gift")
      if tank instanceof UserP1Tank
        @game.increase_p1_score(gift_score)
      else if tank instanceof UserP2Tank
        @game.increase_p2_score(gift_score)
    )

  draw_gift_points: (gift, tanks) ->
    _.detect(tanks, (tank) =>
      if tank instanceof UserTank
        @view.draw_point_label(tank, @game.get_config("score_for_gift"))
        true
      else
        false
    )
