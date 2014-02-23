'use strict';

//Setting up route
angular.module('elTrato').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // Anuncios
        when('/anuncios', {
            templateUrl: 'views/anuncios/list.html'
        }).
        when('/anuncios/create', {
            templateUrl: 'views/anuncios/create.html'
        }).
        when('/anuncios/:anuncioId/edit', {
            templateUrl: 'views/anuncios/edit.html'
        }).
        when('/anuncios/:anuncioId', {
            templateUrl: 'views/anuncios/view.html'
        }).
        when('/busqueda/:q', {
            templateUrl: 'views/anuncios/busqueda.html'
        }).
        when('/perfil', {
            templateUrl: 'views/usuarios/perfil.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('elTrato').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);