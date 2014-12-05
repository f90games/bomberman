"use strict";

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