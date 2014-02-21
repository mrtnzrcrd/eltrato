'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$http', '$location', 'Global',
    function ($scope, $http, $location, Global) {
        $scope.global = Global;

        $scope.menu = [
            {
                'title': 'Anuncios',
                'link': 'anuncios'
            },
            {
                'title': 'Crear nuevo anuncio',
                'link': 'anuncios/create'
            }
        ];

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
           // var query = ($scope.q + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };

        $scope.isCollapsed = false;
    }]);