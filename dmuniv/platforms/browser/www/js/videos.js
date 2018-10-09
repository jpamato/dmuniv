var videos = (function(){

	var modulosData;

	return {//funcion de inicio de la aplicación
		init : function(mData){
			modulosData = mData;
			console.log(modulosData);
			let html="";
			for(let modulo of modulosData){
				html+="<li class='video-module-item'><div class='video-module-item-title'>"+
					"<div class='video-module-item-title-cont'><h2 class='video-m-item-num'>"+
					"M&oacute;dulo "+modulo["id"]+"</h2><h4 class='video-m-item-desc'>"+
					"Loren ipsum dolo</h4><h4 id='video-state-"+modulo["id"]+"' class='video-m-item-state'>POR INICIAR</h4></div></div>"+
					"<div id='video-progress-"+modulo["id"]+"' class='video-module-item-progress unviewed'><div class='donut-chart chart1'>"+
					"<div class='slice one'></div><div class='slice two'></div><div class='chart-center'>"+
					"<button class='video-m-play-btn ui-btn ui-shadow ui-corner-all' name='"+modulo["id"]+"'><img src='img/play2.png'></button>"+
					"</div></div></div></li>";			
			}

			$("#videos ul").html(html);

			for(let modulo of modulosData)
				this.setProgress(modulo["id"]);

			$(".video-m-play-btn").unbind('click').click( function(){
				let id = $(this).attr('name');
				let estadoModulo = modulos.getModuleState(id);
				console.log(estadoModulo);
				if(estadoModulo!=undefined){
					if(estadoModulo["questIndex"]<estadoModulo["cantQuest"]){
						let moduloData = modulosData.find(function (obj) {
							return obj.id === id;
						});
						modulos.load(moduloData);
					}
				}else{
					let moduloData = modulosData.find(function (obj) {
						return obj.id === id;
					});
					modulos.load(moduloData);
				}

			});	
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#header-title').html("VIDEOS");
			$('#videos').show();
			$('#leftpanel').panel( "close" );

			for(let modulo of modulosData)
				this.setProgress(modulo["id"]);
		},

		setProgress : function(id){
			let moduleState = modulos.getModuleState(id);
			console.log("#video-progress-"+id+" .slice.one");

			let elem1 = $("#video-progress-"+id+" .slice.one");
			let elem2 = $("#video-progress-"+id+" .slice.two");
			if(moduleState!=undefined){
				let percent = 100 * moduleState["questIndex"]/moduleState["cantQuest"];
				console.log("percent: "+percent);
				let elem1 = $("#video-progress-"+id+" .slice.one");
				let elem2 = $("#video-progress-"+id+" .slice.two");
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
						let correct = 100 * moduleState["correct"]/moduleState["cantQuest"];
						console.log("correct: "+correct);
						SetCakePercent(correct,elem1,elem2);
						/*if(correct<=50){
							let val = 180+correct*0.01*360;
							elem2.css("background","red");
							elem2.css("-webkit-transform","rotate("+val+"deg)");
							elem2.css("transform","rotate("+val+"deg)");
							elem1.css("-webkit-transform","rotate(270deg)");
							elem1.css("transform","rotate(270deg)");						
						}else if(correct<99){
							let val = 270+(correct-50)*0.02*180;
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
