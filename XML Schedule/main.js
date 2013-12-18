var timeWidth;
$(function(){
	// Get the width of a 1 hour period
	tStamps = $('.timestamp > div');
	timeWidth = tStamps.first().outerWidth();
	$('.right-col').width(timeWidth * tStamps.length);
});

// Read the file on upload
function fileUpload(f) {	
	var reader = new FileReader();
	reader.onload = function(e) {
		processFile(reader.result);
	}
	reader.readAsText(f[0]);	
}

// Parse and extract data from the XML
function processFile(XML) {
	XML = $.parseXML(XML);
	var movies = [];
	$(XML).find('movie').each(function(i) {
		movies[i] = {};
		movies[i].actor = $(this).find("actor").text();
		movies[i].film = $(this).find("name").text();
		movies[i].start = $(this).find("start_time").text();
		movies[i].end = $(this).find("end_time").text();
	});
	displayMovies(movies);
}

function displayMovies(movies) {
	// Get the actors
	var actors = _.uniq(_.pluck(movies, "actor"));
	// For each actor, find their films and pass to next function
	_.each(actors, function(e) {
		var filteredMovies = _.filter(movies, function(m){ return m.actor == e; });
		byActor(e, filteredMovies)
	});
}

function byActor(actor, movies) {
	// Get the actor's row (channel)
	var row = $('.right-col .' + actor);
	row.find('div').remove(); // Remove no programme message
	$.each(movies, function(i, m) {
		// Append a film div
		el = $('<div>' + m.film + '</div>').appendTo(row);
		// Calculate and set position based on 24 hour clock
		var diff9 = (m.start - 900) / 100;
		var left = (Math.floor(diff9) + (diff9 % 1) * (100/60)) * (timeWidth);
		var diff = (m.end - m.start) / 100;
		var width =  (Math.floor(diff) + (diff % 1) * (100/60)) * (timeWidth) ;
		el.css({
			'width': width,
			'left': left
		});
	});	
}

// Delegated event on relevant items
$(document).on('click', '.right-col > div:not(.timestamp) > div:not(.default)', function(e) {
	// Get popup and set the text
	var popup = $('.popup');
	popup.find('#movie').text($(this).text());
	popup.show();
	popup.find('.close').click(function(){
		popup.hide();
	});
});