'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    validator = require('validator');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('users/signin', {
            title: 'Signin',
            message: req.flash('error')
        });
    }
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('users/signup', {
            title: 'Sign up',
            user: new User()
        });
    }
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;
    var longitude = parseFloat(req.body.lng);
    var latitude = parseFloat(req.body.lat);

    console.log('Con parseFloat --> longitude: ' + longitude + ' latitude: ' + latitude);
    console.log('Sin parseFloat --> longitude: ' + req.body.lng + ' latitude: ' + req.body.lat);


    user.locs.push(longitude);
    user.locs.push(latitude);

    console.log(user.email);

    var email = validator.isEmail(user.email);

    console.log(email);

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'El nombre de usuario ya existe. ';
                    break;
                default:
                    message = 'Por favor, rellena todos los campos.';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};