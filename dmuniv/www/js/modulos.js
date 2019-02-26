var modulos = (function(){

	var videoPdfDone = false;
	var player;

	var module;
	var moduleData;

	var questIndex;

	var respuestasTxt;
	var respuestasImg;

	var estadoModulos = [];
	var estadoModulo;

	var correctasSet=0;

	var url;

	nextSet = true;

	function Reset(){
		//videoPdfDone=false;
		setVideoPdf(false);
		module = undefined;
		moduleData = undefined;
		//estadoModulos = undefined;
		questIndex = 0;
	}

	function setVideoPdf(done){
		if(done){
			videoPdfDone=true;
			$("#to-preguntas").css("pointer-events","auto");
		}else{
			videoPdfDone=false;
			$("#to-preguntas").css("pointer-events","none");
		}
	}

	function SetVideo(vId){
		$("#videoplayer").html("<div id='player'></div>");
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

	function LoadVideo(vId) {
		console.log("loadvideo");
		if(player!=undefined){
			console.log(player["b"]["b"]["videoId"]);
			if(player["b"]["b"]["videoId"]==vId){
				player.playVideo();
			}else{
				SetVideo(vId);
			}
		}else{
			SetVideo(vId);		
		}	
	}

	function pdfNext(){
		$.post(url+"saveResult_pdf.php",{usuario_id: localStorage.user_id, modulo_id:module["id"]}, function(data, status){
			console.log("Data: " + data + "\nStatus: " + status);
		});
		setVideoPdf(true);
		$("#header-next").hide();
		setPregunta();
	}

	function LoadPDF(mId) {
		html = "<iframe src='http://demotorescampus.com/pdf/web/viewer.html?file=modulo"+mId+".pdf' style='position: relative;   top: 0;  bottom: 0; left: 0;   width: 100%;   height: 566px;  border: 0'></iframe><div class='pdf-next-button' id='header-next-button'><img src='img/siguiente.png' /></div>";
		console.log(html);
		$("#pdfviewer").html(html);		 
		$("#header-next").show();
		
		$("#header-next-button").unbind('click').click( function(){	
				pdfNext();
			});
	}

	// autoplay video
	function onPlayerReady(event) {
		console.log("playerready: ");
		console.log(event);
		event.target.playVideo();
	}

	// when video ends
	function onPlayerStateChange(event) {
		console.log("onPlayerStateChange: ");
		console.log(event);
		if(event.data === 0) {          
			//videoPdfDone=true;
			setVideoPdf(true);
			$.post(url+"saveResult_videos.php",{usuario_id: localStorage.user_id, modulo_id:module["id"]}, function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
			});
			//ShowModule();
			setPregunta();
		}
	}

	function setImgOptions(){
		fotos

		respuestasImg = [];
		for(var i=0;i<2;i++){
			var r = {
				src:moduleData[questIndex]["imagen"+(i+1)],
				val:i==0
			}
			console.log(r);
			respuestasImg.push(r);
		}
		shuffle(respuestasImg);

		var html="";
		for(var i=0;i<2;i++)
			html+="<button class='moduleImg' value='"+i+"'><img src='"+respuestasImg[i]["src"]+"'></button>";

		$("#img-cont").html(html);

		$("#fotos").show();
		console.log(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		$("#fotos .pregunta").text(moduleData[questIndex]["pregunta"]);
		SetImgButtons();
	}

	function setTextOptions(){
		respuestasTxt = [];
		for(var i=0;i<3;i++){
			var r = {
				text:moduleData[questIndex]["respuesta"+(i+1)],
				val:i==0
			}
			console.log(r);
			respuestasTxt.push(r);
		}
		shuffle(respuestasTxt);

		var html="";
		letter = ["a","b","c"];
		for(var i=0;i<3;i++)
			html+="<span name='"+i+"'><div class='ui-radio'><input type='radio' name='moduleAns' value='"+i+"'></div> "+letter[i]+") "+respuestasTxt[i]["text"]+"</span><br>";

		$("#respuestas-cont").html(html);

		$("#preguntas").show();
		console.log(moduleData[questIndex]["id"]+". "+moduleData[questIndex]["pregunta"]);
		$("#preguntas .pregunta").text(moduleData[questIndex]["pregunta"]);
		SetRadioButtons();
	}

	function SendAnswer(result){
		$.post(url+"saveResult.php",{usuario_id: localStorage.user_id, pregunta_id:moduleData[questIndex]["id"], resultado:result, modulo_id:module["id"]}, function(data, status){
			console.log("Data: " + data + "\nStatus: " + status);
		});

		if(estadoModulo["questIndex"]==estadoModulo["cantQuest"]-1){
			console.log("saveResult_modulos_completos");
			$.post(url+"saveResult_modulos_completos.php",{usuario_id: localStorage.user_id, modulo_id:module["id"]}, function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
			});
		}
	}

	function SetImgButtons(){
		$(".moduleImg").unbind('click').click( function(){	
			$("#result-signal").show();
			$("#result-signal img").show(); 
			if (respuestasImg[$(this).val()]["val"]) {
				$(this).css("background","chartreuse");
				$("#result-img img").attr("src","img/correcto.png");
				SendAnswer(1);
				estadoModulo["correct"]++;
				correctasSet++;
			}else{
				$(this).css("background","red");
				$("#result-img img").attr("src","img/incorrecto.png");
				SendAnswer(0);
				$(".moduleImg").each(function(){
					if(respuestasImg[$(this).val()]["val"]){
						$(this).css("background","aquamarine");
					}
				});
			}
			questIndex++;
			estadoModulo["questIndex"] = questIndex;
			localStorage.setItem("estadoModulos", JSON.stringify(estadoModulos));
			console.log("qIndex: "+questIndex);
			$(".moduleImg").css("pointer-events","none");
			$("#modulo-next").unbind('click').click( function(){
				$(".moduleImg").css("pointer-events","auto");					
				$(".moduleImg").each(function(){
					$(this).css("background","transparent");
				});
				$("#result-signal").hide();
				setPregunta();
			});
			//$("#modulo-next").hide();
			setTimeout(function(){
				$("#result-signal").show();
				$("#modulo-next").show();
				$("#result-img").hide(); 
			}, 1500);
		});

	}

	function SetRadioOption(elem){
			$("#respuestas").css("pointer-events","none");
			console.log(respuestasTxt);
			$("#result-signal").show();
			$("#result-img").show(); 
			if (respuestasTxt[elem.val()]["val"]) {
				//elem.parents('span').css("background","chartreuse");
				elem.parents('span').addClass("answer_correct");
				$("#result-img img").attr("src","img/correcto.png");
				SendAnswer(1);
				estadoModulo["correct"]++;
				correctasSet++;
			}else{
				//elem.parents('span').css("background","red");
				elem.parents('span').addClass("answer_incorrect");
				$("#result-img img").attr("src","img/incorrecto.png");
				SendAnswer(0);
				$('input[type=radio][name=moduleAns]').each(function(){					
					if(respuestasTxt[$(this).val()]["val"]){
						//$(this).parents('span').css("background","aquamarine");
						$(this).parents('span').addClass("answer_correct");
					}
				});
			}
			questIndex++;
			estadoModulo["questIndex"] = questIndex;
			localStorage.setItem("estadoModulos", JSON.stringify(estadoModulos));
			console.log("qIndex: "+questIndex);			
			$("#modulo-next").unbind('click').click( function(){
				$("#respuestas").css("pointer-events","auto");
				$('input[type=radio][name=moduleAns]').each(function(){
					//elem.parents('span').css("background","white");
					elem.parents('span').removeClass("answer_correct");
					elem.parents('span').removeClass("answer_incorrect");
					elem.prop( "checked", false );
				});
				$("#result-signal").hide();
				setPregunta();
			});
			$("#modulo-next").hide();
			setTimeout(function(){
				$("#result-signal").show();
				$("#modulo-next").show();
				$("#result-img").hide();
				//$("#result-signal img").hide(); 
			}, 1500);
			event.preventDefault();
			event.stopImmediatePropagation();
	}

	function SetRadioButtons(){
		$('input[type=radio][name=moduleAns]').change(function() {
			SetRadioOption($(this));
		});

		$('#respuestas-cont span').unbind('click').click( function(){
			$('input[type=radio][value='+$(this).attr('name')+']').attr('checked',true);
			SetRadioOption($('input[type=radio][value='+$(this).attr('name')+']'));
		//$('input:radio[name=cols]'+" #"+newcol).attr('checked',true);	
		});
	}

	function setPregunta(){
		$(".module-cont").hide();
		$("#navigator").show();
		console.log("qIndex: "+estadoModulo["questIndex"]);
		SetNavigatorPos("module-nav",estadoModulo["questIndex"]%app.cantQSet);
		if(questIndex%app.cantQSet!=0||questIndex==0||nextSet){
			$('#header-title').html("M"+module["id"]+" | PREGUNTA "+(questIndex+1));
			console.log("a:"+moduleData[questIndex]["imagen1"].length);
			if(moduleData[questIndex]["imagen1"].length>0){
				$("#preguntas").hide();			
				setImgOptions();			
			}else{
				$("#fotos").hide();
				setTextOptions();			
			}
			nextSet=false;
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

			var elem1 = $("#module-progress .slice.one");
			var elem2 = $("#module-progress .slice.two");
			elem2.removeClass("complete");

			console.log(correctasSet+"/"+app.cantQSet);

			var correct = 100 * correctasSet/app.cantQSet;
			if(estadoModulo["questIndex"]>=estadoModulo["cantQuest"])
				correct = 100 * estadoModulo["correct"]/estadoModulo["cantQuest"];

			$("#summary #correct").html("<h3><b>"+correct.toFixed(2)+"%</b></h3><h5>ACERTADAS</h5>");
			$("#summary #incorrect").html("<h3><b>"+(100-correct).toFixed(2)+"%</b></h3><h5>ERRADAS</h5>");

			console.log("correct: "+correct);
			SetCakePercent(correct,elem1,elem2);
			correctasSet = 0;
		}


	}

	function ShowModuleMenu(){
		$(".module-cont").hide();
		$('#header-title').html("M&Oacute;DULO "+module["id"]);
		$("#modulos-menu").show();
	}

	function ShowVideo(){
		$(".module-cont").hide();
		$("#videoplayer").show();
		//$('#header-title').html("M&Oacute;DULO "+module["id"]);
		LoadVideo(module["video"]);
	}

	function ShowPDF(){
		$(".module-cont").hide();
		$("#pdfviewer").show();
		//$('#header-title').html("M&Oacute;DULO "+module["id"]);
		LoadPDF(module["id"]);
	}


	/*function ShowModule(){
		$(".module-cont").hide();
		if(videoPdfDone){
			setPregunta();			
		}else{
			$("#videoplayer").show();
			//$('#header-title').html("M&Oacute;DULO "+module["id"]);
			LoadVideo(module["video"]);
		}
	}*/

	return {//funcion de inicio de la aplicación
		init : function(_url){
			$('#summary').hide();
			url = _url;

			$("#to-videoplayer").unbind('click').click( function(){	
				ShowVideo();
			});

			$("#to-pdfviewer").unbind('click').click( function(){	
				ShowPDF();
			});

			$("#to-preguntas").unbind('click').click( function(){	
				setPregunta();
			});

			$("#header-next").unbind('click').click( function(){	
				pdfNext();
			});
			
			$("#header-next-button").unbind('click').click( function(){	
				pdfNext();
			});

			$("#header-next").hide();
		},

		reset : Reset,

		stopVideo : function(){
			console.log(player);
			if(player!=undefined){
				//player.stopVideo();
			}
		},

		load : function(m){

			if(m["blocked"]===true)
				return;

			module = m;
			console.log("aca");
			console.log(m);
			$.getJSON( url+"getModulo.php?id="+m["id"], function( data ) {
				console.log(data);
				moduleData = data["preguntas"];
				console.log(moduleData);


				estadoModulo = estadoModulos.filter(function (obj) {
					return obj.id === m["id"];
				})[0];

				if(estadoModulo==undefined){
					estadoModulo = {id:m["id"],questIndex:0,cantQuest:moduleData.length,correct:0};
					estadoModulos.push(estadoModulo);
					console.log("aca1: "+estadoModulo["id"]);
					estadoModulo = estadoModulos.filter(function (obj) {
						return obj.id === m["id"];
					})[0];
				}

				console.log(estadoModulos);

				localStorage.setItem("estadoModulos", JSON.stringify(estadoModulos));


				questIndex = estadoModulo["questIndex"];
				if(questIndex%app.cantQSet==0&&estadoModulo["questIndex"]<estadoModulo["cantQuest"]){
					//videoPdfDone=false;
					setVideoPdf(false);
					nextSet=true;
				}else{
					//videoPdfDone=true;
					setVideoPdf(true);
					nextSet=false;
				}
					


				$("#content").removeClass("blue");
				$("#content").addClass("white");
				$('.contenidos').hide();
				$("#modulos .cont-footer").removeClass("summary");
				$("#modulos .cont-footer img").attr("src","img/logo-footer.png");

				$("#result-signal").hide();
				CreateNavigator("module-nav",app.cantQSet);
				console.log(estadoModulo["questIndex"]%app.cantQSet);
				SetNavigatorPos("module-nav",estadoModulo["questIndex"]%app.cantQSet);
				$("#navigator").hide();

				$('#modulos').show();
				$('#leftpanel').panel( "close" );
				//ShowModule();
				ShowModuleMenu();
			});		
		},

		getModuleState : function(id){

			if(estadoModulos.length==0){
				estadoModulos = JSON.parse(localStorage.getItem("estadoModulos"));
				if(estadoModulos==null)
					estadoModulos = [];
			}
			
			return estadoModulos.filter(function (obj) {
				return obj.id === id;
			})[0];

			/*for(var modulo in estadoModulos){
				if(modulo.id===id)
					return modulo;
			}
			/*return estadoModulos.find(function (obj) {
				return obj.id === id;
			});*/
		}
	};
})();
