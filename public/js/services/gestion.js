'use strict';

//Anuncios service used for anuncios REST endpoint
angular.module('elTrato.gestion').factory('misAnuncios', ['$resource', function($resource) {
    return $resource('misanuncios/:usuarioId', {}, {
        query: {method:'GET', params:{usuarioId:'@usuarioId'}, isArray:true},
        query2: {method:'GET', params:{usuarioId:'@usuarioId'}, isArray:true}
    });
}]);