'use strict';

angular.module('elTrato.system').controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global',
    function ($scope, $rootScope, $location, Global) {
        $scope.global = Global;

        $scope.elTrato = true;

        if (window.user) {
            $scope.lng = window.user.locs[0];
            $scope.lat = window.user.locs[1];

            $scope.$on('geo', function () {
                $scope.lng = $rootScope.lng;
                $scope.lat = $rootScope.lat;
                console.log('Cuando se activa la geo: ' + $scope.lng + ' ' + $scope.lat);
            });

            console.log('antes de mirar ubicacion: ' + $scope.lng + ' ' + $scope.lat);

            $scope.buscar = function () {
                if ($scope.q) {
                    var query = $scope.q.replace(/\s/g, "+");
                    var query2 = $scope.lng + '+' + $scope.lat;
                    //$location.path('busqueda/' + query);
                    var parameters = {search : query, geo : query2};
                    $rootScope.$broadcast('searcHeader', parameters);
                }
            };
        }

        $rootScope.location = $location;

        if ($rootScope.location.$$absUrl === "http://localhost:3000/signup" || $rootScope.location.$$absUrl === "http://localhost:3000/signin") {
            $scope.index = true;
            $scope.elTrato = false;
        } else {
            $scope.index = false;
        }

        $scope.isCollapsed = false;
    }]);