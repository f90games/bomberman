$ ->
  game                      = new Game()
  # for debug
  window.game               = game
  window.welcome_scene      = game.scenes['welcome']
  window.battle_field_scene = game.scenes['battle_field']
  game.kick_off()
