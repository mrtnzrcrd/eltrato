'use strict';

/**
 * Generic require login routing middleware
 */
var signature = require( "cookie-signature"),
    prefix = "s:",
    users = require('../../controllers/usersCtrlServer'),
    config = require('../../../config/config');

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'Usuario no autorizado');
    }
    next();
};

/*exports.validateSession = function(req){
    var sessionID = req.cookies["connect.sid"];
    var real_sid = sessionID.replace( prefix, "" );
    real_sid = signature.unsign( real_sid, config.sessionSecret);
};*/