'use strict';

//Articles service used for anuncios REST endpoint
angular.module('mean.anuncios').factory('Anuncios', ['$resource', function($resource) {
    return $resource('anuncios/:anuncioId', {
        anuncioId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);