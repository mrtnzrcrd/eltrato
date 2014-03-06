'use strict';

angular.module('elTrato', ['ngCookies', 'ngResource','ngRoute', 'ui.bootstrap', 'ui.route', 'elTrato.system', 'elTrato.anuncios',
    'geolocation', 'elTrato.signup', 'elTrato.gestion', 'elTrato.mensajes', 'elTrato.cuenta' , 'elTrato.geocoder']);

angular.module('elTrato.system', ['geolocation']);
angular.module('elTrato.anuncios', ['ui.map', 'ui.event']);
angular.module('elTrato.signup', ['ui.map', 'ui.event']);
angular.module('elTrato.gestion', ['ngAnimate']);
angular.module('elTrato.cuenta', []);
angular.module('elTrato.mensajes', []);
angular.module('elTrato.geocoder', ['ngStorage']);