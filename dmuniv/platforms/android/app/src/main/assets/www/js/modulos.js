var modulos = (function(){


	return {//funcion de inicio de la aplicación
		init : function(){
			
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("white");
			$('.contenidos').hide();
			$('#modulos').show();
			$('#leftpanel').panel( "close" );
		}
	};
})();
