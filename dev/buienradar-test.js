$(function() {
	/**
	 * Geen idee hoe ik de var's uit buienradar.php laad dat weet jij vast wel
	 * ook molt dit onderstaande ding mijn graph.
	 * 
	 * /** Hier gaat de weersdata in
	 */
	var buien = "000|23:40 000|23:45 123|23:50 77|23:55 255|00:00 024|00:05 034|00:10 000|00:15 000|00:20 200|00:25 000|00:30 000|00:35 000|00:40 33|00:45 000|00:50 000|00:55";
	var buienArray = buien.split(" ");
	for (var i = 0; i < buienArray.length; i++) {
		buienArray[i] = buienArray[i].split("|");
	}
	var bui = [];
	for (var i = 0; i < buienArray.length; i++) {
		bui.push(buienArray[i][0]);
	}

	$('.inlinesparkline').sparkline(bui, {
		type : 'line',
		width : '80',
		height : '25',
		lineColor : '#adadad',
		fillColor : '#adadad',
		spotColor : undefined,
		minSpotColor : undefined,
		maxSpotColor : undefined,
		highlightSpotColor : undefined,
		chartRangeMin : 0,
		chartRangeMax : 255
	});
	/* ik krijg de spots er nog niet uit, geen idee waarom ze oranje blijven */

});
