var videos = (function(){


	return {//funcion de inicio de la aplicación
		init : function(){
			$(".video-m-play-btn").unbind('click').click( function(){
				console.log($(this).attr('name'));
				modulos.load();	
			});	
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#header-title').html("VIDEOS");
			$('#videos').show();
			$('#leftpanel').panel( "close" );
		}
	};
})();
