function checkN(n) {	
	
	if (!n) { // Also checks for empty string
		throw new Error("n must exist") 
	}		 

	if ((n % 1) != 0) { // Checks for non integers and strings			
		throw new Error("n must be an integer") 
	}
	
	if (n < 1) { // If n negative or whitespace string
		throw new Error("n must be greater than or equal to 1");
	}

	return true;		
}

function genPrimes(n) {

	var primeArray = []; // Array to store primes
	var i = 1; // First prime is 2 (will be incre. at beginning of first loop)

	pf: do {	

		i++;
		for (j = 2; j < i; j++) { // Go through 2 -> number
			
			if ((i % j) == 0) { // If divisible (aka. not a prime)
				continue pf; // Skip the rest of this loop
			}

		}

		primeArray.push(i); // Add to array if a prime			

	} while (primeArray.length < n) // Until we have enough primes

	return primeArray;		
}

function multiplyTable(numbers) {
	
	// 2d array (actually an array of arrays)
	var table = [];
	table[0] = numbers; // Set first row to primes

	for (i = 1; i < numbers.length; i++) {
	
		table[i] = [numbers[i]]; // Make first col primes
	
		for (j = 1; j < numbers.length; j++) {		

			table[i][j] = numbers[i] * numbers[j]; // Multiply primes

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