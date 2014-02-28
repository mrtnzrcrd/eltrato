'use strict';

// Anuncios routes use anuncios controller
var anuncios = require('../controllers/anuncios');
var authorization = require('./middlewares/authorization');

// Anuncio authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.anuncio.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/anuncios', anuncios.all);
    app.post('/anuncios', authorization.requiresLogin, anuncios.create);
    app.get('/anuncios/:anuncioId', anuncios.show);
    app.put('/anuncios/:anuncioId', authorization.requiresLogin, hasAuthorization, anuncios.update);
    app.del('/anuncios/:anuncioId', authorization.requiresLogin, hasAuthorization, anuncios.destroy);

    app.get('/busqueda/:q', anuncios.find);

    app.post('/geo', anuncios.geoLocation);

    app.post('/upload', anuncios.upload);

    // Finish with setting up the anuncioId param
    app.param('anuncioId', anuncios.anuncio);

};