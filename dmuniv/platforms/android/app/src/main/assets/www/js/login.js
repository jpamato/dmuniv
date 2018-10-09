var login = (function(){

	var user_id;

	function doLogin(uid){
		user_id=uid;

		videos.load();
	}

	function loginError(){

	}

	return {//funcion de inicio de la aplicación
		init : function(url){
			$( "#login-form" ).submit(function( event ) {

				let requestURL = url + "?email=" + $("#login-form #user").val() + "&clave=" + $("#login-form #pass").val();

				$.get(requestURL, function(data, status){
					if(data==0)
						loginError();
					else
						doLogin(data);
    				});

				
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

