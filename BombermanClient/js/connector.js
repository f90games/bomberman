"use strict"


var Connector = {}
var Socket = null;

Connector.sendB = function(b){
	
	if (Socket && Socket.readyState == 1) 
	{
		Socket.send(JSON.stringify({ Type: "B", Data: _.omit(b, ['map']) }));
	}
	
}

Connector.sendReset = function(){
	if (Socket && Socket.readyState == 1) 
	{
		Socket.send(JSON.stringify({ Type: "RESET", Data: {level: BM.level} }));
	}
	
}

function Connect(){


		var name = 'Guest';

		try
		{
			if (typeof MozWebSocket !== "undefined")
				Socket = new MozWebSocket("ws://82.146.47.155:9001" + (location.hash ? ('?room=' + location.hash.slice(1)) : ''));
			else if (typeof WebSocket !== "undefined")
				Socket = new WebSocket("ws://82.146.47.155:9001" + (location.hash ? ('?room=' + location.hash.slice(1)) : ''));
			else
			{
				Socket = null;
				alert("Your browser does not support websockets. We recommend that you use an up-to-date version of Google Chrome or Mozilla Firefox.");
				return false;
			}
		}

		catch (e) { 
			Socket = null;
		}


		Socket.onerror = function(e) { 
		

			if (!BM.Timer)
			{
				BM.Timer = setInterval(function(){
							gameloop(BM)
						},
						BM.GameFrameTime);
				BM.connectionError = true;
			}
		
		};


		Socket.onclose = function (e)
			{
				if (BM.connectionError) return;
				// Shut down the game loop.
				if (BM.Timer) clearInterval(BM.Timer);
				BM.Timer = null;
			};

		Socket.onopen = function()
			{
			
				// Send a handshake message.
				Socket.send(JSON.stringify({ Type: "HI", Data: name.substring(0, 10) }));
				
				// Set up game loop.
				BM.Timer = setInterval(function(){
						gameloop(BM)
					},
					BM.GameFrameTime);
					
				$('#menu').css('display', 'block');
				$('.online').show();
			};

		Socket.onmessage = function(e)
			{

				var msg;
				
				try { msg = JSON.parse(e.data); }
				catch (err) { return; }

				if(msg.type == 'newRoom')
				{
					$('#info').val(location.protocol + '//' + location.host + location.pathname + '#' + msg.room).select();
					$('#room-number').html(msg.room);
					return;
				}
				
				if(msg.type == 'newHero')
				{
					
					var hero = new Hero(_.extend(msg.hero, {level: BM.level}));

					hero.herotiles = new Image();
					hero.herotiles.src = BM.hero.herotiles.src;
					hero.heroTileIndex = BM.hero.heroTileIndex;
					
					BM.heros.push(hero);
					
					return;
				}
				
				if(msg.type == 'reset')
				{
					BM = resetGame(BM);
					return;
				}
				
				if(msg.type == 'newB')
				{
					var b = new Bomb(msg.b, BM.map);
					b.start();
					BM.bombs[b.pos-1] = b;
					return;
				}
				
				if (msg.data && msg.data.pos) {
					if (!BM.heros[1]) return;
					_.extend(BM.heros[1], msg.data);
				}

			};
};