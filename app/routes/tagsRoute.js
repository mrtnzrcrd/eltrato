/**
 * Created by Victor-BookPro on 07/04/14.
 */

'use strict';

// Tratos routes use tratos controller
var tag = require('../controllers/tagsCtrlServer'),
    authorization = require('./middlewares/authorization');

// Anuncio authorization helpers
/*var hasAuthorization = function(req, res, next) {
 if (req.anuncio.user.id !== req.user.id) {
 return res.send(401, 'User is not authorized');
 }
 next();
 };*/

module.exports = function (app) {

    app.get('/searchTag', tag.searchTag);

    // Finish with setting up the anuncioId param
    //app.param('tratoId', trato.anuncio);

};