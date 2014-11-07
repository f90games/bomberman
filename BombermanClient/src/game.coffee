class Game
  constructor: () ->
    @canvas   = new Kinetic.Stage({container: 'game-canvas', width: 600, height: 520})
    @configs  = @init_default_config()
    @statuses = @init_statuses()
    @scenes   = {
      'welcome'     : new WelcomeScene(this, new WelcomeView(@canvas)),
      'battle_field': new BattleFieldScene(this, new BattleFieldView(@canvas))
    }
    @current_scene = null

  get_config: (key) -> @configs[key]

  update_status: (key, value) -> @statuses[key] = value

  get_status: (key) -> @statuses[key]

  init_default_config: () ->
    {

    }

  init_statuses: () ->
    {
      
    }

  mod_stage: (current_stage, adjustment) ->

  reset: () ->

  switch_scene: (type) ->

  kick_off: ()  -> @switch_scene('welcome')

