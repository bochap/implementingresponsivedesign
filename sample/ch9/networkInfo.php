<html>
<head>
	<title>Navigator.connection</title>
	<meta name="viewport" content="width=device-width" />
	<style type="text/css">
		#results{
			border: 1px solid #ccc;
			padding: 1em;
			min-height: 100px;
		}
	</style>
</head>
<body>
	<p>Testing the navigator.connection information available through the Network Information API.</p>
	<img src="http://1.resource-cgi-hr.appspot.com/?type=gif&sleep=4" alt="">
	<div id="results">
		

	</div>
	<script type="text/javascript">
		var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
		var results = document.getElementById('results');
		results.innerHTML = "Bandwidth: " + connection.bandwidth + "<br/>";
		results.innerHTML += "Metered: " + connection.metered + "<br/>";
		results.innerHTML += "Type: " + connection.type;

	</script>
	<script>document.write('<script src="http://10.10.1.155:35729/livereload.js?snipver=1"></' + 'script>')</script>
</body>
</html>