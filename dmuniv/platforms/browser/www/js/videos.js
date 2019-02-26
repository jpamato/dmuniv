var videos = (function(){

	var modulosData;

	return {//funcion de inicio de la aplicación
		init : function(mData){
			modulosData = mData;
			console.log(modulosData);
			var html="";
			plugin.logcat.sendLogs(modulosData);
			modulosData.forEach(function(modulo){
			//for(var modulo in modulosData){
				var blocked="play2";
				if(modulo["blocked"]===true)
					blocked = "blocked";
				
				html+="<li class='video-module-item'><div class='video-module-item-title'>"+
					"<div class='video-module-item-title-cont'><h2 class='video-m-item-num'>"+
					"M&oacute;dulo "+modulo["id"]+"</h2><h4 class='video-m-item-desc'>"+modulo["nombre"]+
					"<h4 id='video-state-"+modulo["id"]+"' class='video-m-item-state'>POR INICIAR</h4></div></div>"+
					"<div id='video-progress-"+modulo["id"]+"' class='video-module-item-progress unviewed'><div class='donut-chart chart1'>"+
					"<div class='slice one'></div><div class='slice two'></div><div class='chart-center'>"+
					"<button class='video-m-play-btn ui-btn ui-shadow ui-corner-all' name='"+modulo["id"]+"'><img src='img/"+blocked+".png'></button>"+
					"</div></div></div></li>";			
			});
				html+="<li class='video-module-item'><h2 class='video-all-in-main' id='all_viodeos'><hr><br>Novedades<br></h2></li>";		
			$("#videos ul").html(html);

			//for(var modulo in modulosData)
			modulosData.forEach(function(modulo){
				videos.setProgress(modulo["id"]);
			});
			
			$( "#all_viodeos" ).unbind('click').click( function(){	
			$('#header-title').html("NOVEDADES");
			$("#header-next").hide();
			modulos.stopVideo();
			playlist.stopVideo();
			playlist.load();	
			});

			$(".video-m-play-btn").unbind('click').click( function(){
				var id = $(this).attr('name');
				var estadoModulo = modulos.getModuleState(id);
				console.log(estadoModulo);
				if(estadoModulo!=undefined){
					if(estadoModulo["questIndex"]<estadoModulo["cantQuest"]){
						var moduloData = modulosData.filter(function (obj) {
							return obj.id === id;
						})[0];
						modulos.load(moduloData);
					}
				}else{
					var moduloData = modulosData.filter(function (obj) {
						return obj.id === id;
					})[0];
					modulos.load(moduloData);
				}

			});	
		},
		
		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#header-title').html("INICIO");
			$('#videos').show();
			$('#leftpanel').panel( "close" );

			modulosData.forEach(function(modulo){
			//for(var modulo in modulosData)
				videos.setProgress(modulo["id"]);
			});
		},

		setProgress : function(id){
			var moduleState = modulos.getModuleState(id);
			console.log("#video-progress-"+id+" .slice.one");

			var elem1 = $("#video-progress-"+id+" .slice.one");
			var elem2 = $("#video-progress-"+id+" .slice.two");
			if(moduleState!=undefined){
				var percent = 100 * moduleState["questIndex"]/moduleState["cantQuest"];
				console.log("percent: "+percent);
				var elem1 = $("#video-progress-"+id+" .slice.one");
				var elem2 = $("#video-progress-"+id+" .slice.two");
				//elem1.css("background","red");

				if(percent>0&&percent<100){
					$("#video-state-"+id).text("EN PROCESO");
					$("#video-state-"+id).removeClass("unviewed");
					$("#video-state-"+id).addClass("viewed");
				}

				if(percent<99){
					SetCakePercent(percent,elem1,elem2);				
				}else{
					if(!elem1.hasClass("done")){
						$("#video-state-"+id).text("COMPLETADO");
						var correct = 100 * moduleState["correct"]/moduleState["cantQuest"];
						console.log("correct: "+correct);
						elem2.removeClass("complete");
						SetCakePercent(correct,elem1,elem2);
						/*if(correct<=50){
							var val = 180+correct*0.01*360;
							elem2.css("background","red");
							elem2.css("-webkit-transform","rotate("+val+"deg)");
							elem2.css("transform","rotate("+val+"deg)");
							elem1.css("-webkit-transform","rotate(270deg)");
							elem1.css("transform","rotate(270deg)");						
						}else if(correct<99){
							var val = 270+(correct-50)*0.02*180;
							elem2.css("background","green");
							elem2.css("-webkit-transform","rotate(180deg)");
							elem2.css("transform","rotate(180deg)");
							elem1.css("-webkit-transform","rotate("+val+"deg)");
							elem1.css("transform","rotate("+val+"deg)");
						}*/
						elem1.addClass("done");
						elem2.addClass("done");
						$("#video-progress-"+id+" .donut-chart.chart1").addClass("done");
					}
				}
			}
		}
	};
})();
