$(function() {
	/**
	 * Geen idee hoe ik de var's uit buienradar.php laad dat weet jij vast wel
	 * ook molt dit onderstaande ding mijn graph.
	 * 
	 * /** Hier gaat de weersdata in
	 */

	$.get('../buienradar.php', {}, function (buien) {
		var buienArray = $.trim(buien).split(/\s+/);
		for (var i = 0; i < buienArray.length; i++) {
			buienArray[i] = buienArray[i].split("|");
		}
		var bui = [];
		for (var i = 0; i < buienArray.length; i++) {
			bui.push(buienArray[i][0]);
		}

		$('.inlinesparkline').sparkline(bui, {
		    type: 'line',
		       lineColor: '#c6c6c6',
		       fillColor: '#c6c6c6',
		       spotColor: '#c6c6c6',
		       minSpotColor: '#c6c6c6',
		       maxSpotColor: '#c6c6c6',
		       highlightSpotColor: '#c6c6c6',
		       highlightLineColor: '#c6c6c6',
		       spotRadius: 0
		});
		/* ik krijg de spots er nog niet uit, geen idee waarom ze oranje blijven */
	}, 'text');

});

