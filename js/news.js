magicMirror.news = function () {

	"use strict";

	var news = [];
	var newsIndex = 0;

	function fetchNews() {
		$.feedToJson({
			feed: 'http://feeds.nos.nl/nosjournaal?format=rss',
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
		$('#news').updateWithText(newsItem, 2000);

		newsIndex--;
		if (newsIndex < 0) newsIndex = news.length - 1;
	}

	return {
		'fetchNews':	fetchNews,
		'showNews':		showNews
	};

}();

