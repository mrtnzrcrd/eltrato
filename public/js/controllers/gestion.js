'use strict';

angular.module('elTrato.gestion').controller('GestionController', ['$scope', '$routeParams', '$rootScope', '$location', 'Global', 'geolocation', 'misAnuncios',
    function ($scope, $routeParams, $rootScope, $location, Global, geolocation, misAnuncios) {
        $scope.global = Global;

        $scope.nombre = Global.user.name;
        $scope.selection = "cuenta";
        $scope.isCollapsed1 = true;
        $scope.isCollapsed2 = true;
        $scope.isCollapsed3 = true;

        $scope.cambiarTab = function (event) {
           event.preventDefault();
                var idTab = event.currentTarget.attributes.href.nodeValue;
                $scope.selection = idTab;
            switch(idTab)
            {
                case "tratos":
                    console.log("tratos");
                    console.log(Global.user._id);
                    misAnuncios.query2({
                        usuarioId: Global.user._id
                    }, function (anuncio) {

                        $scope.anuncios = anuncio;
                    });
                    break;
                case "mensajes":
                    console.log("mensajes");
                    break
                case "favoritos":
                    console.log("favoritos");
                    break;
                default:
                    console.log("");
            }
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