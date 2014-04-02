'use strict';

angular.module('elTrato.mensajes').controller('MensajesController', ['$scope', '$routeParams', '$rootScope', '$location', 'Global',
    function ($scope, $routeParams, $rootScope, $location, Global) {
        $scope.global = Global;

        $scope.nombre = Global.user.name;

        $scope.isCollapsed1 = true;
        $scope.isCollapsed2 = true;
        $scope.isCollapsed3 = true;

        $scope.cambiarTab = function (event) {
           event.preventDefault();
            var objectActive = angular.element(document.querySelector(".tab-pane.active"));
            objectActive.removeClass("active");
            var idTab = event.currentTarget.attributes.href.nodeValue;
            var objectTab = angular.element(document.querySelector(idTab));
            objectTab.addClass("active");
        };

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