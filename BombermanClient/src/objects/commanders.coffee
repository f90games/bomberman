class Commander
  constructor: (@map_unit) ->
    @direction = @map_unit.direction
    @commands  = []

  direction_action_map: {
    up   : Direction.UP,
    down : Direction.DOWN,
    left : Direction.LEFT,
    right: Direction.RIGHT
  }

  # calculate next commands
  next: () ->

  next_commands: ->
    @commands = []
    @next()
    _.uniq(@commands, (command) ->
      return command['params']['direction'] if command['type'] == "direction"
      command['type']
    )

  direction_changed: (action) ->
    new_direction = @direction_action_map[action]
    @map_unit.direction != new_direction

  turn: (action) ->
    new_direction = @direction_action_map[action]
    @commands.push(@_direction_command(new_direction))

  start_move: (offset = null) ->
    @commands.push(@_start_move_command(offset))

  stop_move: () ->
    @commands.push(@_stop_move_command())

  fire: () ->
    @commands.push(@_fire_command())

  # private methods
  _direction_command: (direction) ->
    {
      type: "direction",
      params: { direction: direction }
    }

  _start_move_command: (offset = null) ->
    {
      type: "start_move",
      params: { offset: offset }
    }

  _stop_move_command: -> { type: "stop_move" }

  _fire_command: -> { type: "fire" }

class UserCommander extends Commander
  constructor: (@map_unit) ->
    super(@map_unit)
    @reset()

  reset: () ->
    @reset_on_going_commands()
    @reset_command_queue()

  reset_on_going_commands: () ->
    @command_on_going = {
      up   : false,
      down : false,
      left : false,
      right: false,
      fire : false
    }

  reset_command_queue: () ->
    @command_queue = {
      up   : [],
      down : [],
      left : [],
      right: [],
      fire : []
    }

  is_on_going: (command) ->
    @command_on_going[command]

  set_on_going: (command, bool) ->
    @command_on_going[command] = bool

  next: ->
    @handle_finished_commands()
    @handle_on_going_commands()

  handle_finished_commands: () ->
    for command, sequences of @command_queue
      continue if _.isEmpty(sequences)
      switch (command)
        when "fire"
          @fire()
        when "up", "down", "left", "right"
          if @direction_changed(command)
            @turn(command)
            break
          has_start_command = _.contains(sequences, "start")
          has_end_command   = _.contains(sequences, "end")
          @start_move() if has_start_command
          @stop_move()  if !has_start_command && has_end_command
    @reset_command_queue()

  handle_on_going_commands: () ->
    for command in ["up", "down", "left", "right"]
      if @is_on_going(command)
        @turn(command)
        @start_move()
    if @is_on_going("fire")
      @fire()

  on_command_start: (command) ->
    @set_on_going(command, true)
    @command_queue[command].push("start")

  on_command_end: (command) ->
    @set_on_going(command, false)
    @command_queue[command].push("end")