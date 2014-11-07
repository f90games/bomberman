class WelcomeView extends View
  init_view: () ->
    @static_group = new Kinetic.Group()
    @layer.add(@static_group)
    @init_player_mode_selection_text()

  join_game: () -> 

  play_start_animation: (callback) ->
    @static_group.move(-300, 0)
    new Kinetic.Tween({
      node    : @static_group,
      duration: 1.2,
      x       : 0,
      easing  : Kinetic.Easings.Linear,
      onFinish: callback
    }).play()

  init_player_mode_selection_text: () ->
    @static_group.add(new Kinetic.Text({
      x         : 210,
      y         : 340,
      fontSize  : 22,
      fontStyle : "bold",
      fontFamily: "Courier",
      text      : "PRESS ENTER",
      fill      : "#fff"
    }))

