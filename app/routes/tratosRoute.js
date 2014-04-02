/**
 * Created by Victor-BookPro on 02/04/14.
 */

'use strict';

// Tratos routes use tratos controller
var trato = require('../controllers/tratoCtrlServer');
//authorization = require('./middlewares/authorization');

// Anuncio authorization helpers
/*var hasAuthorization = function(req, res, next) {
 if (req.anuncio.user.id !== req.user.id) {
 return res.send(401, 'User is not authorized');
 }
 next();
 };*/

module.exports = function(app) {

    app.post('/trato', trato.create);

    app.get('/mirarTratos', trato.find);
    app.get('/mirarTratoEnviado', trato.findTratoEnviado);

    // Finish with setting up the anuncioId param
    //app.param('tratoId', trato.anuncio);

};