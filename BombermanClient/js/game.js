"use strict"

function resetGame(BM, level)
{

	if (_.isUndefined(level)) 
	{
		level = BM.currentLevel;
	}
	
	if (!getLevel(level)) return BM;

	BM.sounds['theme'] && BM.sounds['theme'].stop();

	clearInterval(BM.Timer);
	BM.Timer = null;
	BM = getNewGameSpace(level);
	
	updateCanvasHtml(BM.currentLevel)
	BM = setupCurrentLevel(BM)
	
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


function getNewGameSpace(level){
	
	var BM = new Object();
	
	level = level || 0;
	
	BM = {
		
		screenWidth: 800,
		screenHeight: 500,
		screenOffset: {
			x: 0,
			y: 0
		},
		
		currentLevel: level,
		GameFrameTime: 50,
		bombs: {

		},
		//effects
		fx: {

		},
		hero: {},
		heros: [],

		sounds: [],
		music: true,
		level: null
	};

	BM.levels = 
	[
		{
			"level" : 0,
			"maptiles" : "tmw_desert_spacing.png",
			"screenWidth": 672,
			"screenHeight": 480,
			
			"mapTileSize": 32,
			"mapWidth": 21,
			"mapHeight": 15,
			"heroSpown" : 23,
			
			"herotiles": "vx_chara00.png",
			"bombtiles": "bomb.png",
			"heroTileIndex": 1, //hero idx 1..8  
      "map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 38, 38, 38, 38, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 38, 0, 38, 0, 0, 0, 0, 0, 10, 10, 0, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 38, 0, 38, 0, 0, 0, 10, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 38, 0, 0, 38, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 38, 10, 0, 10, 38, 10, 38, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			"fixed_terrian_sprite" : [10],
			"destroy_terrian_sprite" : [38, 39]						  
		},

		{
			"level" : 1,
			"maptiles" : "tmw_desert_spacing.png",

			"screenWidth": 800,
			"screenHeight": 500,
			
			"mapTileSize": 32,
			"mapWidth": 45,
			"mapHeight": 15,
			"heroSpown" : 47,

			"herotiles": "vx_chara00.png",
			"bombtiles": "bomb.png",
			"heroTileIndex": 1, //hero idx 1..8  
			"map":[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 38, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 46, 0, 0, 38, 0, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 38, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 32, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 38, 0, 0, 0, 32, 47, 47, 47, 47, 47, 32, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 38, 0, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 47, 10, 47, 10, 47, 10, 47, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 38, 0, 0, 0, 38, 0, 0, 0, 32, 32, 0, 0, 0, 32, 32, 0, 0, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 38, 38, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 32, 47, 47, 47, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 38, 38, 0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 40, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 38, 0, 38, 0, 0, 0, 38, 0, 0, 0, 0, 0, 47, 0, 47, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40, 40, 40, 40, 0, 31, 0, 31, 0, 31, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 32, 10, 32, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 32, 0, 32, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			"fixed_terrian_sprite" : [10],
			"destroy_terrian_sprite" : [32, 38, 46, 40, 47, 31]						  
		},


	];
	
	return BM;
	
}

function addNewHero(BM){
	
	var hero = new Hero({
		pos: BM.level.heroSpown,
		posTarget: BM.level.heroSpown,
		sprite: 0,
		skin: 0,
		hp: 3,
		level: BM.level
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
	
	if (!level) return BM;

  if (BM.music){
	  
	  if (BM.sounds['theme']){ 
	    BM.sounds['theme'].play();  
	  } else {
    BM.sounds['theme'] = new Howl({
      volume: 0.2,
      loop: true,
      urls: ['/data/sound/theme.mp3']
    }).play();          
	  } 
	  // BM.music = true;
  }	
	
	BM.hero = new Hero({
		pos: level.heroSpown,
		posTarget: level.heroSpown,
		sprite: 0,
		skin: 0,
		hp: 3,
		level: level
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

	BM.level = level;

	Bomb.EXPLODE_MATRIX_3x3 = [-BM.level.mapWidth, -1, 1, BM.level.mapWidth];

	var heroTileIndex = level.heroTileIndex;
	
	BM.heros.push(BM.hero); 

	return BM;

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
				if (checkHeroPos(BM, hero.pos - BM.level.mapWidth))
				{
					hero.posTarget -= BM.level.mapWidth;
				}
			}
			else if (hero.step_down)
			{
				
				if (checkHeroPos(BM, hero.pos + BM.level.mapWidth))
				{
					hero.posTarget += BM.level.mapWidth;
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
				status: BOMB_START,
				level: BM.level
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

function getLevel(level){
	
	return _.find(BM.levels, function(item){
		return item.level == level
	});
	
}

if (typeof exports !== "undefined")
{
	exports.RunGameFrame = runGameFrame;
	exports.setupCurrentLevel = setupCurrentLevel;
	exports.getNewGameSpace = getNewGameSpace;
	exports.addNewHero = addNewHero;
	exports.resetGame = resetGame;
}

