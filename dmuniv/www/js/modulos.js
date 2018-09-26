var modulos = (function(){

	var videoDone = true;
	var player;

	var module;
	var moduleData;

	var questIndex;

	var respuestasTxt;
	var respuestasImg;

	function LoadVideo(vId) {
		player = new YT.Player('player', {
			width: screen.width,
			height: screen.width * 390 / 640,
			playerVars: {
				'autoplay': 1,
				'controls': 1, 
				'autohide': 1,
				'showinfo' : 0, 
				'rel': 0,
				'loop': 0
			},
			videoId: vId,
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

	function setTextOptions(){
		respuestasTxt = [];
		for(let i=0;i<3;i++){
			let r = {
				text:moduleData[questIndex]["respuesta"+(i+1)],
				val:i==0
			}
			console.log(r);
			respuestasTxt.push(r);
		}
		shuffle(respuestasTxt);

		var html="";
		letter = ["a","b","c"];
		for(let i=0;i<3;i++){
			html+="<span><div class='ui-radio'><input type='radio' name='moduleAns' value='"+i+"'></div> "+letter[i]+") "+respuestasTxt[i]["text"]+"</span><br>";

			$("#respuestas-cont").html(html);
		}

		$("#preguntas").show();
		console.log(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		$("#pregunta").text(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		SetRadioButtons();
	}

	function SetRadioButtons(){
			$('input[type=radio][name=moduleAns]').change(function() {
				console.log(respuestasTxt);
				if (respuestasTxt[$(this).val()]["val"]) {
					$(this).parents('span').css("background","chartreuse");
				}else{
					$(this).parents('span').css("background","red");
					$('input[type=radio][name=moduleAns]').each(function(){
						if(respuestasTxt[$(this).val()]["val"]){
							$(this).parents('span').css("background","aquamarine");
						}
					});
				}
				$("#respuestas").css("pointer-events","none");
				setTimeout(function(){
					$("#respuestas").css("pointer-events","auto");
					$('input[type=radio][name=moduleAns]').each(function(){
						$(this).parents('span').css("background","white");
						$(this).prop( "checked", false );
					});
					setPregunta();
				},3000);
			});
	}

	function setImgOptions(){

	}

	function setPregunta(){
		$('#header-title').html("M1 | PREGUNTA "+moduleData[questIndex]["id"]);
		console.log("a:"+moduleData[questIndex]["imagen1"].length);
		if(moduleData[questIndex]["imagen1"].length>0){
			$("#preguntas").hide();			
			setImgOptions();			
		}else{
			$("#fotos").hide();
			setTextOptions();			
		}
		
		questIndex++;
	}

	function ShowModule(){
		$(".module-cont").hide();
		if(videoDone){
			setPregunta();			
		}else{
			$("#videoplayer").show();
			$('#header-title').html("M&Oacute;DULO 1");
			LoadVideo(module["video"]);
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(){		

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

		load : function(m){
			module = m;

			$.getJSON( "http://tumbagames.com.ar/udm/admin/getModulo.php?id="+m["id"], function( data ) {
				console.log(data);
				moduleData = data["preguntas"];

				questIndex = 0;

				$("#content").removeClass();
				$("#content").addClass("ui-content");
				$("#content").addClass("white");
				$('.contenidos').hide();

				$('#modulos').show();
				$('#leftpanel').panel( "close" );
				ShowModule();
			});		
		}
	};
})();
