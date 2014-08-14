magicMirror.calendar = (function() {

	var eventList = [];

	function updateCalendarData() {
		new ical_parser("calendar.php", function(cal) {
	    	events = cal.getEvents();
	    	eventList = [];

	    	for (var i in events) {
	    		var e = events[i];
	    		for (var key in e) {
	    			var value = e[key];
					var seperator = key.search(';');
					if (seperator >= 0) {
						var mainKey = key.substring(0,seperator);
						var subKey = key.substring(seperator+1);

						var dt;
						if (subKey === 'VALUE=DATE') {
							//date
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
						} else {
							//time
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
						}

						if (mainKey === 'DTSTART') e.startDate = dt;
						if (mainKey === 'DTEND') e.endDate = dt;
					}
	    		}

	    		var seconds, startDate;
	            if (e.startDate == undefined){
	                //some old events in Gmail Calendar is "start_date"
	                //FIXME: problems with Gmail's TimeZone
	        		seconds = moment(e.DTSTART).diff(moment(), 'seconds');
	                startDate = moment(e.DTSTART);
	            } else {
	        		seconds = moment(e.startDate).diff(moment(), 'seconds');
	                startDate = moment(e.startDate);
	            }

	    		//only add fututre events, days doesn't work, we need to check seconds
	    		if (seconds >= 0) {
	    			var time_string = (seconds <= 60*60*5 || seconds >= 60*60*24*2) ? moment(startDate).fromNow() : moment(startDate).calendar();
	        		eventList.push({ 'description': e.SUMMARY, 'seconds': seconds, 'days': time_string });
	    		}
	    	};
	    	eventList.sort(function(a, b) { return a.seconds-b.seconds; });
		});
	}

	function updateCalendar() {
		table = $('<table/>').addClass('xsmall').addClass('calendar-table');
		opacity = 1;

		for (var i in eventList) {
			var e = eventList[i];

			var row = $('<tr/>').css('opacity',opacity);
			row.append($('<td/>').html(e.description).addClass('description'));
			row.append($('<td/>').html(e.days).addClass('days dimmed'));
			table.append(row);

			opacity -= 1 / eventList.length;
		}

		$('.calendar').updateWithText(table, 1000);
	}

	return {
		'updateCalendar':		updateCalendar,
		'updateCalendarData':	updateCalendarData
	};

}());

