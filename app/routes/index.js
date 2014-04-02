'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/indexCtrlServer');
    app.get('/', index.render);

};
