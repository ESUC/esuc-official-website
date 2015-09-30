/*$(document).ready(function(){
    $('.carousel').carousel({
      interval: 3000
    });
});*/
$(document).ready(function() {
	$('#myCarousel').carousel({
	interval: 10000
	})
    
    $('#myCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
    
    
});

