'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.anuncios',
    'geolocation', 'mean.signup']);

angular.module('mean.system', ['geolocation']);
angular.module('mean.anuncios', ['ui.map', 'ui.event']);
angular.module('mean.signup', ['ui.map', 'ui.event']);