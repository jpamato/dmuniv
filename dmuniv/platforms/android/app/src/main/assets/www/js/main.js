/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

	mainURL : "http://demotorescampus.com/admin/",
	cantQSet : 3,

	modulosData : [],

	// Application Constructor
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
		$.getJSON( app.mainURL+"getModulos.php?usuario_id="+localStorage.user_id, function( data ) {
			console.log(data);
			app.modulosData = data["modulos"];
			app.appInit();
		});
	},

	appInit: function(){		
		login.init(this.mainURL);
		modulos.init(this.mainURL);
		videos.init(this.modulosData);
		playlist.init(this.mainURL);
		this.menuInit(this.modulosData);
		setTimeout(function(){ $("#splash").hide(); }, 1000);
	},
	
	appExit: function(){
		modulos.reset();
	},

	menuInit: function(modulosData){

		let html = "<li id='menu-btn-videos'>INICIO</li>";

		for(let i=0;i<modulosData.length;i++){
			let blocked="";
			if(modulosData[i]["blocked"]===true)
				blocked="blocked";
			html+="<li class='menu-btn-modulos "+blocked+"' name='"+modulosData[i]["id"]+"'>M&Oacute;DULO "+(i+1)+"</li>";
		}

		html+="<li id='menu-btn-playlist'>VIDEOS</li>";
		html+="<li id='menu-btn-salir'>SALIR</li>";

		$("#leftpanel ul").html(html);

		$( "#menu-btn-perfil" ).unbind('click').click( function(){	
			perfil.load();	
		});
		
		$( "#menu-btn-videos" ).unbind('click').click( function(){	
			$("#header-next").hide();
			modulos.stopVideo();
			playlist.stopVideo();
			videos.load();	
		});

		$( ".menu-btn-modulos" ).unbind('click').click( function(){
			modulos.stopVideo();
			playlist.stopVideo();
			$("#header-next").hide();
			let id = $(this).attr('name');
			let moduloData = modulosData.find(function (obj) {
				return obj.id === id;
			});
			modulos.load(moduloData);
		});

		$( "#menu-btn-playlist" ).unbind('click').click( function(){	
			$("#header-next").hide();
			modulos.stopVideo();
			playlist.stopVideo();
			playlist.load();	
		});

		$( "#menu-btn-salir" ).unbind('click').click( function(){
			modulos.stopVideo();
			playlist.stopVideo();
			localStorage.removeItem("user_id");
			localStorage.removeItem("estadoModulos");
			location.reload();
		});

		$( "#summary-next" ).unbind('click').click( function(){	
			videos.load();	
		});

		$('.contenidos').hide();

		if(localStorage.user_id===undefined){
			login.load();
		}else{
			$.post(this.mainURL+"saveNewLogin.php",{usuario_id: localStorage.user_id}, function(data, status){
        			console.log("Data: " + data + "\nStatus: " + status);
			});
			videos.load();			
		}
			
	}
};
app.initialize();


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function SetCakePercent(percent,slice1,slice2){
	if(percent<=50){
		let val = 180+percent*0.01*360;
		slice2.css("-webkit-transform","rotate("+val+"deg)");
		slice2.css("transform","rotate("+val+"deg)");
		slice1.css("-webkit-transform","rotate(270deg)");
		slice1.css("transform","rotate(270deg)");
	}else{
		let val = 270+(percent-50)*0.02*180;
		slice2.addClass("complete");
		slice2.css("-webkit-transform","rotate(180deg)");
		slice2.css("transform","rotate(180deg)");
		slice1.css("-webkit-transform","rotate("+val+"deg)");
		slice1.css("transform","rotate("+val+"deg)");
	}
}

function CreateNavigator(divId,dotsNumber){
	let html = "<ul><div class='dots done' id='p0'></div>";
	for(let i=1;i<dotsNumber;i++)
		html+="<div class='dots' id='p"+i+"'></div>";	

	html+="</ul>";
	$("#navigator").html(html);
}

function SetNavigatorPos(divId,dotNumber){
	$("#navigator .dots").each(function( index ) {
		if(index==dotNumber)
			$( this ).addClass("done");
		else
			$( this ).removeClass("done");
	});
}
