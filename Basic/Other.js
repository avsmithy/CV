jQuery(document).ready(function($) {
   
/* 
   --Nav-- 
   Folder hrefs need to be url slug of title, 
   they will then redirect to first page in folder
*/
   
   $('.primary-nav .folder-wrapper > a').each(function(index) {
     var str = $(this).text();
     str = str.replace(/[^a-zA-Z0-9\s]/g,"");
     str = str.toLowerCase();
     str = str.replace(/\s/g,'-');
     $(this).attr('href', "/" + str);
   });
   $('.primary-nav .folder-wrapper ul li:first-child').hide();  
   
	/* Success Stories */
	if ($('#collection-517c0e2ee4b0d5eb59dbe3c1').length > 0) {
		slider = $('#success-slider');

		$('#content .video-block').each(function(){
			jsonData = $.parseJSON($(this).attr('data-block-json'));
			slider.append(
				'<div>'
				+ '<h3>' + jsonData.title + '</h3>'
				+ '<img class="rsImg" data-rsvideo="' + jsonData.url + '" src="' + jsonData.thumbnailUrl +  '">'
				+ '<p>' + jsonData.description + '</p>'
				+ '</div>'
			);
			$(this).remove();
		});
      
      $('#content .sqs-col-6 .spacer-block').remove(); 
      $('#content .col:empty').remove(); 
      $('#content .row:empty').remove();
      $('#success-slider').show();      

        $("#success-slider").royalSlider({
          autoHeight: true,
          arrowsNavAutoHide: false,
          controlNavigation: 'bullets',
          controlsInside: false,
          imageScaleMode: 'none',
          imageAlignCenter: false,
          arrowsNavHideOnTouch: true,
          loop: true,
          loopRewind: true,
          numImagesToPreload: 6,
          keyboardNavEnabled: true
		});
      
      setTimeout(function(){
	      $('#success-slider').data('royalSlider').playVideo();
      }, 3000);
      
    }
   
   /* Slider - only on homepage */
   if ($('#collection-517c0cf1e4b065cfbf5fb7ea').length > 0) {
     
     $.getJSON('/home-data?format=json', function(data) {
       slider = $('#slider');
       $.each(data.items, function(index, value) {
         console.log(value);
         var cat = value.categories;
         var image = value.assetUrl;
         var title = value.title;
         var text = $(value.body).text();
         slider.append(slideConstructor(image, title, text, cat));         
       });
     
     
       $('#header .primary-image').remove();
       $('#header #logo').replaceWith($('#home-banner'));
     
        $('#slider').royalSlider({
          keyboardNavEnabled: true,
          imageScaleMode: 'none',
          controlNavigation: 'bullets',
          controlNavigationSpacing: 0,
          arrowsNav: false,
          autoPlay: {
              enabled: true,
              delay: 9000
          },
          loop: true,
          transitionType:'move',
          imgWidth: 1280,
          imgHeight: 440
        });         	
       
    });  
   }
   
   if (  /* FAQs & Student Resources */
       $('#collection-517c0e85e4b0f470ac8c8b5b').length > 0 
      ||
       $('#collection-517c0dade4b02921d708c0a5').length > 0 
       ) {
		$('.summary-block .summary-item .summary-content').each(function(){
			var itemX = $(this);
            $('.timestamp', this).remove();
			$.ajax({
				url: $('a', this).attr('href') + '?format=json',
				datatype: 'json',
				async: false
			}).done(function(data) {
			  		itemX.append(data.item.body);
			});
		})
	   $(".summary-block .summary-item-list").accordion({
	   		header: ".summary-title",
	    	heightStyle: "content",
	    	collapsible: true,
	    	active: false
	    });
	}
   
   if ( /* Footer Pages - Replace Logo */
       $('#collection-517c0dade4b02921d708c0a5').length > 0 
      ||
       $('#collection-517c0d92e4b0d7e92bf14a0c').length > 0 
      ||
       $('#collection-517c0c17e4b0f470ac8c8150').length > 0 
      ||
       $('#collection-517c0dc7e4b065cfbf5fb9db').length > 0 
       ) {
			$('#logo a img').attr('src', 'https://static.squarespace.com/static/517c0c17e4b0f470ac8c8145/518047d4e4b01333da013caf/518bf389e4b0bd880334f78c/1368126362813/logo_slider_colour_tiny.png?format=500w'
                                 );
	}
   
   if ($('#collection-517c0d92e4b0d7e92bf14a0c').length > 0) {
     $('#content').prepend("<h1>The BASIC Blog</h1>");
     $('h1.post-title').wrapInner('<h2 class="post-title" />').children().unwrap();
   }
   
});
  
function slideConstructor(image, title, text, cat) {
  var CSSClass;
  if (cat) {
    CSSClass = "rsContent white-bg";
  } else {
    CSSClass = "rsContent";
  }
  var slide = 
  '<div class="' + CSSClass + '"> ' +
      '<a class="rsImg" href="' + image + '"></a>' +
      '<div class="rsBlock">' + 
        '<p class="rsQuote">' + text + '</p>' + 
        '<p class="rsCTA">' + title + '</p>' + 
      '</div>' +
   '</div>';
  
  return slide;
}
