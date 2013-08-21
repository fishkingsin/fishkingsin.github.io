// the main three.js components
var camera, scene, renderer, projector, stats, container;
var video, image, imageContext, imageReflection, imageReflectionContext, imageReflectionGradient, texture, textureReflection;
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

window.onresize = function(event) {

	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}
// This function goes through the clips and puts them on the page
function showThumbs(videos) {
	console.log(videos);
	var thumbs = document.getElementById('thumbs');
	thumbs.innerHTML = '';

	for (var i = 0; i < videos.length; i++) {
		//<iframe src="http://player.vimeo.com/video/37808348?title=0&amp;byline=0&amp;portrait=0" width="480" height="272" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		var thumb = document.createElement('iframe');
		var url = "http://player.vimeo.com/video/" + videos[i].id + "?title=0&byline=0&portrait=0";
		//<iframe src="http://player.vimeo.com/video/50193820" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/50193820">Holographic Show Window</a> from <a href="http://vimeo.com/user13689345">Hyge Interface Inc.</a> on <a href="http://vimeo.com">Vimeo</a>.</p>
		console.log(url);
		thumb.src = url;
		thumb.setAttribute('width', "320");
		thumb.setAttribute('height', "136.5");
		thumb.setAttribute('frameborder', "0");
		thumb.setAttribute('webkitAllowFullScreen');
		thumb.setAttribute('mozallowfullscreen');
		thumb.setAttribute('allowFullScreen');

		thumbs.appendChild(thumb);
	}
}

function init() {
	BrowserDetect.init();
	
	// Change this to your username to load in your clips
	var vimeoUserName = 'fishking';

	// Tell Vimeo what function to call
	var callback = 'showThumbs';

	// Set up the URLs
	var url = 'http://vimeo.com/api/v2/' + vimeoUserName + '/videos.json?callback=' + callback;

	// This function loads the data from Vimeo
	//function init() {
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', url);
	console.log(url);
	document.getElementsByTagName('head').item(0).appendChild(js);


function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}
