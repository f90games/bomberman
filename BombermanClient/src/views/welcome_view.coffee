class WelcomeView extends View
  init_view: () ->
    @static_group = new Kinetic.Group()
    @layer.add(@static_group)
    @init_background()
    @init_player_enter_text()

  join_game: () -> 

  play_start_animation: (callback) ->
    new Kinetic.Tween({
      node    : @text,
      duration: 1.2,
      x       : 250,
      easing  : Kinetic.Easings.Linear,
      onFinish: callback
    }).play()

  init_background: () ->

    imageObj = new Image();
    imageObj.src = '/img/static/wellcome.jpg'

    @background = new Kinetic.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: 640,
      height: 480
    });

    @static_group.add(@background)

  init_player_enter_text: () ->
    @text = new Kinetic.Text({
          x         : 0,
          y         : 120,
          fontSize  : 22,
          fontStyle : "bold",
          fontFamily: "Courier",
          text      : "PRESS ENTER",
          fill      : "#fff"
        })    
    @static_group.add(@text)

