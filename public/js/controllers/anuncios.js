'use strict';

angular.module('mean.anuncios').controller('AnunciosController', ['$scope', '$routeParams', '$location', 'Global', 'Anuncios', function ($scope, $routeParams, $location, Global, Anuncios) {
    $scope.global = Global;

    $scope.create = function() {
        var anuncio = new Anuncios({
            title: this.title,
            content: this.content
        });
        anuncio.$save(function(response) {
            $location.path('anuncios/' + response._id);
        });

        this.title = '';
        this.content = '';
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