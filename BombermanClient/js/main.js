"use strict";

var BM;

window.addEventListener("load", function(){		 			
	
	BM = getNewGameSpace();
	setupCurrentLevel(BM);
	
	Connect();
	
	kd.run(function () {
	  kd.tick();
	});

	kd.LEFT.down = function(){
		
		if (BM.hero.left) BM.hero.step_left = true;
				
		BM.hero.up = false;
		BM.hero.down = false;
		BM.hero.left = true;
		BM.hero.right = false;
	}
	
	kd.UP.down = function(){
		
		if (BM.hero.up) BM.hero.step_up = true;
					
		BM.hero.up = true;
		BM.hero.down = false;
		BM.hero.left = false;
		BM.hero.right = false;
		
	}
	
	kd.DOWN.down = function(){
		
		if (BM.hero.down) BM.hero.step_down = true;
				
		BM.hero.up = false;
		BM.hero.down = true;
		BM.hero.left = false;
		BM.hero.right = false;
		
	}
	
	kd.RIGHT.down = function(){
				
		if (BM.hero.right) BM.hero.step_right = true;
				
		BM.hero.up = false;
		BM.hero.down = false;
		BM.hero.left = false;
		BM.hero.right = true;
		
	}
	
	kd.SPACE.down = function(){
		BM.hero.place_bomb = true;
	}
	
	$(document).on("keydown",

		function(e){
			
			BM.hero.sprite++;
			BM.hero.sprite %= 3;
			
			// if (Transmit && Socket && Socket.readyState == 1)
			// if (Socket && Socket.readyState == 1)
			// {
				// if(e.which != 32)
				// {
					// Socket.send(JSON.stringify({ Type: "D", Data: _.omit(BM.hero, ['herotiles']) }));
				// }
			// }
		}
	);

	    // setInterval(gameloop, 30);	
});

function clear() {	
	BM.ctx.clearRect(0, 0, BM.ctx.canvas.width, BM.ctx.canvas.height); 
}


function setupMap() {
	
	var idx = 30, pos = 0, bomb;
	var row = Math.floor(idx / 8);
	var column = idx % 8 - 1;
	
	for (var j=0; j < 15; j++)
	{
		for (var i=0; i < 20; i++)
		{
			
			pos = i + j * 20;

			idx = BM.map[pos];
			
			//map into real tiles
			if (idx == 0) idx = 30;
			
			row = Math.floor(idx / 8);
			column = idx % 8 - 1;
		
			BM.ctx.drawImage(BM.tiles, column * 32 + column + 1, row * 32 + row + 1,  32, 32, i*32, j*32, 32, 32);

			if (bomb = BM.bombs[pos]){
				if (bomb.status == 1)
					BM.ctx.drawImage(BM.fx, 0, 0,  32, 32, i*32, j*32, 32, 32);
				else if (bomb.status == 2)
					BM.ctx.drawImage(BM.fx, 32 * 2, 0,  32, 32, i*32, j*32, 32, 32);
				else if (bomb.status == 0)
					delete bomb;
			}
		}
	}
	
}

function updateHeros()
{

	for (var i=0, max = BM.heros.length; i < max; i++)
	{
		var hero = BM.heros[i],
			hx = 0,
			hy = 0;

		var hx = 32 * ((hero.heroTileIndex % 4) - 1) * 3 + 32 * hero.sprite;
		if (hero.up)
		{
			hy = 32 * 3;
		}
		else if (hero.down)
		{
			hy = 0;
		}
		else if(hero.left)
		{
			hy = 32 * 1;
		}
		else if(hero.right)
		{
			hy = 32 * 2;
		}
		
		if (hero.heroTileIndex > 4) hy += 32 * 4;
		
		var row = Math.floor(hero.pos / 20);
		var column = hero.pos % 20 - 1;
		
		BM.ctx.drawImage(hero.herotiles, hx, hy, 32, 32, column * 32, row * 32, 32, 32)
	}

}

function gameloop(BM) {	
	
	clear();

	setupMap();
	
	runGameFrame(BM);
	
	updateHeros();
	
	if (Socket && Socket.readyState == 1)
	{
		Socket.send(JSON.stringify({ Type: "D", Data: _.omit(BM.hero, ['herotiles']) }));
	}
}
