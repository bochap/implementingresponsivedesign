<html>
<head>
		<meta name="viewport" content="width=device-width" />
		<style type="text/css">
			#canvas{
				background: #eee;
				border: 1px solid #333;
			}
		</style>
</head>
<body>
	<video id="video" width="300" height="375" autoplay></video>
	<input id="camera" type="button" disabled="true" value="Take Photo"></input>
	<canvas id="still"  width="300" height="375"></canvas>
</body>

</html>



<script>
	navigator.getUserMedia({video: true}, function(stream) {
		var video = document.getElementById("video");
		var canvas = document.getElementById("still");
		var button = document.getElementById("camera");

		video.src = stream;
		button.disabled = false;
		button.onclick = function() {
			canvas.getContext("2d").drawImage(video, 0, 0);
			canvas.display ='';
		};
	}, function(err) { alert("there was an error " + err)});
</script>