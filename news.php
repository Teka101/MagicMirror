<?php
	$url = 'http://www.20minutes.fr/rss/une.xml';
	$fileContents = file_get_contents($url);
	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	$fileContents = trim(str_replace('"', "'", $fileContents));
	$simpleXml = simplexml_load_string($fileContents);
	$json = json_encode($simpleXml);
	header('Content-type: application/json');
	echo $json;
?>
