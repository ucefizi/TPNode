module.exports = function(app, passport){

	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/show',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/login',isLoggedIn , function(req, res){
		res.render('profile.ejs', {user: req.user});
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/show',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/signup',isLoggedIn , function(req, res){
		res.render('profile.ejs', {user: req.user});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/show', isLoggedIn , function(req, res){
		res.render('profile.ejs', {user: req.user});
	});

	app.get('/start', function(req, res){
		res.render('index.ejs');
	});

};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}