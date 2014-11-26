"use strict";

var BM;

window.BOMB_START = 1;
window.BOMB_EXPLODE = 2;
window.FX_CATCH_FIRE = 3;

$(function(){		 			
	
	BM = getNewGameSpace();
	
	$('#canvas-wrapper').css({
		'width': BM.screenWidth + 'px',
		'height': BM.screenHeight + 'px'
		});
	
	var level = getLevel(BM.currentLevel);
	
	$('#canvas-wrapper').html(
		'<canvas id="game-canvas" width="' + level.mapWidth * level.mapTileSize + 'px" height="' + level.mapHeight * level.mapTileSize + 'px" style="position: relative; transition: left 1s, top 1s;"></canvas>'
	);
	$('#canvas-game').attr('width', level.mapTileSize * level.mapWidth);
	$('#canvas-game').attr('height', level.mapTileSize * level.mapHeight);
	
	setupCurrentLevel(BM);
	
	Connect();
	
	kd.run(function () {
	  kd.tick();
	});

	kd.LEFT.down = function(){

		checkScreenScroll(BM.hero, false, true);
	
		BM.hero.turn(PLAYER_LEFT);
		
		if (BM.hero.left) BM.hero.step_left = true;

	}
	
	kd.UP.down = function(){

		checkScreenScroll(BM.hero, false, false, true, false);
	
		BM.hero.turn(PLAYER_UP);
		
		if (BM.hero.up) BM.hero.step_up = true;
		
	}
	
	kd.DOWN.down = function(){
		
		checkScreenScroll(BM.hero, false, false, false, true);
		
		BM.hero.turn(PLAYER_DOWN);

		if (BM.hero.down) BM.hero.step_down = true;

	}
	
	kd.RIGHT.down = function(){

		checkScreenScroll(BM.hero, true, false);
	
		BM.hero.turn(PLAYER_RIGHT);
				
		if (BM.hero.right) BM.hero.step_right = true;

	}
	
	kd.SPACE.down = function(){
		BM.hero.place_bomb = true;
	}
	
	$(document).on("keydown",

		function(e){
			
			// BM.hero.step++;
			// BM.hero.step %= 3;

		}
	);
	
	$('#reset-button').click(function(){
		BM = resetGame(BM);
		$(this).trigger('blur');
		Connector.sendReset();
		return false;
	});

});

function clear() {	
	BM.ctx.clearRect(0, 0, BM.ctx.canvas.width, BM.ctx.canvas.height); 
}


function setupMap() {
	
	var idx = 30, pos = 0, bomb, fx;
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
				if (bomb.status == BOMB_START)
					BM.ctx.drawImage(BM.items, 0, 0,  32, 32, i*32, j*32, 32, 32);
				else if (bomb.status == BOMB_EXPLODE)
					BM.ctx.drawImage(BM.items, 32 * 2, 0,  32, 32, i*32, j*32, 32, 32);		
				else if (bomb.status == 0)
					delete BM.bombs[pos];
			}

			if (fx = BM.fx[pos]){
				if (fx.status == 3){

					if (fx.direction == 0  || fx.direction == 3 )
						BM.ctx.drawImage(BM.items, (32 * 3), 0,  32, 32, i*32, j*32, 32, 32);		
					else 
						BM.ctx.drawImage(BM.items, (32 * 4), 0,  32, 32, i*32, j*32, 32, 32);	

					// BM.ctx.drawImage(BM.items, (32 * (3 + (fx.direction % 2))), 0,  32, 32, i*32, j*32, 32, 32);		
				}
				else if (fx.status == 0)
					delete BM.fx[pos];
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

		var hx = 32 * ((hero.heroTileIndex % 4) - 1) * 3 + 32 * hero.step;
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
		
		// var row = Math.floor(hero.pos / 20);
		// var column = hero.pos % 20 - 1;
		
		hero.moveTo();

		var row = hero.point.y;
		var column = hero.point.x;

		//lifebar
		if (hero.hp > 0) {
			BM.ctx.beginPath();
			BM.ctx.moveTo(column * 32, row * 32 - 5);
			BM.ctx.lineTo(column * 32 + hero.hp * 10, row * 32 - 5);
			BM.ctx.lineWidth = 4;
			
			if (hero.hp == 3){
				BM.ctx.strokeStyle = 'green';
			} else if (hero.hp == 2) {
				BM.ctx.strokeStyle = 'yellow';
			} else if (hero.hp == 1) {
				BM.ctx.strokeStyle = 'red';
			}
			
			BM.ctx.stroke();

			BM.ctx.drawImage(hero.herotiles, hx, hy, 32, 32, column * 32, row * 32, 32, 32);
		}
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

function getLevel(level){
	
	return _.find(BM.levels, function(item){
		return item.level == level
	});
	
}

function checkScreenScroll(hero, right, left, up, down){
	
	var level = getLevel(BM.currentLevel);
	var deltaX = 0,
		deltaY = 0,
		step = 3;
	
	if (!level) return;
	
	//horizontal
	var heroPosX = ((hero.pos - 1) % level.mapWidth) * level.mapTileSize
	var heroPosY = Math.ceil((hero.pos - 1) / level.mapWidth) * level.mapTileSize;
	
	if (right)
	{
		deltaX = BM.screenWidth - (heroPosX + BM.screenOffset.x);
	}
	else if(left)
	{
		deltaX = (heroPosX + BM.screenOffset.x)
	}
	else if(up)
	{
		deltaY = (heroPosY + BM.screenOffset.y)
	}
	else if(down)
	{
		deltaY = BM.screenHeight - (heroPosY + BM.screenOffset.y)
	}
	
	
	if (right)
	{
		if (deltaX <= step * level.mapTileSize)
		{
			BM.screenOffset.x -= step * level.mapTileSize;
		}
	}
	else if(left)
	{
		if (deltaX <= step * level.mapTileSize)
		{
			BM.screenOffset.x += step * level.mapTileSize;
		}
	}
	else if(up)
	{
		if (deltaY <= step * level.mapTileSize)
		{
			BM.screenOffset.y += step * level.mapTileSize;
		}
	}
	else if (down)
	{
		if (deltaY <= step * level.mapTileSize)
		{
			BM.screenOffset.y -= step * level.mapTileSize;
		}
	}
	
	
	if (BM.screenOffset.x > 0) BM.screenOffset.x = 0;
	if (BM.screenOffset.x < (BM.screenWidth - level.mapTileSize * level.mapWidth)) BM.screenOffset.x = BM.screenWidth - level.mapTileSize * level.mapWidth;
	
	if (BM.screenOffset.y > 0) BM.screenOffset.y = 0;
	if (BM.screenOffset.y < (BM.screenHeight - level.mapTileSize * level.mapHeight)) BM.screenOffset.y = BM.screenHeight - level.mapTileSize * level.mapHeight;
	
	$('#game-canvas').css('left', BM.screenOffset.x + 'px');
	$('#game-canvas').css('top', BM.screenOffset.y + 'px');
	
	
}
