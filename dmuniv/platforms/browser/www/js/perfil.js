var perfil = (function(){


	return {//funcion de inicio de la aplicaci�n
		init : function(){
			
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("grey");
			$('.contenidos').hide();
			$('#perfil').show();
			$('#header-title').html("PERFIL DE USUARIO");
			$('#leftpanel').panel( "close" );
		}
	};
})();


