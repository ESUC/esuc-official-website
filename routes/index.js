module.exports = function(app) {

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

}