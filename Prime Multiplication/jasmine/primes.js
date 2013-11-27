describe("Primes", function() {

  var tenPrimes = [2,3,5,7,11,13,17,19,23,29];

  describe("if n is", function() {

    it("not entered", function() {
      expect(function(){  checkN()  }).toThrow();
      expect(function(){  checkN("")  }).toThrow();
      expect(function(){  checkN(" ")  }).toThrow();
      expect(function(){  checkN(undefined)  }).toThrow();
      expect(function(){  checkN(null)  }).toThrow();
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

  describe("checking primes numbers", function() {

    it("not a prime", function() {
      expect(isPrime(10, tenPrimes)).toEqual(false);
      expect(isPrime(12, tenPrimes)).toEqual(false);
      expect(isPrime(15, tenPrimes)).toEqual(false);
    });

    it("is a prime", function() {
      expect(isPrime(7, tenPrimes.slice(0, 3))).toEqual(true);
      expect(isPrime(23, tenPrimes.slice(0, 8))).toEqual(true);
    });

  });

  it("generating primes with input 10", function() {
    expect(genPrimes(10)).toEqual( tenPrimes );
  });

  it("generating prime table with input 30", function() {

    var primes = genPrimes(30);
    var table = multiplyTable(primes);
    expect(table[5][1]).toEqual(39);
    expect(table[5][5]).toEqual(169);
    expect(table[11][15]).toEqual(1961);

  });

});