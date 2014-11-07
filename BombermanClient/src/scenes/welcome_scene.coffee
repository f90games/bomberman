class WelcomeScene extends Scene
  start: () ->
    super()
    @view.play_start_animation(() =>
      @view.update_player_mode(@game.single_player_mode())
      @enable_selection_control()
    )

  stop: () ->
    super()
    @prepare_for_game_scene()

  prepare_for_game_scene: () ->
    @game.update_status('game_over', false)
    @game.update_status('stage_autostart', false)


  enable_selection_control: () ->
    @keyboard.on_key_down 'ENTER', () =>
      @game.switch_scene('stage')

    @keyboard.on_key_down 'SPACE', () =>
      @toggle_players()

  toggle_players: () ->
    if @game.single_player_mode()
      @game.update_status('players', 2)
    else
      @game.update_status('players', 1)
    @view.update_player_mode(@game.single_player_mode())
