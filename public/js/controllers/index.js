'use strict';

angular.module('elTrato.system').controller('IndexController', ['$scope', '$http', '$rootScope', '$location', 'Global', 'geolocation', 'Geocoder', '$modal', 'FancyboxService', '$timeout', 'toaster',
    function ($scope, $http, $rootScope, $location, Global, geolocation, Geocoder, $modal, FancyboxService, $timeout, toaster) {
        $scope.global = Global;

        $scope.search = true;
        $scope.yesAd = false;
        $scope.alertOk = true;
        $scope.loading = false;
        $scope.toasterGeneral = true;

        $scope.kilometros = 0;

        if (window.user) {
            $rootScope.$on('searcHeader', function (event, args) {

                if ($scope.lng) {
                    var latlng = $scope.lng + '+' + $scope.lat;
                } else {
                    var latlng = window.user.locs[0] + '+' + window.user.locs[1];
                }

                var distance = $scope.kilometros;

                $http.get('/searchDistancePrice', {params: {tags: args.tags, distance: distance, geo: latlng}})
                    .success(function (response) {
                        $scope.anuncios = response;
                        $scope.search = false;
                        $scope.yesAd = true;
                        $scope.alertOk = false;
                        $scope.loading = false;
                        $scope.results = $scope.anuncios.length;

                    });
            });
        } else {
            $scope.newTag = function (tags) {
                $rootScope.tagsHeader = tags.replace(/\s/g, "+");
            }

            $scope.formTags = function () {
                if (this.tagsHeader) {
                    $rootScope.tagsHeader = this.tagsHeader;
                    var inputTags = this.tagsHeader.replace(/\s/g, "+");

                    if ($scope.lng) {
                        var latlng = $scope.lng + '+' + $scope.lat;
                    } else {
                        var latlng = window.user.locs[0] + '+' + window.user.locs[1];
                    }

                    var distance = $scope.kilometros;

                    $http.get('/searchDistancePrice', {params: {tags: inputTags, distance: distance, geo: latlng}})
                        .success(function (response) {
                            $scope.anuncios = response;
                            $scope.search = false;
                            $scope.yesAd = true;
                            $scope.alertOk = false;
                            $scope.loading = false;
                            $scope.results = $scope.anuncios.length;

                        });
                }

            }
        }

        $scope.localizacion = function () {
            $scope.address = this.address;

            if ($scope.lng) {
                var latlng = $scope.lng + '+' + $scope.lat;
            } else {
                var latlng = window.user.locs[0] + '+' + window.user.locs[1];
            }

            var distance = $scope.kilometros;

            if ($rootScope.tagsHeader) {
                var inputTags = $rootScope.tagsHeader;
                $http.get('/searchDistancePrice', {params: {tags: inputTags, distance: distance, geo: latlng}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.results = $scope.anuncios.length;

                });
            } else {
                $http.get('/searchDistancePrice', {params: {distance: distance, geo: latlng}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.results = $scope.anuncios.length;

                });
            }
        }

        $scope.distance = function (data) {
            $scope.kilometros = data;

            if ($scope.lng) {
                var latlng = $scope.lng + '+' + $scope.lat;
            } else {
                var latlng = window.user.locs[0] + '+' + window.user.locs[1];
            }

            var distance = data;

            if ($rootScope.tagsHeader) {
                var inputTags = $rootScope.tagsHeader;
                ;
                $http.get('/searchDistancePrice', {params: {tags: inputTags, distance: distance, geo: latlng}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.results = $scope.anuncios.length;

                });
            } else {
                $http.get('/searchDistancePrice', {params: {distance: distance, geo: latlng}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.results = $scope.anuncios.length;

                });
            }
        }

        $scope.price = function () {
            if (this.desde || this.hasta) {
                var desde = this.desde;
                var hasta = this.hasta;

                if ($scope.lng) {
                    var latlng = $scope.lng + '+' + $scope.lat;
                } else {
                    var latlng = window.user.locs[0] + '+' + window.user.locs[1];
                }

                var distance = $scope.kilometros;

                if ($rootScope.tagsHeader) {
                    var inputTags = $rootScope.tagsHeader;
                    $http.get('/searchDistancePrice', {params: {tags: inputTags, distance: distance, geo: latlng,
                        desde: desde, hasta: hasta}}).success(function (response) {
                            $scope.anuncios = response;
                            $scope.search = false;
                            $scope.yesAd = true;
                            $scope.alertOk = false;
                            $scope.loading = false;
                            $scope.results = $scope.anuncios.length;

                        });
                } else {
                    $http.get('/searchDistancePrice', {params: {distance: distance, geo: latlng, desde: desde, hasta: hasta}})
                        .success(function (response) {
                            $scope.anuncios = response;
                            $scope.search = false;
                            $scope.yesAd = true;
                            $scope.alertOk = false;
                            $scope.loading = false;
                            $scope.results = $scope.anuncios.length;

                        });
                }
            }
        }

        if (window.user != null) {
            $scope.search = false;
            var query = window.user.locs[0] + '+' + window.user.locs[1];
            geolocation.getLocation().then(function (data) {
                $scope.alerts = [
                    { type: 'success',
                        title: 'Muchisimas gracias!',
                        msg: 'Gracias por activar la geolocalización. Ya puedes disfrutar de todas las ventajas que te ofrece ' +
                            'elTrato.net. Disfrutalo',
                        lat: data.coords.latitude}
                ];

                $rootScope.lat = data.coords.latitude;
                $rootScope.lng = data.coords.longitude;

                var query = $scope.lng + '+' + $scope.lat;
                $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                    Geocoder.addressForLatLng($scope.lat, $scope.lng).then(function (data) {
                        $scope.address = data.address;
                    })
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.kilometros = 20;
                    $scope.results = $scope.anuncios.length;
                });
            });
            $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                Geocoder.addressForLatLng(window.user.locs[1], window.user.locs[0]).then(function (data) {
                    $scope.address = data.address;
                })
                $scope.anuncios = response;
                $scope.search = false;
                $scope.yesAd = true;
                $scope.alertOk = false;
                $scope.loading = false;
                $scope.kilometros = 20;
                $scope.results = $scope.anuncios.length;
            });
        } else if ($rootScope.lng) {
            $scope.search = false;
            var query = $scope.lng + '+' + $scope.lat;
            $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                Geocoder.addressForLatLng($rootScope.lat, $rootScope.lng).then(function (data) {
                    $scope.address = data.address;
                })
                $scope.anuncios = response;
                $scope.search = false;
                $scope.yesAd = true;
                $scope.alertOk = false;
                $scope.loading = false;
                $scope.kilometros = 20;
                $scope.results = $scope.anuncios.length;

            });
        } else {
            $scope.alerts = [
                { type: 'info',
                    title: 'Disfruta al maximo de elTrato.net',
                    msg: 'Para poder disfrutar al máximo de elTrato.net necesitamos que permitas la geolocalización en tu navegador.' +
                        'Las ventajas seran maximas, automaticamente calcularemos los productos que están cerca de ti y lo mejor de todo ' +
                        'es que solo lo tendrás que hacer una vez.' }
            ];

            geolocation.getLocation().then(function (data) {
                $scope.alerts = [
                    { type: 'success',
                        title: 'Muchisimas gracias!',
                        msg: 'Gracias por activar la geolocalización. Ya puedes disfrutar de todas las ventajas que te ofrece ' +
                            'elTrato.net. Disfrutalo',
                        lat: data.coords.latitude}
                ];

                $rootScope.lat = data.coords.latitude;
                $rootScope.lng = data.coords.longitude;

                Geocoder.addressForLatLng(data.coords.latitude, data.coords.longitude).then(function (data2) {
                    $scope.address = data2.address;
                })

                var query = $scope.lng + '+' + $scope.lat;
                $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                    Geocoder.addressForLatLng($rootScope.lat, $rootScope.lng).then(function (data) {
                        $scope.address = data.address;
                    })
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.kilometros = 20;
                    $scope.results = $scope.anuncios.length;
                });
            });
        }

        $scope.getLocationViaGoogle = function (val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false,
                    components: 'country:ES'
                }
            }).then(function (res) {
                    var addresses = [];
                    var geoLocation = [];
                    angular.forEach(res.data.results, function (item) {
                        addresses.push(item.formatted_address);
                        geoLocation.push(item.geometry.location.lng);
                        geoLocation.push(item.geometry.location.lat);
                    });

                    $scope.lng = geoLocation[0];
                    $scope.lat = geoLocation[1];

                    return addresses;
                });
        };

        $scope.$on('error', function (event, args) {
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];
        });

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.buscar = function () {
            if (this.q) {
                $rootScope.tagsHeader = this.q;
                var query = this.q.replace(/\s/g, "+");
            }
            var query2 = $scope.lng + '+' + $scope.lat;
            if ($scope.lng && this.q) {
                $http.get('/searchGeo', {params: {search: query, geo: query2}}).success(function (response) {
                    Geocoder.addressForLatLng($scope.lat, $scope.lng).then(function (data) {
                        $scope.address = data.address;
                    })
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.kilometros = 20;
                    $scope.results = $scope.anuncios.length;

                });
            } else if ($scope.lng && !this.q) {
                $http.get('/searchGeo', {params: {geo: query2}}).success(function (response) {
                    Geocoder.addressForLatLng($scope.lat, $scope.lng).then(function (data) {
                        $scope.address = data.address;
                    })
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.kilometros = 20;
                    $scope.results = $scope.anuncios.length;

                });
            } else if (this.q && !$scope.lng) {
                $http.get('/searchGeo', {params: {search: query}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                    $scope.kilometros = 0;
                    $scope.results = $scope.anuncios.length;

                });
            }
        };

        $scope.view = function (event, anuncio) {
            $scope.toasterGeneral = false;
            event.preventDefault();
            var trato = anuncio;
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                windowClass: 'modalTrato',
                resolve: {
                    trato: function () {
                        return trato;
                    }
                },
                keyboard: false
            });

            modalInstance.result.then(function (respuesta) {

            }, function () {
                $scope.toasterGeneral = true;

            });
        };

        var ModalInstanceCtrl = function ($scope, $rootScope, $modalInstance, trato) {

            $scope.tratos = trato;

            $http.get('/lookFavorite', {params: {idTrato: trato._id}}).success(function (response) {
                if (response != "null") {
                    $scope.defaultFav = false;
                    $scope.tratoFav = true;
                } else {
                    $scope.defaultFav = true;
                    $scope.tratoFav = false;
                }
            });

            if ($scope.tratos.opciones.length > 0) {
                $scope.contraoferta = $scope.tratos.opciones[0].trueque;
            }

            Geocoder.addressForLatLng($scope.tratos.locs[1], $scope.tratos.locs[0]).then(function (data) {
                $scope.address = data.address;
            });

            $scope.ok = function () {
                console.log("BORRAR");
                $modalInstance.close("OK");
            };

            $scope.cancel = function (id) {
                console.log("NO BORRAR");
                $modalInstance.dismiss('Cancelado');
            };

            $scope.show_dialog = function () {
                FancyboxService.open("div.wrapper");
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.favorite = function (id) {
                $http.get('/addFavorite', {params: {idTrato: id}}).success(function (response) {
                    if (response.ok == 'ok') {
                        $scope.defaultFav = false;
                        $scope.tratoFav = true;
                        toaster.pop('warning', "Favoritos", 'Se ha añadido a tus favoritos correctamente');
                        window.user.favorites.push(id);
                        $rootScope.$broadcast('nuevoFavorito', {id: id});
                    } else {
                        toaster.pop('error', "Se ha producido un error", 'No se ha podido añadir a tus favoritos');
                    }
                });
            }
        };

        $scope.$on('nuevoFavorito', function(event, id) {
            angular.element('#' + id.id).removeClass('btn-favorite');
            angular.element('#' + id.id).addClass('btn-warning');
            angular.element('#' + id.id).attr('ng-class', 'favorito');
            angular.element('#' + id.id).removeAttr('id');
        });
    }]);