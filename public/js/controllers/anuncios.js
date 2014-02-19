'use strict';

angular.module('mean.anuncios').controller('AnunciosController', ['$scope', '$routeParams', '$location', 'Global', 'Anuncios',
    function ($scope, $routeParams, $location, Global, Anuncios) {
        $scope.global = Global;
        var images = new Array();
        var contador = 1;
        $scope.fotoActivo = false;
        $scope.disponible1 = true;
        $scope.disponible2 = true;
        $scope.disponible3 = true;
        $scope.disponible4 = true;
        $scope.disponible5 = true;

        $scope.cambioImagen = function () {
            alert("OK");
        };

        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                if (contador != 6) {
                    if (contador === 1) {
                        $scope.image = args.image;
                        images.push(args.files);
                        $scope.disponible1 = false;
                    } else if (contador === 2) {
                        $scope.image2 = args.image;
                        images.push(args.files);
                        $scope.disponible2 = false;
                    } else if (contador === 3) {
                        $scope.image3 = args.image;
                        images.push(args.files);
                        $scope.disponible3 = false;
                    } else if (contador === 4) {
                        $scope.image4 = args.image;
                        images.push(args.files);
                        $scope.disponible4 = false;
                    } else if (contador === 5) {
                        $scope.image5 = args.image;
                        images.push(args.files);
                        $scope.disponible5 = false;
                        $scope.fotoActivo = true;
                    }
                    contador++;
                }
            });
        });

        $scope.create = function () {
            console.log(this.descripcion);

            var anuncio = new Anuncios({
                descripcion: this.descripcion,
                precio: this.precio,
                images: images
            });

            anuncio.$save(function (response) {
                if (!response.errorTag) {
                    $location.path('#!/anuncios/' + response._id);
                } else {
                    $scope.alerts = [
                        { type: 'danger', title: 'Error al insertar el anuncio', msg: response.errorTag }
                    ];
                    $scope.model = {precio: response.anuncio.precio};
                    $scope.model = {descripcion: response.anuncio.descripcion};
                }
            });

            this.descripcion = '';
            this.tags = '';
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.remove = function (anuncio) {
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

        $scope.update = function () {
            var anuncio = $scope.anuncio;
            if (!anuncio.updated) {
                anuncio.updated = [];
            }
            anuncio.updated.push(new Date().getTime());

            anuncio.$update(function () {
                $location.path('anuncios/' + anuncio._id);
            });
        };

        $scope.find = function () {
            Anuncios.query(function (anuncios) {
                $scope.anuncios = anuncios;
            });
        };

        $scope.findOne = function () {
            Anuncios.get({
                anuncioId: $routeParams.anuncioId
            }, function (anuncio) {
                $scope.anuncio = anuncio;
            });
        };
    }]);