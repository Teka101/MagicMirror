<html>
<head>
	<title>Magic Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
	</script>
	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
</head>
<body>

	<div class="top left"><div id="date" class="small dimmed"></div><div id="time"></div><div id="calendar" class="xxsmall"></div></div>
	<div class="top right"><div id="windsun" class="small dimmed"></div><div id="temp" class="separator"></div><span class="icon dimmed wi wi-thermometer"> </span><span id="localtemp"></span><div id="forecast" class="small dimmed"></div></div>
	<div class="lower-third center-hor"><div id="compliment" class="light"></div></div>
	<div class="bottom center-hor"><div id="news" class="medium"></div></div>

	<script src="js/lib/jquery.min.js"></script>
	<script src="js/contrib/ical_parser.js"></script>
	<script src="js/lib/moment-with-langs.min.js"></script>
	<script>var magicMirror = {};</script><?php /* namespace for Magic Mirror */ ?>
	<script src="js/config.js"></script>
	<script src="js/calendar.js?nocache=<?php echo md5(microtime()) ?>"></script>
	<script src="js/domoticz.js?nocache=<?php echo md5(microtime()) ?>"></script>
	<script src="js/news.js?nocache=<?php echo md5(microtime()) ?>"></script>
	<script src="js/weather.js?nocache=<?php echo md5(microtime()) ?>"></script>
	<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>

</body>
</html>
