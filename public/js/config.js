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
        when('/cuenta', {
            templateUrl: 'views/usuarios/cuenta.html'
        }).
        when('/gestion', {
            templateUrl: 'views/usuarios/gestion.html'
        }).
        when('/mensajes', {
            templateUrl: 'views/usuarios/mensajes.html'
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

/*angular.module('elTrato').config(function($httpProvider) {

    $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
            'request': function(config) {
                $rootScope.$broadcast('loading-started');
                return config || $q.when(config);
            },
            'response': function(response) {
                $rootScope.$broadcast('loading-complete');
                return response || $q.when(response);
            }
        };
    });

});*/