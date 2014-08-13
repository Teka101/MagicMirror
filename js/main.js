jQuery.fn.updateWithText = function(text, speed) {
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
};

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp) {
	return Math.round(temp * 10) / 10;
}

function kmh2beaufort(kmh) {
	var speeds = [1, 5.5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}

function addWeatherClass(elt, weather, small) {
	var iconTable = {
		'01d':'wi-day-sunny',
		'02d':'wi-day-cloudy',
		'03d':'wi-cloudy',
		'04d':'wi-cloudy-windy',
		'09d':'wi-showers',
		'10d':'wi-rain',
		'11d':'wi-thunderstorm',
		'13d':'wi-snow',
		'50d':'wi-fog',
		'01n':'wi-night-clear',
		'02n':'wi-night-cloudy',
		'03n':'wi-night-cloudy',
		'04n':'wi-night-cloudy',
		'09n':'wi-night-showers',
		'10n':'wi-night-rain',
		'11n':'wi-night-thunderstorm',
		'13n':'wi-night-snow',
		'50n':'wi-night-alt-cloudy-windy'
	};

	return elt.addClass('icon' + (!!small ? '-small' : '')).addClass('dimmed').addClass('wi').addClass(iconTable[weather.icon]);
}


function repeat(func, interval) {
	func();
	setInterval(func, interval);
}

function checkVersion() {
	$.getJSON('githash.php', {}, function(json, textStatus) {
		if (json) {
			if (json.gitHash != gitHash) {
				window.location.reload();
				window.location.href = window.location.href;
			}
		}
	});
}

function updateTime() {
    var now = moment();
    var date = now.format('LLLL').split(' ',4);
    date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

	$('.date').html(date);
	$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">' + now.format('ss') + '</span>');
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

	$('.calendar').updateWithText(table,1000);
}

function updateCompliment() {
    //see compliments.js
	while (compliment == lastCompliment) {
		compliment = Math.floor(Math.random()*compliments.length);
	}

	$('.compliment').updateWithText(compliments[compliment], 4000);

	lastCompliment = compliment;
}

function updateCurrentWeather() {
	$.getJSON('http://api.openweathermap.org/data/2.5/weather', weatherParams, function(json, textStatus) {

		var temp = roundVal(json.main.temp);

		var wind = roundVal(json.wind.speed);

		var icon = addWeatherClass($('<span/>'), json.weather[0]);
		$('.temp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);

		var now = new Date();
		var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
		var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);

		var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(wind) ;
		var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
		if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
			sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
		}

		$('.windsun').updateWithText(windString+' '+sunString, 1000);
	});
}

function updateWeatherForecast() {
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast', weatherParams, function(json, textStatus) {

		var forecastData = {};

		for (var i in json.list) {
			var forecast = json.list[i];
			var dateKey  = forecast.dt_txt.substring(0, 10);

			if (forecastData[dateKey] == undefined) {
				forecastData[dateKey] = {
					'timestamp':forecast.dt * 1000,
					'temp_min':forecast.main.temp,
					'temp_max':forecast.main.temp,
					'weather': {}
				};
			} else {
				forecastData[dateKey]['temp_min'] = (forecast.main.temp < forecastData[dateKey]['temp_min']) ? forecast.main.temp : forecastData[dateKey]['temp_min'];
				forecastData[dateKey]['temp_max'] = (forecast.main.temp > forecastData[dateKey]['temp_max']) ? forecast.main.temp : forecastData[dateKey]['temp_max'];
				forecastData[dateKey]['weather'] = (forecast.weather[0] || forecastData[dateKey]['weather']);
			}
		}

		var forecastTable = $('<table />').addClass('forecast-table');
		var opacity = 1;
		for (var i in forecastData) {
			var forecast = forecastData[i];
			var dt = new Date(forecast.timestamp);
			var row = $('<tr />').css('opacity', opacity);
	
			row.append($('<td/>').addClass('day').html(moment.weekdaysShort(dt.getDay())));
			row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)));
			row.append($('<td/>').addClass('temp-min').html(roundVal(forecast.temp_min)));
			row.append($('<td/>').append(addWeatherClass($('<span/>'), forecast.weather, true)));
	
			forecastTable.append(row);
			opacity -= 0.155;
		}

		$('.forecast').updateWithText(forecastTable, 1000);
	});
}

var eventList = [];

var news = [];
var newsIndex = 0;

var lastCompliment;
var compliment;

function fetchNews() {
	$.feedToJson({
		feed:'http://feeds.nos.nl/nosjournaal?format=rss',
		//feed:'http://www.nu.nl/feeds/rss/achterklap.rss',
		//feed:'http://www.nu.nl/feeds/rss/opmerkelijk.rss',
		success: function(data){
			news = [];
			for (var i in data.item) {
				var item = data.item[i];
				news.push(item.title);
			}
		}
	});
}

function showNews() {
	var newsItem = news[newsIndex];
	$('.news').updateWithText(newsItem, 2000);

	newsIndex--;
	if (newsIndex < 0) newsIndex = news.length - 1;
}

$(function() {
    moment.lang(lang);

	repeat(checkVersion, 3000);
	repeat(updateTime, 1000);

	(function updateCalendarData() {
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
						if (subKey == 'VALUE=DATE') {
							//date
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
						} else {
							//time
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
						}

						if (mainKey == 'DTSTART') e.startDate = dt;
						if (mainKey == 'DTEND') e.endDate = dt;
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

        	setTimeout(function() {
        		updateCalendarData();
        	}, 60000);
    	});
	})();

	repeat(updateCalendar, 1000);
	repeat(updateCompliment, 30000);
	repeat(updateCurrentWeather, 60000);
	repeat(fetchNews, 60000);
	repeat(showNews, 5500);
	repeat(updateWeatherForecast, 60000);

});
