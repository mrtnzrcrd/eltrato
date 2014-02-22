'use strict';

angular.module('mean.anuncios').controller('AnunciosController', ['$scope', '$routeParams', '$rootScope', '$location', 'Global', 'Anuncios', 'Buscar', 'geolocation',
    function ($scope, $routeParams, $rootScope, $location, Global, Anuncios, Buscar, geolocation) {
        $scope.global = Global;

        // geoLocation
        $scope.alerts = [
            { type: 'info',
                title: 'Disfruta al maximo de elTrato.net',
                msg: 'Para poder disfrutar al máximo de elTrato.net necesitamos que permitas la geolocalización en tu navegador.' +
                    'Las ventajas seran maximas, automaticamente calcularemos los productos que están cerca de ti y lo mejor de todo' +
                    'es que solo lo tendrás que hacer una vez' }
        ];

        geolocation.getLocation().then(function (data) {
            $scope.alerts = [
                { type: 'success',
                    title: 'Muchisimas gracias!',
                    msg: 'Gracias por activar la geolocalización. Ya puedes disfrutar de todas las ventajas que te ofrece ' +
                        'elTrato.net. Disfrutalo' }
            ];

            console.log('Enviado desde Anuncios. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);

        });

        $scope.$on('error', function (event, args) {
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];
        });

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        // geoLocation

        var images = new Array();
        var contador = 1;
        $scope.fotoActivo = false;
        $scope.disponible1 = true;
        $scope.disponible2 = true;
        $scope.disponible3 = true;
        $scope.disponible4 = true;
        $scope.disponible5 = true;

        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                if (contador != 6) {
                    if (contador === 1) {
                        $scope.image = args.image;
                        images.push(args.files.name);
                        $scope.disponible1 = false;
                    } else if (contador === 2) {
                        $scope.image2 = args.image;
                        images.push(args.files.name);
                        $scope.disponible2 = false;
                    } else if (contador === 3) {
                        $scope.image3 = args.image;
                        images.push(args.files.name);
                        $scope.disponible3 = false;
                    } else if (contador === 4) {
                        $scope.image4 = args.image;
                        images.push(args.files.name);
                        $scope.disponible4 = false;
                    } else if (contador === 5) {
                        $scope.image5 = args.image;
                        images.push(args.files.name);
                        $scope.disponible5 = false;
                        $scope.fotoActivo = true;
                    }
                    contador++;
                }
            });
        });

        $scope.create = function () {

            var anuncio = new Anuncios({
                descripcion: this.descripcion,
                precio: this.precio,
                images: images
            });

            anuncio.$save(function (response) {
                if (!response.errorTag) {
                    $location.path('anuncios/' + response._id);
                } else {
                    $scope.alerts = [
                        { type: 'danger', title: response.title, msg: response.errorTag }
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

        $scope.buscar = function () {
            Buscar.query({
                q: $routeParams.q
            }, function (anuncios) {
                $scope.anuncios = anuncios;
            });
        };
    }]);