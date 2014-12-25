class BM.Observer 

	constructor: ->
	
		@subscribers =
			any: []
			
	on: (type, fn)->
		type = type || 'any'
		@subscribers[type] = [] if (typeof @subscribers[type] is "undefined") 
		@subscribers[type].push(fn)

	off: (type, fn)->
		@visitSubscribers('unsubscribe', fn, type)
	
	trigger: (type, publication)->
		args = Array.prototype.slice.call(arguments, 1)
		@__visitSubscribers('publish', args, type)

	__visitSubscribers: (action, arg, type)->
		pubtype = type || 'any'
		subscribers = @subscribers[pubtype]
		max = if subscribers then subscribers.length else 0
		
		for i in [0...max] 
	
			if action is 'publish'
				subscribers[i].apply(null, arg)
			else if subscribers[i] is arg
				subscribers.splice(i, 1)
			

class BM.Connector extends BM.Observer

	constructor: (options)->
		
		super()
		
		options = options || {}
		
		@server = options.server || "ws://82.146.47.155:9001"
		
		@connect()
		
	connect: ->
		
		try
  
			if typeof MozWebSocket != "undefined"
				@socket = new MozWebSocket @server + if location.hash then '?room=' + location.hash.slice(1) else  ''
			else if typeof WebSocket != "undefined"
				@socket = new WebSocket @server + if location.hash then '?room=' + location.hash.slice(1) else ''
			else
				alert "Your browser does not support websockets. We recommend that you use an up-to-date version of Google Chrome or Mozilla Firefox."
		catch e
			alert(e.message)
			return
			
		@bindHandlers() if @socket
		
	bindHandlers: ->
	
		@socket.onerror = _.bind @onError, @
		@socket.onopen = _.bind @onOpen, @
		@socket.onclose = _.bind @onClose, @
		@socket.onmessage = _.bind @onMessage, @
		
	onError: (err)->
		console.log err
		
	onOpen: (p)->
		@trigger 'connected'
		
	onClose: (p)->
		@trigger 'closed'
		
	onMessage: (params)->
		
		message = JSON.parse params.data
		@trigger message.type, message.data
		
