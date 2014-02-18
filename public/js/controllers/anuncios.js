'use strict';

angular.module('mean.anuncios').controller('AnunciosController', ['$scope', '$routeParams', '$location', 'Global', 'Anuncios', function ($scope, $routeParams, $location, Global, Anuncios) {
    $scope.global = Global;



    $scope.create = function() {
        console.log(this.descripcion);

        var anuncio = new Anuncios({
            descripcion: this.descripcion,
            precio: this.precio
        });

        anuncio.$save(function(response) {
            if (!response.errorTag) {
                $location.path('#!/anuncios/' + response._id);
            } else {
                $scope.alerts = [ { type: 'danger', title: 'Error al insertar el anuncio', msg: response.errorTag }];
                $scope.model = {precio : response.anuncio.precio};
                $scope.model = {descripcion : response.anuncio.descripcion};
            }
        });

        this.descripcion = '';
        this.tags = '';
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.remove = function(anuncio) {
        if (anuncio) {
            anuncio.$remove();

            for (var i in $scope.anuncios) {
                if ($scope.anuncios[i] === anuncio) {
                    $scope.anuncios.splice(i, 1);
                }
            }
        }
        else {
            $scope.anuncio.$remove();
            $location.path('anuncios');
        }
    };

    $scope.update = function() {
        var anuncio = $scope.anuncio;
        if (!anuncio.updated) {
            anuncio.updated = [];
        }
        anuncio.updated.push(new Date().getTime());

        anuncio.$update(function() {
            $location.path('anuncios/' + anuncio._id);
        });
    };

    $scope.find = function() {
        Anuncios.query(function(anuncios) {
            $scope.anuncios = anuncios;
        });
    };

    $scope.findOne = function() {
        Anuncios.get({
            anuncioId: $routeParams.anuncioId
        }, function(anuncio) {
            $scope.anuncio = anuncio;
        });
    };
}]);