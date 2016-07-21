// the main three.js components
//var camera, scene, renderer, projector, stats, container;
//var video, image, imageContext, imageReflection, imageReflectionContext, imageReflectionGradient, texture, textureReflection;
// to keep track of the mouse position
mouseX = 0, mouseY = 0;
var mouse = {
	x : 0,
	y : 0
}, INTERSECTED;
var PI2 = Math.PI * 2;
var photos;
// let's get going!
window.onload = init;
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
		|| this.searchVersion(navigator.appVersion)
		|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		console.log(this.browser + this.version + this.OS);
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
	{
		string: navigator.userAgent,
		subString: "Chrome",
		identity: "Chrome"
	},
	{ 	string: navigator.userAgent,
		subString: "OmniWeb",
		versionSearch: "OmniWeb/",
		identity: "OmniWeb"
	},
	{
		string: navigator.vendor,
		subString: "Apple",
		identity: "Safari",
		versionSearch: "Version"
	},
	{
		prop: window.opera,
		identity: "Opera",
		versionSearch: "Version"
	},
	{
		string: navigator.vendor,
		subString: "iCab",
		identity: "iCab"
	},
	{
		string: navigator.vendor,
		subString: "KDE",
		identity: "Konqueror"
	},
	{
		string: navigator.userAgent,
		subString: "Firefox",
		identity: "Firefox"
	},
	{
		string: navigator.vendor,
		subString: "Camino",
		identity: "Camino"
	},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
		],
		dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
		]

	};

// This function goes through the clips and puts them on the page
function showThumbs(videos) {
	return;
	 console.log(videos.length);

	if(BrowserDetect.browser=="Chrome" || BrowserDetect.browser=="Safari")
	{
	 	var thumbs = document.getElementById('thumbs');
	 	thumbs.innerHTML = '';

	 	for (var i = 0; i < videos.length; i++) {
			var thumb = document.createElement('iframe');
			var url = "https://player.vimeo.com/video/" + videos[i].id + "?title=0&byline=0&portrait=0&color=aaaaaa";
			
			thumb.src = url;
			thumb.setAttribute('width', "300");
			thumb.setAttribute('height', "179");
			thumb.setAttribute('frameborder', "0");
			// thumb.setAttribute('webkitAllowFullScreen');
			// thumb.setAttribute('mozallowfullscreen');
			// thumb.setAttribute('allowFullScreen');

			thumbs.appendChild(thumb);
		}
	
	}
	else
	{
		var thumbs = document.getElementById('thumbs');
		thumbs.innerHTML = '';

		for (var i = 0; i < videos.length; i++) {

			var object = document.createElement('object');
			object.setAttribute('width', "300");
			object.setAttribute('height', "179");

			var param = document.createElement('param');
			param.setAttribute('allowfullscreen', "true");
			object.appendChild(param);


			param = document.createElement('param');
			param.setAttribute('allowscriptaccess', "always");
			object.appendChild(param);

			param = document.createElement('param');
			param.setAttribute('movie', "https://vimeo.com/moogaloop.swf?clip_id=="+videos[i].id+"&server=vimeo.com&title=0&byline=0&portrait=0&color=aaaaaa&fullscreen=1");
			object.appendChild(param);

			embed = document.createElement('embed');

			var url = "https://vimeo.com/moogaloop.swf?clip_id="+videos[i].id+"&server=vimeo.com&title=0&byline=0&portrait=0&color=aaaaaa&fullscreen=1"

			embed.src = url;
			embed.setAttribute('type', "application/x-shockwave-flash");
			embed.setAttribute('allowfullscreen', "true");
			embed.setAttribute('allowscriptaccess', "always");
			embed.setAttribute('width', "300");
			embed.setAttribute('height', "179");
			object.appendChild(embed);

			$("#thumbs").appendChild(object);
		}
	}


}

function init() {
	BrowserDetect.init();
	// Change this to your username to load in your clips
	var vimeoUserName = 'fishking';

	// Tell Vimeo what function to call
	var callback = 'showThumbs';

	// Set up the URLs
	var url = 'https://vimeo.com/api/v2/' +vimeoUserName+ '/videos.json?callback=' + callback+'&page=1&per_page=50';


	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', url);
	document.getElementsByTagName('head').item(0).appendChild(js);


	// var three = $("#three');
	// var script1 = document.createElement('script');
	// script1.src = "./js/three.min.js";

	// var r = float2int(Math.random()*3);

	// var script2 = document.createElement('script');
	// if(r==0)
	// {
	// 	script2.src = "./js/three.canvas1.js";
	// }
	// else if(r==1)
	// {
	// 	script2.src = "./js/three.canvas2.js";
	// }
	// else if(r==2)
	// {
	// 	script2.src = "./js/three.canvas3.js";
	// }

	// three.appendChild(script1);
	// three.appendChild(script2);

	$(document).on('keydown', onDocumentKeyDown);
}
/** Event handler for the document object's 'keydown' event */
var onDocumentKeyDown = function (event) {
	switch (event.keyCode) {
        // case 'H'.charCodeAt(0):
        //     hud.toggle();
            // break;
            case 'F'.charCodeAt(0):
            if (screenfull.enabled) screenfull.toggle();
            break;
        // case 'P'.charCodeAt(0):
        //     screenshot();
            // break;
        }
    };

