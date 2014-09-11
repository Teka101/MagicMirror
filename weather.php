<?php
	$url = 'http://api.openweathermap.org/data/2.5/' . $_REQUEST['action']  . '?q=' . $_REQUEST['q'] . '&units=' . $_REQUEST['units'] . '&lang=' . $_REQUEST['lang'];
	echo file_get_contents($url);
?>
