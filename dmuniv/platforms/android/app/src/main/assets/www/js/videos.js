var videos = (function(){


	return {//funcion de inicio de la aplicación
		init : function(modulosData){
			console.log(modulosData);
			let html="";
			for(let modulo of modulosData){
				html+="<li class='video-module-item'><div class='video-module-item-title'>"+
					"<div class='video-module-item-title-cont'><h2 class='video-m-item-num'>"+
					"M&oacute;dulo "+modulo["id"]+"</h2><h4 class='video-m-item-desc'>"+
					"Loren ipsum dolo</h4><h3 class='video-m-item-state'>COMPLETADO</h3></div></div>"+
					"<div class='video-module-item-progress'><div class='donut-chart chart1'>"+
					"<div class='slice one'></div><div class='slice two'></div><div class='chart-center'>"+
					"<button class='video-m-play-btn ui-btn ui-shadow ui-corner-all' name='"+modulo["id"]+"'><img src='img/play2.png'></button>"+
					"</div></div></div></li>";
			}

			$("#videos ul").html(html);

			$(".video-m-play-btn").unbind('click').click( function(){
				let id = $(this).attr('name');
				let moduloData = modulosData.find(function (obj) {
					return obj.id === id;
				});
				modulos.load(moduloData);	
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
		}
	};
})();
