"use strict";

var BM = {
	currentLevel: 0
};

BM.levels = 
[
	{
		"level" : 0,
		"maptiles" : "tmw_desert_spacing.png",
		"herotiles": "vx_chara00.png",
		"heroTileIndex": 3, //hero idx 1..8  
		"map" : [87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 87, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 87, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 87, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 87, 87, 0, 87, 0, 87, 87, 87, 0, 87, 0, 87, 0, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 87, 87, 0, 87, 87, 87, 0, 87, 87, 87, 0, 87, 0, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 87, 0, 87, 0, 87, 0, 0, 87, 87, 0, 87, 87, 87, 87, 87, 0, 87, 87, 87, 0, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 87, 0, 0, 87, 0, 87, 87, 0, 87, 0, 87, 0, 87, 0, 87, 87, 87, 87, 87, 0, 87, 0, 87, 87, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87]
					  
	}
];

function setupCurrentLevel() {

	var level = _(BM.levels).find(function(item){
		return item.level === BM.currentLevel
	});
	
	if (!level) return;
	
	var canvas = document.getElementById("game-canvas");  
	BM.ctx = canvas.getContext("2d"); 

	BM.tiles = new Image();
	BM.tiles.onload = function(){

	};
	
	BM.tiles.src = "img/sprites/" + level.maptiles;
	BM.map = level.map;
	
	BM.herotiles = new Image();
	BM.herotiles.src = "img/sprites/" + level.herotiles;
	BM.heroTileIndex = level.heroTileIndex;

	BM.hero = {
		pos: 28,
		sprite: 0,
		up: false,
		down: true,
		left: false,
		right: false
	};
}


window.addEventListener("load", function(){		 			
	
	setupCurrentLevel();	
	
		document.addEventListener("keydown",
			function(e){
				if (e.which == 38) { //up
					
					if (BM.hero.up) BM.hero.step_up = true;
					
					BM.hero.up = true;
					BM.hero.down = false;
					BM.hero.left = false;
					BM.hero.right = false;
					
					
					
				}
				else if (e.which == 37) { //left
				
					if (BM.hero.left) BM.hero.step_left = true;
				
					BM.hero.up = false;
					BM.hero.down = false;
					BM.hero.left = true;
					BM.hero.right = false;
					
					
					
				}
				else if (e.which == 39) { //right
				
					if (BM.hero.right) BM.hero.step_right = true;
				
					BM.hero.up = false;
					BM.hero.down = false;
					BM.hero.left = false;
					BM.hero.right = true;
					
					
					
				}
				else if (e.which == 40) { //down
					
					if (BM.hero.down) BM.hero.step_down = true;
				
					BM.hero.up = false;
					BM.hero.down = true;
					BM.hero.left = false;
					BM.hero.right = false;
					
				}
				
				BM.hero.sprite++;
				BM.hero.sprite %= 3;
			}
		);

	    setInterval(gameloop, 30);	
});

function clear() {	
	BM.ctx.clearRect(0, 0, BM.ctx.canvas.width, BM.ctx.canvas.height); 
}


function setupMap() {
	
	var idx = 30;
	var row = Math.floor(idx / 8);
	var column = idx % 8 - 1;
	
	for (var j=0; j < 15; j++)
	{
		for (var i=0; i < 20; i++)
		{
			
			idx = BM.map[i + j * 20];
			
			//map into real tiles
			if (idx == 0) idx = 30;
			if (idx == 87) idx = 10;
			
			row = Math.floor(idx / 8);
			column = idx % 8 - 1;
		
			BM.ctx.drawImage(BM.tiles, column * 32 + column + 1, row * 32 + row + 1,  32, 32, i*32, j*32, 32, 32);
		}
	}
	
}

function updateHeros()
{

	var hero = BM.hero,
		hx = 0,
		hy = 0;

	var hx = 32 * ((BM.heroTileIndex % 4) - 1) * 3 + 32 * hero.sprite;
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
	
	if (BM.heroTileIndex > 4) hy += 32 * 4;
	
	var row = Math.floor(hero.pos / 20);
	var column = hero.pos % 20 - 1;
	
	BM.ctx.drawImage(BM.herotiles, hx, hy, 32, 32, column * 32, row * 32, 32, 32)

}

function gameloop() {	
	
	clear();

	setupMap();
	
	runGameFrame();
	
	updateHeros();
}
