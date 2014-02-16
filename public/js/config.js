'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // Articles
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
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
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);