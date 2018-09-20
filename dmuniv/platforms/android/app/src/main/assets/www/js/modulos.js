var modulos = (function(){

	var videoDone = true;

	var player;

	function LoadVideo() {
		player = new YT.Player('player', {
			width: screen.width,
			height: screen.width * 390 / 640,
			playerVars: {
				'autoplay': 1,
				'controls': 0, 
				'autohide': 1,
				'showinfo' : 0, 
				'rel': 0,
				'loop': 0
			},
			videoId: '0Bmhjf0rKe8',
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		});
	}

	// autoplay video
	function onPlayerReady(event) {
		event.target.playVideo();
	}

	// when video ends
	function onPlayerStateChange(event) {        
		if(event.data === 0) {          
			videoDone=true;
			ShowModule();
		}
	}

	function ShowModule(){
		$(".module-cont").hide();
		if(videoDone){
			$("#preguntas").show();
			$('#header-title').html("M1 | PREGUNTA 1");
		}else{
			$("#videoplayer").show();
			$('#header-title').html("M&Oacute;DULO 1");
			LoadVideo();
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(){

			$('input[type=radio][name=moduleAns]').change(function() {
				if ($(this).val() == '0') {
					$(this).parents('span').css("background","chartreuse");
				}else{
					$(this).parents('span').css("background","red");
					$('input[type=radio][name=moduleAns]').each(function(){
    						if($(this).val()==0){
							$(this).parents('span').css("background","aquamarine");
						}
					});
				}
				$("#respuestas").css("pointer-events","none");
				setTimeout(function(){
					$("#respuestas").css("pointer-events","auto");
					$('#preguntas').hide();
					$('#fotos').show();
					$('input[type=radio][name=moduleAns]').each(function(){
    						$(this).parents('span').css("background","white");
						$(this).prop( "checked", false );
					});
				},3000);
			});

			$(".moduleImg").unbind('click').click( function(){	
				if ($(this).val() == '0') {
					$(this).css("background","chartreuse");
				}else{
					$(this).css("background","red");
					$(".moduleImg").each(function(){
    						if($(this).val()==0){
							$(this).css("background","aquamarine");
						}
					});
				}
				$(".moduleImg").css("pointer-events","none");
				setTimeout(function(){
					$(".moduleImg").css("pointer-events","auto");					
					$('#fotos').hide();
					$('#preguntas').show();
					$(".moduleImg").each(function(){
						$(this).css("background","transparent");
					});
				},3000);
			});

		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("white");
			$('.contenidos').hide();

			$('#modulos').show();
			$('#leftpanel').panel( "close" );
			ShowModule();
		}
	};
})();
