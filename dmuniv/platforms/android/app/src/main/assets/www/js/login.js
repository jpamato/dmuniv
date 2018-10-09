var login = (function(){

	var user_id;
	var url;


	function doLogin(uid){
		user_id=uid;
		console.log(user_id);
		localStorage.setItem("user_id", user_id);
		videos.load();		

		$.post(url+"saveNewLogin.php",{usuario_id: user_id}, function(data, status){
        			console.log("Data: " + data + "\nStatus: " + status);
		});

		/*let requestURL = url + "saveNewLogin.php?usuario_id=" + user_id;
		$.get(requestURL, function(data, status){
			if(data==0)
						loginError();
					else
						doLogin(data);
    		});*/
	}

	function loginError(){
		$("#login-form #user").val("");
		$("#login-form #pass").val("");
	}

	return {//funcion de inicio de la aplicación
		init : function(url_){
			url = url_;
			$( "#login-form" ).submit(function( event ) {

				let requestURL = url+ "loginUser.php?email=" + $("#login-form #user").val() + "&clave=" + $("#login-form #pass").val();

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
		},

		getUserId : function(){
			return user_id;
		}
	};
})();

