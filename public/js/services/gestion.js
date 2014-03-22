'use strict';

//Anuncios service used for anuncios REST endpoint
angular.module('elTrato.gestion').factory('misAnuncios', ['$resource', function($resource) {
    return $resource('/misanuncios/:anuncioId/:favoritos', {anuncioId: '@_id'}, {
        tratos: {method:'GET',params:{favoritos:false}, isArray:true},
        favoritos: {method:'GET',params:{favoritos:true}, isArray:true},
        delFavoritos: {method:'PUT',params:{tratoId:'@tratoId'}}
    });
}]);

angular.module('elTrato.gestion').factory('Anuncios', ['$resource', function($resource) {
    return $resource('anuncios/:anuncioId', {
        anuncioId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
/*
angular.module('elTrato.gestion').factory('misAnuncios', ['$resource', function($resource) {
    return $resource('misfavoritos', {}, {
        query: {method:'GET', isArray:true},
        delete: {method:'PUT', params:{anuncioId:'@anuncioId'}}
    });
}]);
*/