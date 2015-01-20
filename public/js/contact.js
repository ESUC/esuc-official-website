$(document).ready(function() {


$( "#email-form" ).submit(function( event ) {
	  	// Stop form from submitting normally
	  	event.preventDefault();
		var $form = $( this ),	
	    	url = $form.attr( "action" );
	    	
	    	//email content
	    	var name = $form.find('#name').val(),
	    		email = $form.find('#email').val(),
	    		esubject = $form.find('#emailSubject').val(),
	    		econtent = $form.find('#emailContent').val();

	    	//reformat
	    	if (esubject=="")
	    		esubject="Untitled - ESUC Contact";
	    	else
	    		esubject= esubject + " - ESUC Contact";


	    	var email = {
	    		to: 'esuc.ucla@gmail.com',
	    		fromname: name,
	    		from: email,
	    		subject: esubject,
	    		text: econtent
	    	};

	 
		$.post( url, {"email": email}, function(data) {
		    if (data=="success") {
		    	//clear email content
		    	$form.find('#name').val("");
		    	$form.find('#email').val("");
		    	$form.find('#emailSubject').val("");
		    	$form.find('#emailContent').val("");

		    	$('#confirm-modal').modal('show');
		    }
		});
	});


});