jQuery.fn.updateWithText = function(text, speed1, speed2) {
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed1/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed1/2, function() {
				if (speed2) {
					$(this).fadeOut(speed2);
				}
			});
		});
	}
};

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

magicMirror.main = (function () {

	$(function() {
	    moment.lang(magicMirror.config.lang);

	    repeat(checkVersion, 3000);
		repeat(updateTime, 1000);
		repeat(updateCompliment, 30000);
		repeat(magicMirror.calendar.updateCalendarData, 60000);
		repeat(magicMirror.calendar.updateCalendar, 1000);
		repeat(magicMirror.news.fetchNews, 60000);
		repeat(magicMirror.news.showNews, 5500);
		repeat(magicMirror.weather.updateCurrentWeather, 60000);
		repeat(magicMirror.weather.updateWeatherForecast, 60000);

	});


	// util functions

	function repeat(func, interval) {
		func();
		setInterval(func, interval);
	}


	// reload after Git commit

	function checkVersion() {
		$.getJSON('githash.php', {}, function(json) {
			if (json) {
				if (json.gitHash !== gitHash) {
					window.location.reload();
					window.location.href = window.location.href;
				}
			}
		});
	}


	// time

	function updateTime() {
	    var now = moment();
	    var date = now.format('LLLL').split(' ',4);
	    date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">' + now.format('ss') + '</span>');
	}


	// compliments

	var lastCompliment = null;

	function updateCompliment() {
		var compliment = null;
		var compliments = magicMirror.config.compliments;
		while (compliment === lastCompliment) {
			compliment = Math.floor(Math.random()*compliments.length);
		}

		$('.compliment').updateWithText(compliments[compliment], 4000, 8000);

		lastCompliment = compliment;
	}

}());

