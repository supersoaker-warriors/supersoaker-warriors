// load strategy
var localStrategy = require('passport-local').Strategy;
var mongoose require('mongoose');
// require user
var User = require('../Server/db.js');


// module.exports function for app.js

//passport session setup
//required for persistant login sessions
module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
};

//Local Sign-up strategy

	passport.use('local-signup', new localStrategy({
		usernameField: 'username',
		passwordField: 'password', 
		passReqToCallback: true
	}
	function(req, username, password, done){
			process.nextTick(function(){
				User.findOne({'local.username': username}, function(err, user){
					if (err){
						return done(err);
					}
					if (user){
						return done(null, false, {message: 'Incorrect username!'};)
					}
					else{
						var newUser = new User();
						newUser.local.username = username;
						newUser.local.password = newUser.generateHash(password);
						newUser.save(function(err){
							if(err){
								throw err;
								return done(null, newUser);
							}
						});
					}
				});
			});
		});
	)
	//Local Login Strategy

	passport.use('local-login', new localStrategy({
		usernameField: "username", 
		passwordField: 'password', 
		passReqToCallback: true
	}
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': username}, function(err, user){
				if (err){
					return done(err);
				}
				if (!user){
					return done(null, false, {message: 'username does not exist!'};)
				}
				
				if(!user.validPassword(password)){
					return done(null, false, {message: 'Wrong Password'})
				}
				
				return done(null, user);
			});
		});
	});
	);