// const
var index = "http://127.0.0.1:8080/";

// ---

function GetSearchResult() {
	$('#submit').click(function(){
		var searchString = $('#search-string').val();
		var request = '{\"controller\":\"search\",\"entity\":{\"search\":"'+searchString+'\"}}';
		
        $.ajax({
            type: "POST",
	        url: index,
	        data: request,
            success: function(html) {
            	if (html.controller == "search")
            	{
	            	var appendstring;
	            	var i;
	            	for (i = 0; i < html.entity.search_results_array.length; ++i) {
		            	appendstring = '<li class=\"result-item\">' 
		            				 	+ '<div class=\"lib-logo\">' 
		            				 		+ '<a href=\"' + html.entity.search_results_array[i].library_link + '\">'
		            				 		+ '<img src=\"' + html.entity.search_results_array[i].library_avatar + '\">' 
		            				 		+ '</a>'
		            					+ '</div>'
		            					+ '<div class=\"lib-description\">'
		            						+ '<h3>'
		            						+ '<a class=\"lib-description\" href=\"' + html.entity.search_results_array[i].library_link + '\">'
		            						+ html.entity.search_results_array[i].library_name
		            						+ '</a>'
		            						+ '</h3>'
		            						+ html.entity.search_results_array[i].description
		            					+ '</div>'
		            				+ '</li>';
		               	
		               	$(".top-popular-result").append(appendstring);
	            	}
	       		}
	       	}
	    });
	});
}

jQuery(function($) {
	GetSearchResult();
});