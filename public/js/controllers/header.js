'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Anuncios',
        'link': 'anuncios'
    }, {
        'title': 'Crear nuevo anuncio',
        'link': 'anuncios/create'
    }];
    
    $scope.isCollapsed = false;
}]);