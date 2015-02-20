module.exports = function(app, sendgrid) {

	app.get('/',function(req,res) {
		res.render('index');
	});

	app.get('/about',function(req,res) {
		res.render('about');
	});

	app.get('/lounge-calendar',function(req,res) {
		res.render('lounge-calendar');
	});

	app.get('/engineering-calendar',function(req,res) {
		res.render('engineering-calendar');
	});

	app.get('/reservation',function(req,res) {
		res.render('reservation');
	});

	app.get('/major-events',function(req,res) {
		res.render('major-events');
	});

	app.get('/events',function(req,res) {
		res.render('events');
	});

	app.get('/officers',function(req,res) {
		res.render('officers');
	});

	app.get('/our-sponsors',function(req,res) {
		res.render('our-sponsors');
	});

	app.get('/co-host',function(req,res) {
		res.render('co-host');
	});

	app.get('/donate',function(req,res) {
		res.render('donate');
	});


	app.get('/contact',function(req,res) {
		res.render('contact');
	});

	app.get('/eweek',function(req,res) {
		res.render('eweek15/index');
	});

	app.post('/email',  function(req, res) {
        if (typeof req.body.email === "undefined") {
            res.redirect("/");
            return;
        }

        var email = new sendgrid.Email(req.body.email);
        sendgrid.send(email, function(err, json) {
          if (err) { return console.error(err); }
          console.log(json);
          res.send('success');
        });
    });
}