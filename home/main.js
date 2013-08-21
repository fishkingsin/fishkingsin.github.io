// function updateSite(event) {
	// 	window.applicationCache.swapCache();
	// }
	// window.applicationCache.addEventListener('updateready',
	// 	updateSite, false);
window.onresize = function() {
	var img = document.getElementById('image_scr');
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(width<height)
	{
		img.width = width;
		img.height = (120/160)*width;
	}
	else
	{
		img.height = height*0.8;
		img.width = (160/120)*height*0.8;
	}
}

window.onload = function() {
	var div = document.getElementById('mjpg');
	var img = document.createElement("img");
	img.src = "http://fishkingsin.no-ip.info/?action=stream";

	img.id = "image_scr";
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(width<height)
	{
		img.width = width;
		img.height = (120/160)*width;
	}
	else
	{
		img.height = height*0.8;
		img.width = (160/120)*height*0.8;
	}
	//but feel free to raise it up to 8. Your client will appreciate
	//that the program makes full use of his machine.
	var ul = document.createElement("div");
	var li = document.createElement("div");
	li.appendChild(img);
	ul.appendChild(li);
	
	// div.appendChild(img);
	var button = document.createElement("button");
	// button.id = "overlay";
	button.innerHTML = "Reload"
	button.onclick = function (){
		location.reload();
		console.log("button click");
	};
	li = document.createElement("div");
	li.appendChild(button);
	ul.appendChild(li);
	div.appendChild(ul);
}