var Socket = null;
function Connect(){

		var Name = prompt("What is your username?", "Guest");

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
		catch (E) { 
			Socket = null;
		}

		Socket.onerror = function(E) { 
		
			// alert("WebSocket error: " + JSON.stringify(E)); 
			if (!BM.Timer)
			{
				setInterval(function(){
							gameloop(BM)
						},
						BM.GameFrameTime);
			}
		
		};

		Socket.onclose = function (E)
			{
				// Shut down the game loop.
				if (BM.Timer) clearInterval(BM.Timer);
				BM.Timer = null;
			};

		Socket.onopen = function()
			{
			
				// Send a handshake message.
				Socket.send(JSON.stringify({ Type: "HI", Data: Name.substring(0, 10) }));
				
				// Set up game loop.
				BM.Timer = setInterval(function(){
						gameloop(BM)
					},
					BM.GameFrameTime);
			};

		Socket.onmessage = function(E)
			{
				var Message;
				
				try { Message = JSON.parse(E.data); }
				catch (Err) { return; }
				
				if(Message.type == 'newRoom')
				{
					$('#info').text(location.protocol + '//' + location.host + location.pathname + '#' + Message.room);
					return;
				}
				
				if(Message.type == 'newHero')
				{
					var hero = Message.hero;

					hero.herotiles = new Image();
					hero.herotiles.src = BM.hero.herotiles.src;
					hero.heroTileIndex = BM.hero.heroTileIndex;
					
					BM.heros.push(hero);
					
					return;
				}
				
				if (Message.data && Message.data.pos) {
					_.extend(BM.heros[1], Message.data);
				}

			};
};