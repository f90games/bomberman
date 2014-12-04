"use strict";

window.PLAY_SCENE = 1;
window.START_SCENE = 2;
window.MENU_SCENE = 3;
window.SELECT_ROOM_SCENE = 4;
window.YOU_LOST_SCENE = 5;
window.SHOP_SCENE = 6;

$(function(){

	BM.init();
	
	$(document).on("keydown",
		function(e){
			BM.game.updateState();
		}
	);
	
	$('#reset-button').click(function(){
		BM.game.resetGame();
		$(this).trigger('blur');
		BM.connector.sendReset();
		return false;
	});

	$('#music-toggle').click(function(){
		if(BM.music) 
			BM.sounds['theme'].pause();
		else 
			BM.sounds['theme'].play();
		BM.music = !BM.music;	

	});

	$('.select-level').click(function(){
		BM = resetGame(BM, $(this).data('level') - 1);
		Connector.sendReset();
	});

});