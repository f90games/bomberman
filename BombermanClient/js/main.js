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

  VK.api("users.get", {fields: "photo_50, first_name"}, function(data) { 
      console.log(data);
      BM.game.getState().player_name = data.response[0].first_name;
      BM.game.getState().player_photo = data.response[0].photo_50;
      BM.game.getState().player_uid = data.response[0].uid;
  });

  VK.api("friends.get", {fields: "photo_50, first_name"}, function(data) { 
      for (var i = 0; i < data.response.length; i++) {
          console.log(data.response[i]);
          // VK.api('users.isAppUser', {user_id: data.response[i].uid}, function(d){
          //     console.log(d);
          // })
      };
  });

	$('.select-level').click(function(){
		BM = resetGame(BM, $(this).data('level') - 1);
		Connector.sendReset();
	});

});