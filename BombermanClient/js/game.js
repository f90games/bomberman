"use strict"


function resetGame(BM)
{

	clearInterval(BM.Timer);
	BM.Timer = null;
	BM = getNewGameSpace();
	setupCurrentLevel(BM)
	
	if (typeof exports === "undefined")
	{
		BM.Timer = setInterval(function(){
				gameloop(BM)
			},
			BM.GameFrameTime
		);
	}
	
	return BM;
}


function getNewGameSpace(){
	
	var BM = new Object();
	
	BM = {
		currentLevel: 0,
		GameFrameTime: 50,
		bombs: {

		},
		//effects
		fx: {

		},
		hero: {},
		heros: []
	};

	BM.levels = 
	[
		{
			"level" : 0,
			"maptiles" : "tmw_desert_spacing.png",
			"herotiles": "vx_chara00.png",
			"bombtiles": "bomb.png",
			"heroTileIndex": 1, //hero idx 1..8  
			"map" : [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 38, 38, 38, 38, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 10, 10, 0, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 38, 0, 38, 0, 0, 10, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 38, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			"fixed_terrian_sprite" : [10],
			"destroy_terrian_sprite" : [38, 39]						  
		}
	];
	
	return BM;
	
}

function addNewHero(BM){
	
	var hero = new Hero({
		pos: 30,
		sprite: 0,
		skin: 0,
		hp: 3
	});
	
	BM.heros.push(hero);
	
	return hero;
	
}

function setupCurrentLevel(BM) {
	
	var level = null;
	for (var i=0, max = BM.levels.length; i < max; i++)
	{
		if(BM.levels[i].level === BM.currentLevel)
		{
			level = BM.levels[i];
			break;
		}
	}
	
	if (!level) return;
	
	BM.hero = new Hero({
		pos: 30,
		sprite: 0,
		skin: 0,
		hp: 3
	});
	
	var herotiles = null;
	if (typeof exports == "undefined")
	{
		var canvas = document.getElementById("game-canvas");  
		BM.ctx = canvas.getContext("2d"); 

		BM.tiles = new Image();
		BM.tiles.src = "img/sprites/" + level.maptiles;

		BM.items = new Image();
		BM.items.src = "img/sprites/" + level.bombtiles;
		
		BM.hero.herotiles = new Image();
		BM.hero.herotiles.src = "img/sprites/" + level.herotiles;
		
		BM.hero.heroTileIndex = level.heroTileIndex
	
	}

	BM.map = level.map;
	
	var heroTileIndex = level.heroTileIndex;
	
	BM.heros.push(BM.hero);

}

function checkHeroPos(BM, newPos){
	return BM.map[newPos - 1] === 0
}

function checkBombPos(BM, pos){
	//добавляем крутых взрывов
	if(BM.bombs[pos])
		BM.bombs[pos].power++;

	return BM.bombs[pos] == null
}

function runGameFrame(BM){
	
	var hero = BM.hero;

	if (hero.hp > 0){

		// if((hero.point.x == hero.pointTarget.x) && (hero.point.y == hero.pointTarget.y)){
		if((hero.posTarget == hero.pos)){			

			if(hero.step_up)
			{
				if (checkHeroPos(BM, hero.pos - 20))
				{
					hero.posTarget -= 20;
				}
			}
			else if (hero.step_down)
			{
				
				if (checkHeroPos(BM, hero.pos + 20))
				{
					hero.posTarget += 20;
				}
			}
			else if (hero.step_left)
			{
				if (checkHeroPos(BM, hero.pos - 1))
				{
					hero.posTarget--;
				}
			}
			else if (hero.step_right)
			{
				if (checkHeroPos(BM, hero.pos + 1))
				{
					hero.posTarget++;
				}
			}

			hero.updatePointTarget();

		}	 

		// if ((hero.newpos != hero.pos) && (herp.path.length > 1)) {
			
		// }		
		
		if (hero.place_bomb) {
			var bomb_idx = new Date().getTime();

			var bomb = new Bomb({
				power: 2,
				pos: hero.pos,
				timeLeft: 3000,
				status: BOMB_START
			}, BM.map);

			bomb.start();
			
			if (checkBombPos(BM, hero.pos-1))
			{
				BM.bombs[hero.pos-1] = bomb;
				Connector && Connector.sendB(bomb)
			}

		}

	}
	
	// hero.place_bomb = hero.step_left = hero.step_right = hero.step_up = hero.step_down = false;

	hero.place_bomb = false;
	
}

if (typeof exports !== "undefined")
{
	exports.RunGameFrame = runGameFrame;
	exports.setupCurrentLevel = setupCurrentLevel;
	exports.getNewGameSpace = getNewGameSpace;
	exports.addNewHero = addNewHero;
	exports.resetGame = resetGame;
}

