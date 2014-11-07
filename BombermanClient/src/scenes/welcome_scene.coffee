class WelcomeScene extends Scene
  start: () ->
    super()
    @view.play_start_animation(() =>
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

