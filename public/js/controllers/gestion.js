'use strict';

angular.module('elTrato.gestion').controller('GestionController', ['$scope', '$routeParams', '$rootScope', '$location', 'Global', 'geolocation',
    function ($scope, $routeParams, $rootScope, $location, Global, geolocation) {
        $scope.global = Global;

        $scope.nombre = Global.user.name;

        $scope.isCollapsed1 = true;
        $scope.isCollapsed2 = true;
        $scope.isCollapsed3 = true;


        /*
        $scope.find = function () {
            Usuarios.query(function (usuarios) {
                $scope.usuarios = usuarios;
            });
        };

        $scope.findOne = function () {
            Usuarios.get({
                usuarioId: $routeParams.usuarioId
            }, function (usuario) {
                $scope.usuario = usuario;
            });
        };
        */
    }]);