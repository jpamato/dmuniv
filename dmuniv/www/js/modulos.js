var modulos = (function(){

	var videoDone = false;
	var player;

	var module;
	var moduleData;

	var questIndex;

	var respuestasTxt;
	var respuestasImg;

	var estadoModulos = [];
	var estadoModulo;

	function Reset(){
		videoDone=false;
		module = undefined;
		moduleData = undefined;
		estadoModulos = undefined;
		questIndex = 0;
	}

	function LoadVideo(vId) {
		player = new YT.Player('player', {
			
			//width: screen.width,
			//height: screen.width * 390 / 640,
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

	function setImgOptions(){
		fotos

		respuestasImg = [];
		for(let i=0;i<2;i++){
			let r = {
				src:moduleData[questIndex]["imagen"+(i+1)],
				val:i==0
			}
			console.log(r);
			respuestasImg.push(r);
		}
		shuffle(respuestasImg);

		var html="";
		for(let i=0;i<2;i++)
			html+="<button class='moduleImg' value='"+i+"'><img src='"+respuestasImg[i]["src"]+"'></button>";

		$("#img-cont").html(html);

		$("#fotos").show();
		console.log(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		$("#fotos .pregunta").text((questIndex+1)+". "+moduleData[questIndex]["pregunta"]);
		SetImgButtons();
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
		for(let i=0;i<3;i++)
			html+="<span><div class='ui-radio'><input type='radio' name='moduleAns' value='"+i+"'></div> "+letter[i]+") "+respuestasTxt[i]["text"]+"</span><br>";

		$("#respuestas-cont").html(html);

		$("#preguntas").show();
		console.log(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		$("#preguntas .pregunta").text((questIndex+1)+". "+moduleData[questIndex]["pregunta"]);
		SetRadioButtons();
	}

	function SetImgButtons(){
			$(".moduleImg").unbind('click').click( function(){	
				$("#result-signal").show();
				if (respuestasImg[$(this).val()]["val"]) {
					$(this).css("background","chartreuse");
					$("#result-signal img").attr("src","img/correcto.png");
					estadoModulo["correct"]++;
				}else{
					$(this).css("background","red");
					$("#result-signal img").attr("src","img/incorrecto.png");
					$(".moduleImg").each(function(){
						if(respuestasImg[$(this).val()]["val"]){
							$(this).css("background","aquamarine");
						}
					});
				}
			questIndex++;
			estadoModulo["questIndex"] = questIndex;
			console.log("qIndex: "+questIndex);
			$(".moduleImg").css("pointer-events","none");
			setTimeout(function(){
					$(".moduleImg").css("pointer-events","auto");					
					$(".moduleImg").each(function(){
						$(this).css("background","transparent");
					});
					$("#result-signal").hide();
					setPregunta();
				},3000);
			});

	}

	function SetRadioButtons(){
		$('input[type=radio][name=moduleAns]').change(function() {
			console.log(respuestasTxt);
			$("#result-signal").show();
			if (respuestasTxt[$(this).val()]["val"]) {
				//$(this).parents('span').css("background","chartreuse");
				$(this).parents('span').addClass("answer_correct");
				$("#result-signal img").attr("src","img/correcto.png");
				estadoModulo["correct"]++;
			}else{
				//$(this).parents('span').css("background","red");
				$(this).parents('span').addClass("answer_incorrect");
				$("#result-signal img").attr("src","img/incorrecto.png");
				$('input[type=radio][name=moduleAns]').each(function(){
					if(respuestasTxt[$(this).val()]["val"]){
						//$(this).parents('span').css("background","aquamarine");
						$(this).parents('span').addClass("answer_correct");
					}
				});
			}
			questIndex++;
			estadoModulo["questIndex"] = questIndex;
			console.log("qIndex: "+questIndex);
			$("#respuestas").css("pointer-events","none");
			setTimeout(function(){
				$("#respuestas").css("pointer-events","auto");
				$('input[type=radio][name=moduleAns]').each(function(){
					//$(this).parents('span').css("background","white");
					$(this).parents('span').removeClass("answer_correct");
					$(this).parents('span').removeClass("answer_incorrect");
					$(this).prop( "checked", false );
				});
				$("#result-signal").hide();
				setPregunta();
			},3000);
		});
	}

	function setPregunta(){
		$("#navigator").show();
		SetNavigatorPos("module-nav",estadoModulo["questIndex"]);
		if(questIndex<estadoModulo["cantQuest"]){
			$('#header-title').html("M"+module["id"]+" | PREGUNTA "+(questIndex+1));
			console.log("a:"+moduleData[questIndex]["imagen1"].length);
			if(moduleData[questIndex]["imagen1"].length>0){
				$("#preguntas").hide();			
				setImgOptions();			
			}else{
				$("#fotos").hide();
				setTextOptions();			
			}
		}else{
			$("#content").removeClass("white");
			$("#content").addClass("blue");
			$("#preguntas").hide();			
			$("#fotos").hide();
			$("#navigator").hide();
			$("#summary").show();

			$('#header-title').html("M"+module["id"]+" | MI PROGRESO");

			$("#modulos .cont-footer").addClass("summary");

			$("#modulos .cont-footer img").attr("src","img/logo-footer_2.png");

			$("#summary #correct").text();
			$("#summary #incorrect").text();

			let elem1 = $("#module-progress .slice.one");
			let elem2 = $("#module-progress .slice.two");
			elem2.removeClass("complete");
			let correct = 100 * estadoModulo["correct"]/estadoModulo["cantQuest"];

			$("#summary #correct").html("<h3><b>"+correct+"%</b></h3><h5>ACERTADAS</h5>");
			$("#summary #incorrect").html("<h3><b>"+(100-correct)+"%</b></h3><h5>ERRADAS</h5>");

			console.log("correct: "+correct);
			SetCakePercent(correct,elem1,elem2);
		}


	}

	function ShowModule(){
		$(".module-cont").hide();
		if(videoDone){
			setPregunta();			
		}else{
			$("#videoplayer").show();
			$('#header-title').html("M&Oacute;DULO "+module["id"]);
			LoadVideo(module["video"]);
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(){
			$('#summary').hide();		
		},

		reset : Reset,

		load : function(m){
			module = m;

			$.getJSON( "http://demotorescampus.com/admin/getModulo.php?id="+m["id"], function( data ) {
				console.log(data);
				moduleData = data["preguntas"];

				estadoModulo = estadoModulos.find(function (obj) {
					return obj.id === m["id"];
				});

				if(estadoModulo==undefined){
					estadoModulo = {id:m["id"],questIndex:0,cantQuest:moduleData.length,correct:0};
					estadoModulos.push(estadoModulo);
					console.log("aca1: "+estadoModulo["id"]);
					estadoModulo = estadoModulos.find(function (obj) {
						return obj.id === m["id"];
					});
				}

				console.log(estadoModulos);

				questIndex = estadoModulo["questIndex"];
				console.log(questIndex);				
				videoDone = questIndex>0;

				$("#content").removeClass("blue");
				$("#content").addClass("white");
				$('.contenidos').hide();
				$("#modulos .cont-footer").removeClass("summary");
				$("#modulos .cont-footer img").attr("src","img/logo-footer.png");

				$("#result-signal").hide();
				CreateNavigator("module-nav",estadoModulo["cantQuest"]);
				SetNavigatorPos("module-nav",estadoModulo["questIndex"]);
				$("#navigator").hide();

				$('#modulos').show();
				$('#leftpanel').panel( "close" );
				ShowModule();
			});		
		},

		getModuleState : function(id){
			return estadoModulos.find(function (obj) {
				return obj.id === id;
			});
		}
	};
})();
