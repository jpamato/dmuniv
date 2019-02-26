var playlist = (function(){

	var player;
	var videos = [];

	var videosData = []

	function SetVideo(vId){
		$("#playlist-videoplayer").show();
		$("#playlist-videoplayer").html("<button id='playlist-back'><i class='fa fa-chevron-circle-left'></i></button><br><br><div id='playlist-player'></div>");
		$("#playlist-back").unbind('click').click( function(){
				player.stopVideo();
				$("#playlist ul").show();
				$("#playlist-videoplayer").hide();	
		});
		player = new YT.Player('playlist-player', {
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
				$("#playlist ul").hide();
				$("#playlist-videoplayer").show();
				player.playVideo();
			}else{
				SetVideo(vId);
			}
		}else{
			SetVideo(vId);		
		}	
	}

	// autoplay video
	function onPlayerReady(event) {
		console.log("playerready: ");
		console.log(event);
		$("#playlist ul").hide();
		event.target.playVideo();
	}

	// when video ends
	function onPlayerStateChange(event) {
		console.log("onPlayerStateChange: ");
		console.log(event);
		if(event.data === 0) {		
			$("#playlist ul").show();
			$("#playlist-videoplayer").hide();
		}
	}

	return {//funcion de inicio de la aplicación
		init : function(url){


			$.getJSON( url+"getVideos.php", function( data ) {
				console.log(data);
				videos = data["videos"];
				console.log(videos);
				var html="";
				videos.forEach(function(video){
//				for(var video of videos){
					var info = {};
					console.log("AAA");
					console.log(video["youtubeId"]);
					$.getJSON( "https://noembed.com/embed?url=https://www.youtube.com/watch?v="+video["youtubeId"], function( data ) {
						info = data;
						console.log(info);
						//$(".playlist-item[name="+video["youtubeId"]+"] img").attr("src",info["thumbnail_url"]);
						$(".playlist-item[name="+video["youtubeId"]+"] h4").text(info["title"]);
					});
					
					html+="<li class='playlist-item' name='"+video["youtubeId"]+"'>"+
					"<img src='https://img.youtube.com/vi/"+video["youtubeId"]+"/sddefault.jpg'><br>"+
					//"<img src='"+info["thumbnail_url"]+"'>"+
					"<h4></h4>"
					"</li>";
				
				});

				$("#playlist ul").html(html);
				$(".playlist-item").unbind('click').click( function(){
					var id = $(this).attr('name');
					LoadVideo(id);	
				});
			});

			
		},

		load : function(){
			$("#content").removeClass();
			$("#content").addClass("ui-content");
			$("#content").addClass("blue");
			$('.contenidos').hide();
			$('#header-title').html("NOVEDADES");
			$('#playlist').show();
			$('#leftpanel').panel( "close" );
			$("#playlist ul").show();
			$("#playlist-videoplayer").hide();	
		},

		stopVideo : function(){
			if(player!=undefined){
				player.stopVideo();
			}
		}
	};
})();
