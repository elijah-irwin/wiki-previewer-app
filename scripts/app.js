$(document).ready(function() {
	
	$("#search-btn").click(function() {
		var searchTerm = $("#search").val();
		var wikiURL = "https://en.wikipedia.org/w/api.php";
		
		emptyContainer();
		
		wikiURL += '?' + $.param({
			'action' : 'opensearch',
			'search' : searchTerm,
			'prop'  : 'revisions',
			'rvprop' : 'content',
			'format' : 'json',
			'limit' : 10
		});

	 	$.ajax({
			url: wikiURL,
		 	dataType: 'jsonp',
		 	success: function(data) {
				if(data[1][0]) $(".container").append("<div class='notifbox'><p class='notif'>Click on a result for more information...</p></div>").hide().fadeIn(500);
				for(var i = 0; i < 10; i++) {
					if(!data[1][i]) {
						$(".container").append("<p class='error'>No more results.<br>Try a new search term!</p>").hide().fadeIn(500);
						break; 
					} else {
						$(".container").append("<div class='wiki-content'><a href=" + data[3][i] + "><p class='top'>" + data[1][i] + "</p><p class='bot'>" + data[2][i] + "</p></a></div>").hide().fadeIn(500);
						if(!data[2][i]) {
							$(".bot").remove();
							$(".wiki-content").append("<p class='bot'>There doesn't seem to be a description for this item. Click for more info!</p>").hide().fadeIn(500);
						}
					}
				}
		 	}
		});
		$("#search").val("");
	});
	
	$("a").click(function() {
		console.log($(this).attr("href"));
	});
	
	$("#random").click(function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});
	
	function emptyContainer() {
		$(".wiki-content").remove();
		$(".notifbox").remove();
		$(".error").remove();
	}
});