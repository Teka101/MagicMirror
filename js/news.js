magicMirror.news = function () {

	"use strict";

	var news = [];
	var newsIndex = 0;

	function fetchNews() {
		$.getJSON('news.php', {}, function(json){
			var data = json.channel;
			news = [];
			for (var i in data.item) {
				var item = data.item[i];
				news.push(item.title);
			}
			});
	}

	function showNews() {
		var newsItem = news[newsIndex];
		$('#news').updateWithText(newsItem, 2000);

		newsIndex--;
		if (newsIndex < 0) newsIndex = news.length - 1;
	}

	return {
		'fetchNews':	fetchNews,
		'showNews':		showNews
	};

}();

