magicMirror.weather = function() {

	"use strict";

	function addWeatherClass(elt, weather, small) {
		var iconTable = {
			'01d': 'wi-day-sunny',
			'02d': 'wi-day-cloudy',
			'03d': 'wi-cloudy',
			'04d': 'wi-cloudy-windy',
			'09d': 'wi-showers',
			'10d': 'wi-rain',
			'11d': 'wi-thunderstorm',
			'13d': 'wi-snow',
			'50d': 'wi-fog',
			'01n': 'wi-night-clear',
			'02n': 'wi-night-cloudy',
			'03n': 'wi-night-cloudy',
			'04n': 'wi-night-cloudy',
			'09n': 'wi-night-showers',
			'10n': 'wi-night-rain',
			'11n': 'wi-night-thunderstorm',
			'13n': 'wi-night-snow',
			'50n': 'wi-night-alt-cloudy-windy'
		};

		return elt.addClass('icon' + (!!small ? '-small' : '')).addClass('dimmed').addClass('wi').addClass(iconTable[weather.icon]);
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

	function round1Dec(x) {
		return Math.round(x * 10) / 10;
	}

	function updateCurrentWeather() {
		$.getJSON('http://api.openweathermap.org/data/2.5/weather', magicMirror.config.weatherParams, function(json) {
			var icon = addWeatherClass($('<span/>'), json.weather[0]);
			$('#temp').updateWithText(icon.outerHTML() + round1Dec(json.main.temp) + '&deg;', 1000);

			var now = new Date();
			var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0, 5);
			var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0, 5);

			var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(round1Dec(json.wind.speed));
			var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
			if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
				sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
			}

			$('#windsun').updateWithText(windString + ' ' + sunString, 1000);
		});
	}

	function updateWeatherForecast() {
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast', magicMirror.config.weatherParams, function(json) {

			var forecastData = {};

			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey  = forecast.dt_txt.substring(0, 10);

				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp': forecast.dt * 1000,
						'temp_min': forecast.main.temp,
						'temp_max': forecast.main.temp,
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
				var row = $('<tr />').css('opacity', opacity);

				row.append($('<td/>').addClass('day').html(moment.weekdaysShort(new Date(forecast.timestamp).getDay())));
				row.append($('<td/>').addClass('temp-min').html(round1Dec(forecast.temp_min)));
				row.append($('<td/>').addClass('temp-max').html(round1Dec(forecast.temp_max)));
				row.append($('<td/>').append(addWeatherClass($('<span/>'), forecast.weather, true)));

				forecastTable.append(row);
				opacity -= 0.155;
			}

			$('#forecast').updateWithText(forecastTable, 1000);
		});
	}

	return {
		'updateCurrentWeather':		updateCurrentWeather,
		'updateWeatherForecast':	updateWeatherForecast
	};

}();

