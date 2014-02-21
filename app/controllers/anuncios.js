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

    console.log('Descripcion: ' + anuncio.descripcion);
    console.log('Precio: ' + anuncio.precio);

    console.log('Fotos: ' + anuncio.images.length);

    if (anuncio.descripcion === '' && anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar los campos descripción, precio y añadir como minimo una imagen para poder ' +
                'insertar tu anuncio, gracias.'});
    } else if (tempArrayTags.length === 0 && anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag, rellenar el campo precio y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo precio y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.precio === 0 && anuncio.descripcion === '') {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar los campos descripción y ' +
                'precio para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.descripcion === '' && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0 && anuncio.precio === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag y ' +
                'el campo precio para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.images.length === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tienes que añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tiene que insertar al menos un #Hastag para poder insertar el anuncio',
            anuncio: anuncio});
    } else if (anuncio.precio === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tienes que introducir un precio para poder insertar tu anuncio',
            anuncio: anuncio});
    } else {
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
    }

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

exports.find = function (req, res) {
    console.log("{ 'query': '" + req.params.q + "' }");
    var tagsParams =  req.params.q;
    tagsParams = tagsParams.split(" ");
    Anuncio.query({tags: { $in : tagsParams }}).sort('-created').populate('user', 'name username').exec(function (err, anuncio) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('Resultado: ' + anuncio);
            res.jsonp(anuncio);
        }
    });
};