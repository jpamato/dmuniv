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
		$.getJSON( "http://tumbagames.com.ar/udm/admin/getModulos.php", function( data ) {
			console.log(data);
			app.modulosData = data["modulos"];
			app.appInit();
		});			
	},

	appInit: function(){		
		login.init();
		videos.init(this.modulosData);
		modulos.init();
		this.menuInit();
		setTimeout(function(){ $("#splash").hide(); }, 1000);
	},
	
	menuInit: function(){
		$( "#menu-btn-perfil" ).unbind('click').click( function(){	
			perfil.load();	
		});
		
		$( "#menu-btn-videos" ).unbind('click').click( function(){	
			videos.load();	
		});

		$( ".menu-btn-modulos" ).unbind('click').click( function(){
			console.log($(this).attr('name'));
			modulos.load();	
		});

		$('.contenidos').hide();

		login.load();
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
