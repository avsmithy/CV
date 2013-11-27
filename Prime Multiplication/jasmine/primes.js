describe("Primes", function() {

  describe("if n is", function() {

    it("not entered", function() {
      expect(function(){  checkN()  }).toThrow();
      expect(function(){  checkN("")  }).toThrow();
      expect(function(){  checkN(" ")  }).toThrow();
    });

    it("is not an integer", function() {
      expect(function(){  checkN(3.14)  }).toThrow();
      expect(function(){  checkN("hello!")  }).toThrow();      
    });

    it("negative", function() {
      expect(function(){  checkN(-42)  }).toThrow();
    });

    it("entered correctly", function() {
      expect(function(){  checkN(13)  }).not.toThrow();
    });

  });

  describe("generating primes with input", function() {

    it("10", function() {
      expect(genPrimes(10)).toEqual( [2,3,5,7,11,13,17,19,23,29] );
    });

  });

});