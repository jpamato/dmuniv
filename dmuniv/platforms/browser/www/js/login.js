var login = (function(){


	return {//funcion de inicio de la aplicaci�n
		init : function(){
			
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#login').show();
			$('#leftpanel').panel( "close" );
		}
	};
})();

