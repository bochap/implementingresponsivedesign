<html>
<head>
	<title>Geolocation</title>
	<meta name="viewport" content="width=device-width" />
	<style type="text/css">
	#arrow{
		display: block;
		font-size: 80px;
		font-weight: bold;
		height: 80px;
		width: 80px;
	}
	</style>
</head>
<body>
	<h1>Testing the geolocation API.</h1>
	<span id="arrow">&#8593;</span>
	<div id="results">
		

	</div>
	<script type="text/javascript">
		var results = document.getElementById('results');
		//lambeau field location
		var lambeau = {
			'lat' : 44.5013805,
			'long' : -88.062325
		}

		//creative commons distance function
		function calculateDistance(lat1, lon1, lat2, lon2) {
			var R = 3959; // miles
			var dLat = (lat2 - lat1).toRad();
			var dLon = (lon2 - lon1).toRad(); 
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			      Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
			var d = R * c;
			return d;
		}
		function calculateBearing(lat1, lon1, lat2, lon2) {
			return Math.atan2(
				Math.sin(lon2 - lon1) * Math.cos(lat2),
				Math.cos(lat1) * Math.sin(lat2) -
				Math.sin(lat1) * Math.cos(lat2) *
				Math.cos(lon2 - lon1)
			) * 180 / Math.PI;
		}
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		}
		//check for support
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				results.innerHTML += "<p>Only " + calculateDistance(pos.coords.latitude, pos.coords.longitude, lambeau.lat, lambeau.long) + " miles from hallowed Lambeau Field.</p>";
				var bearing = calculateBearing(pos.coords.latitude, pos.coords.longitude, lambeau.lat, lambeau.long);
				var arrow = document.getElementById('arrow');
				arrow.style.transform = 'rotateZ(' + bearing + 'deg)';
				arrow.style.msTransform = 'rotateZ(' + bearing + 'deg)';
				arrow.style.mozTransform = 'rotateZ(' + bearing + 'deg)';
				arrow.style.oTransform = 'rotateZ(' + bearing + 'deg)';
				arrow.style.webkitTransform = 'rotateZ(' + bearing + 'deg)';
			}, function(error) {
				//ruh roh!
				alert('Whoops! Error code: ' + error.code);
			});
		}
	</script>
	<script>document.write('<script src="http://10.10.1.155:35729/livereload.js?snipver=1"></' + 'script>')</script>
</body>
</html>