'use strict';

angular.module('elTrato', ['ngCookies', 'ngResource','ngRoute', 'ui.bootstrap', 'ui.route', 'elTrato.system', 'elTrato.anuncios',
    'geolocation', 'elTrato.signup', 'elTrato.gestion', 'elTrato.mensajes', 'elTrato.cuenta' , 'elTrato.geocoder', 'elTrato.fancybox', 'elTrato.toaster']);

angular.module('elTrato.system', ['geolocation', 'angularMoment']);
angular.module('elTrato.anuncios', ['ui.map', 'ui.event']);
angular.module('elTrato.signup', ['ui.map', 'ui.event']);
angular.module('elTrato.gestion', ['ngAnimate']);
angular.module('elTrato.cuenta', []);
angular.module('elTrato.mensajes', []);
angular.module('elTrato.geocoder', ['ngStorage']);
angular.module('elTrato.fancybox', []);
angular.module('elTrato.fancybox', []);
angular.module('elTrato.toaster', ['ngAnimate']);