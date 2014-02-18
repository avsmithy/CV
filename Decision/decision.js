function Route(path, length) {

	this.path = path;
	if (length)
		this.pathLength = length;
	this.finished = false;

	this.getPath = function() {
		return this.path;
	}

	this.getLength = function() {
		if (this.pathLength) {
			return this.pathLength;
		} else {
			return pathLength(this.path);
		}
	}

	this.isFinished = function() {
		return this.finished;
	}

	this.setFinished = function() {
		this.finished = true;
	}

	this.addPoint = function(point) {
		this.path.push(point);
	}

	this.firstPoint = function() {
		return this.path[0];
	}

	this.lastPoint = function() {
		return _.last(this.path);
	}

	this.hasPoint = function(point) {  // Check if path contains a point exc. first and last
		if (this.path.slice(1,-1).indexOf(point) == -1) {
			return false;
		} else {
			return true
		}
	}

}

var DATA = [];
function initData(d) {
	_.each(d, function(r) {
		var path = [r.start, r.end];
		DATA.push(new Route(path, r.length));
	});
}

function pathLength(routeArr) { // Find length of a given path (with all intersections specified)

	var len = 0;
	
	for (i = 0; i < routeArr.length - 1; i++) { // Loop through route array

		edgeStart = routeArr[i]; // Get n and n+1 points
		edgeEnd = routeArr[i+1];
		var found = false;

		_.each(DATA, function(d){
			if (d.firstPoint() == edgeStart && d.lastPoint() == edgeEnd) { // Find matching path between n and n+1
				len += d.getLength();
				found = true;
			}
		});

		if (!found) { // If not path found between two points
			throw "NO SUCH ROUTE";
		}
	}

	return len;

}

function logR(routes) {
	if (routes.length) {
		_.each(routes, function(r) {
			console.log("Route: " + r.getPath() + ", length: " + r.getLength());
		});
	} else {
		console.log("Route: " + routes.getPath() + ", length: " + routes.getLength());
	}
	
}

function createRoutes(start, end, allowContinue) { // Function to seek all possible routes between a and b. This would be terrible for larger sets.	

	var routes = [];

	_.each(DATA, function(d) {
		if (d.firstPoint() == start)
			routes.push(new Route([d.firstPoint(), d.lastPoint()]));
	});		

	for (i = 0; i < 8; i++) { // Max 8 deep for that last test
		_.each(routes, function(r) {
			if (allowContinue) {
				routes = routes.concat(addPaths(r, end, true));
			} else {
				routes = routes.concat(addPaths(r, end));
			}

		});
	}

	// Now have all possible routes from start (inc. duplicates)

	// Filter to only those ending at end
	routes = _.filter(routes, function(r) { 
		return r.lastPoint() == end;
	});

	// Remove duplicates
	routes = _.uniq(routes, function(r) { 
		return r.getPath().join();
	}); 

	// logR(routes);

	return routes;

}

function addPaths(route, end, allowContinue) { // Searches another levels deeper for any possible connections

	var extendedRoutes = [];

	_.each(DATA, function(d) {

		if (d.firstPoint() == route.lastPoint() && route.isFinished() == false) {
			var nr = new Route(route.getPath().concat(d.lastPoint()));
			if (nr.lastPoint() == end && allowContinue == false)
				nr.setFinished();
			extendedRoutes.push(nr);
		}

	});

	return extendedRoutes;
}

function findNumberOfRoutes(start, end, maxlength, minjunc, maxjunc) { // Get all the routes and then filter based on params

	return _.filter(createRoutes(start, end, true), function(r) {

		if (minjunc != undefined) {
			var junctions = r.getPath().length - 1;
			return (junctions <= maxjunc && junctions >= minjunc);
		} else {
			return r.getLength() <= maxlength;
		}
		
	}).length;

}

function findShortestRoute(start, end) { // Get all routes between a and b, then get shortest

	return _.min(createRoutes(start, end), function(r) {
		return r.getLength(); // Sort by length
	}).getLength(); // Return length

}
