'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Anuncio = mongoose.model('Anuncio'),
    _ = require('lodash');


/**
 * Find anuncio by id
 */
exports.anuncio = function (req, res, next, id) {
    Anuncio.load(id, function (err, anuncio) {
        if (err) return next(err);
        if (!anuncio) return next(new Error('Failed to load anuncio ' + id));
        req.anuncio = anuncio;
        next();
    });
};

/**
 * Create a anuncio
 */
exports.create = function (req, res) {
    var anuncio = new Anuncio(req.body);
    anuncio.user = req.user;

    // Metodo para coger todos los #Hastags y guardarlos en una array
    var tempArrayTags = new Array();
    var descripcion = anuncio.descripcion.split(" ");
    var descripcion2 = anuncio.descripcion.split(" ");
    var contador = 0;
    for (var i = 0; i < descripcion.length; i++) {
        var tag = descripcion[i];
        var hastag = tag.charAt(0);
        if (hastag == '#') {
            tag = tag.substring(1, tag.length);
            tempArrayTags[contador] = tag;
            descripcion2.splice(tag, 1);
            contador++;
        }
    }
    // Fin del metodo para guargar #Hastags

    anuncio.tags = tempArrayTags;

    anuncio.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                anuncio: anuncio
            });
        } else if (tempArrayTags.length === 0) {
            return res.jsonp({errorTag: 'Tiene que insertar al menos un #Hastag para poder insertar el anuncio', anuncio: anuncio});
        } else {
            res.jsonp(anuncio);
        }
    });
};

/**
 * Update a anuncio
 */
exports.update = function (req, res) {
    var anuncio = req.anuncio;

    anuncio = _.extend(anuncio, req.body);

    anuncio.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                anuncio: anuncio
            });
        } else {
            res.jsonp(anuncio);
        }
    });
};

/**
 * Delete an anuncio
 */
exports.destroy = function (req, res) {
    var anuncio = req.anuncio;

    anuncio.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                anuncio: anuncio
            });
        } else {
            res.jsonp(anuncio);
        }
    });
};

/**
 * Show an anuncio
 */
exports.show = function (req, res) {
    res.jsonp(req.anuncio);
};

/**
 * List of Anuncios
 */
exports.all = function (req, res) {
    Anuncio.find().sort('-created').populate('user', 'name username').exec(function (err, anuncios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(anuncios);
        }
    });
};