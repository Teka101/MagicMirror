magicMirror.domoticz = function() {

	"use strict";

	function round1Dec(x) {
		return Math.round(x * 10) / 10;
	}


	function updateDomoticz() {
		$.getJSON('/domoticz-heat_speech-php/getLocalTemp.php', {}, function(json) {
			var t = '??';
			if (json && json.Temp)
				t = round1Dec(json.Temp) + '&deg;';
			$('#localtemp').updateWithText(t, 1000);
		});
	}

	return {
		'updateDomoticz':		updateDomoticz
	};

}();

