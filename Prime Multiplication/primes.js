function checkN(n) {	

	if (n !== parseInt(n)) // Checks for non integers
		throw new Error("n must be an integer") 
	
	if (n < 1)  // If n negative
		throw new Error("n must be greater than or equal to 1");

	return true;		
}

function isPrime(a, primeArray) {

	for (j = 0; j < primeArray.length; j++) {  // Loop over prime numbers up to a
		if (a % primeArray[j] === 0)  // If divisible, not a prime
			return false;
	}

	return true;
}

function genPrimes(n) {

	var primeArray = []; // Array to store primes
	var i = 2; // First prime is 2

	while (primeArray.length < n) { // Until we have enough primes

		if (isPrime(i, primeArray))
			primeArray.push(i); // Add to array if a prime
		i++;
		
	} 

	return primeArray;		
}

function multiplyTable(numbers) {
	
	// 2d array (actually an array of arrays)
	var table = [];
	table[0] = numbers; // Set first row to number array

	for (i = 1; i < numbers.length; i++) {
	
		table[i] = [numbers[i]]; // Make first col number array
	
		for (j = 1; j < numbers.length; j++) {		

			table[i][j] = numbers[i] * numbers[j]; // Multiply numbers

		}

	}

	return table;
}

function displayTable(table) {

	var el = $('<table></table>').appendTo('body'); // Add a table
	
	$.each(table, function(i, row) { // Loop through rows
		
		var tr = $('<tr></tr>').appendTo(el); // Add a row to table

		$.each(row, function(i, result) {				
			tr.append('<td>' + result + '</td>'); // Add results to row
		});

	});

}