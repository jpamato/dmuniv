var login = (function(){


	return {//funcion de inicio de la aplicación
		init : function(){
			$( "#login-form" ).submit(function( event ) {		
				videos.load();
				event.preventDefault();
				event.stopImmediatePropagation();
			});		
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#header-title').html("LOG IN");
			$('#login').show();
			$('#leftpanel').panel( "close" );
		}
	};
})();

