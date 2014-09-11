magicMirror.domoticz = function() {

	"use strict";

	function updateDomoticz() {
		$.getJSON('/domoticz-heat_speech-php/getLocalTemp.php', {}, function(json) {
			var t = '??';
			if (json && json.Temp)
				t = json.Temp + '&deg;';
			$('#localtemp').updateWithText(t, 1000);
		});
	}

	return {
		'updateDomoticz':		updateDomoticz
	};

}();

