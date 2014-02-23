'use strict';

angular.module('elTrato.system').controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global',
    function ($scope, $rootScope, $location, Global) {
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

        $rootScope.location = $location;

        if ($rootScope.location.$$absUrl === "http://localhost:3000/#!/") {
            $scope.index = true;
        } else {
            $scope.index = false;
        }

        $scope.isCollapsed = false;
    }]);