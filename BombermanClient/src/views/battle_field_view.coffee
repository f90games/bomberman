class BattleFieldView extends View
  init_view: () ->
    @status_panel = new Kinetic.Group()
    @layer.add(@status_panel)
    # @init_bg()

  new_symbol: (parent, type, tx, ty) ->
    image = document.getElementById('tiles_image')
    animations = switch type
      when 'enemy'
        [{x: 320, y: 340, width: 20, height: 20}]
      when 'user'
        [{x: 340, y: 340, width: 20, height: 20}]
      when 'stage'
        [{x: 280, y: 340, width: 40, height: 40}]
    symbol = new Kinetic.Sprite({
      x         : tx,
      y         : ty,
      image     : image,
      animation : 'static',
      animations: {
        'static': animations
      },
      frameRate : 1,
      index     : 0
    })
    parent.add(symbol)
    symbol.start()
    symbol

  init_bg: () ->
    @status_panel.add(new Kinetic.Rect({
      x     : 0,
      y     : 0,
      fill  : "#999",
      width : 640,
      height: 480
    }))