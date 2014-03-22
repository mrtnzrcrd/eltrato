'use strict';

angular.module('elTrato.gestion').controller('GestionController', ['$scope', '$routeParams', '$rootScope', '$location', 'Global', 'geolocation', 'misAnuncios', 'Anuncios','$modal',
    function ($scope, $routeParams, $rootScope, $location, Global, geolocation, misAnuncios, Anuncios, $modal) {
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
                    misAnuncios.tratos(function (anuncio) {
                        $scope.anuncios = anuncio;
                    });
                    break;
                case "mensajes":
                    console.log("mensajes");
                    break
                case "favoritos":
                    console.log("favoritos");
                    misAnuncios.favoritos( function (anuncio) {
                        $scope.anuncios = anuncio;
                    });
                    break;
                default:
                    console.log("");
            }
        };

        $scope.remove = function (event, anuncio) {
            event.preventDefault();

            var anuncio1 = anuncio;

            var idAnuncio = event.currentTarget.attributes.href.nodeValue;
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    trato: function () {
                        return idAnuncio;
                    }
                }
            });

            modalInstance.result.then(function (respuesta) {
                console.log("Borrar anuncio: " + idAnuncio + " -->" + respuesta);
                for (var i in $scope.anuncios) {
                    if ($scope.anuncios[i]._id === idAnuncio) {
                        //$scope.anuncio = $scope.anuncios[i];
                        $scope.anuncios[i].$remove();
                        $scope.anuncios.splice(i, 1);
                    }
                }
/*
                Anuncios.delete({_id:idAnuncio},function(data){
                    console.log(data);
                });
*/
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance) {

            $scope.ok = function () {
                console.log("BORRAR");
                $modalInstance.close("OK");
            };

            $scope.cancel = function () {
                console.log("NO BORRAR");
                $modalInstance.dismiss('Cancelado');
            };
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