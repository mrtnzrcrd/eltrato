'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Anuncios',
        'link': 'anuncios'
        }, {
        'title': 'Crear nuevo anuncio',
        'link': 'anuncios/create'
    }];


    $scope.buscar = function () {
        console.log("$scope.q: " + $scope.q);
        var query = ($scope.q+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        console.log("query: " + query);
        $location.path('busqueda/' + query);
    };

    $scope.isCollapsed = false;
}]);