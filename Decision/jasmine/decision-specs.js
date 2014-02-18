describe("Decision should", function() {

  var data = [{
      "start": "A",
      "end": "B",
      "length": 5
    }, {
      "start": "B",
      "end": "C",
      "length": 4
    }, {
      "start": "C",
      "end": "D",
      "length": 7
    }, {
      "start": "D",
      "end": "C",
      "length": 8
    }, {
      "start": "D",
      "end": "E",
      "length": 6
    }, {
      "start": "A",
      "end": "D",
      "length": 5
    }, {
      "start": "C",
      "end": "E",
      "length": 2
    }, {
      "start": "E",
      "end": "B",
      "length": 3
    }, {
      "start": "A",
      "end": "E",
      "length": 7
    }]

  initData(data);

  describe("find distance for", function() {

    it("ABC", function() {
      expect(pathLength(["A","B","C"])).toEqual(9);
    });

    it("AD", function() {
      expect(pathLength(["A","D"])).toEqual(5);
    });

    it("ADC", function() {
      expect(pathLength(["A","D","C"])).toEqual(13);
    });

    it("AEBCD", function() {
      expect(pathLength(["A","E","B","C","D"])).toEqual(21);
    });

    it("AED", function() {
      expect(function(){  pathLength(["A","E","D"])  }).toThrow();
    });

  });

  describe("find shortest route for", function() {

    it("A to C", function() {
      expect(findShortestRoute("A","C")).toEqual(9);
    });

    it("B to B", function() {
      expect(findShortestRoute("B","B")).toEqual(9);
    });

  });

  describe("find number of routes for", function() {

    it("A to C with 4 junctions", function() {
      expect(findNumberOfRoutes("A","C",999,4,4)).toEqual(3);
    });
    
    it("C to C with < 4 junctions", function() {
      expect(findNumberOfRoutes("C","C",999,0,3)).toEqual(2);
    });

    it("C to C with length < 30", function() {
      expect(findNumberOfRoutes("C","C",29)).toEqual(9);
    });

  });

});