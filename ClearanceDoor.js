$(function() {
	/* Stock checker */
	if ($('#productWrapper').length) { // If on product page
		console.log("Found #productWrapper");
		// Get JSON data
		$.get('?format=json-pretty').done(function(data){ 
          	console.log("Got JSON");
			var vari = data.item.variants; // Get all variants
			var stock;
			for (var i = 0; i < vari.length; i++) {
				stock =+ vari[i].qtyInStock; // Combine stock from all variants
			}
			if (stock == 1) { // Figure out which text to use
				var stockText = "1 available";
			} else if (stock > 1 && stock < 10) {
				var stockText = stock + " available";
			} else if (stock >= 10) {
				var stockText = "10 or more available";
			}
			console.log(stock + " in stock");
			// Add text to page
			if (stock) {
				$('.sqs-add-to-cart-button-wrapper').append('<div class="stock-text">' + stockText + '</div>');
			}
		}).fail(function(){
			console.log("GET Failed");
		});
	}    
	/* Mailchimp */
	if ($('#collection-51296bb2e4b0fd698ebf9301').length) { // If on homepage
		$('#home-form').appendTo($('#title-area')).fadeIn(); // Move to title area
	}	
	
  	/* Continue Shopping Link */
	if ($('#sqs-shopping-cart-wrapper').length) { // If on cart page
		checkoutInterval = setInterval(checkoutContinue, 500);
	}
});

function checkoutContinue() {
	if ($('#content .cart-container').length) {
		clearInterval(checkoutInterval);
		console.log("Checkout loaded");
		// Attach button
		$('.checkout').before("<div class='continue'><div class='continue-button'>Continue Shopping</div></div>");
		// On click ...
		$('.continue').click(function() {
          window.location.href = "/";
		});
	}
}