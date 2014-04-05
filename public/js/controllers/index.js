'use strict';

angular.module('elTrato.system').controller('IndexController', ['$scope', '$http', '$rootScope', '$location', 'Global', 'geolocation', 'Geocoder', '$modal', 'FancyboxService',
    function ($scope, $http, $rootScope, $location, Global, geolocation, Geocoder, $modal, FancyboxService) {
        $scope.global = Global;

        $scope.search = true;
        $scope.yesAd = false;
        $scope.alertOk = true;
        $scope.loading = false;
        $scope.toasterGeneral = true;

        $scope.kilometros = 0;

        if (window.user) {
            $rootScope.$on('searcHeader', function (event, args) {
                var latlng = '';
                if ($scope.lng) {
                    latlng = $scope.lng + '+' + $scope.lat;
                } else {
                    latlng = window.user.locs[0] + '+' + window.user.locs[1];
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
            };

            $scope.formTags = function () {
                if (this.tagsHeader) {
                    $rootScope.tagsHeader = this.tagsHeader;
                    var inputTags = this.tagsHeader.replace(/\s/g, "+");
                    var latlng = '';

                    if ($scope.lng) {
                        latlng = $scope.lng + '+' + $scope.lat;
                    } else {
                        latlng = window.user.locs[0] + '+' + window.user.locs[1];
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
            var latlng = '';

            if ($scope.lng) {
                latlng = $scope.lng + '+' + $scope.lat;
            } else {
                latlng = window.user.locs[0] + '+' + window.user.locs[1];
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
        };

        $scope.distance = function (data) {
            $scope.kilometros = data;
            var latlng = '';

            if ($scope.lng) {
                latlng = $scope.lng + '+' + $scope.lat;
            } else {
                latlng = window.user.locs[0] + '+' + window.user.locs[1];
            }

            var distance = data;

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
        };

        $scope.price = function () {
            if (this.desde || this.hasta) {
                var desde = this.desde;
                var hasta = this.hasta;
                var latlng = '';

                if ($scope.lng) {
                    latlng = $scope.lng + '+' + $scope.lat;
                } else {
                    latlng = window.user.locs[0] + '+' + window.user.locs[1];
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
        };

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
                    });
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
                });
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
            query = $scope.lng + '+' + $scope.lat;
            $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                Geocoder.addressForLatLng($rootScope.lat, $rootScope.lng).then(function (data) {
                    $scope.address = data.address;
                });
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
                });

                var query = $scope.lng + '+' + $scope.lat;
                $http.get('/searchGeo', {params: {geo: query}}).success(function (response) {
                    Geocoder.addressForLatLng($rootScope.lat, $rootScope.lng).then(function (data) {
                        $scope.address = data.address;
                    });
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
                    });
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
                    });
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

            $scope.cancel = function () {
                console.log("NO BORRAR");
                $modalInstance.dismiss('Cancelado');
            };

            $scope.show_dialog = function () {
                FancyboxService.open("div.wrapper");
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.deal = function (event, anuncio) {
                //$scope.toasterGeneral = false;
                event.preventDefault();
                var trato = anuncio;
                var modalDeal = $modal.open({
                    templateUrl: 'contraofertaView.html',
                    controller: modalDealCtrl,
                    windowClass: 'modalTrato',
                    resolve: {
                        trato: function () {
                            return trato;
                        }
                    },
                    keyboard: false
                });

                modalDeal.result.then(function (respuesta) {

                }, function () {
                    $scope.toasterGeneral = true;
                });
            };

        };

        $scope.deal = function (event, anuncio, conFav) {
            //$scope.toasterGeneral = false;
            event.preventDefault();
            if (!Global.user) {
                var conFav2 = '';
                if (conFav) {
                    conFav2 = 'contraoferta';
                } else {
                    conFav2 = 'favorito';
                }

                var modalNoLogin = $modal.open({
                    templateUrl: 'noLoginView.html',
                    controller: modalNoLoginCtrl,
                    resolve: {
                        conFav2: function () {
                            return conFav2;
                        }
                    },
                    keyboard: false
                });

                modalNoLogin.result.then(function (respuesta) {

                }, function () {
                    $scope.toasterGeneral = true;
                });
            } else {
                var trato = anuncio;
                var modalDeal = $modal.open({
                    templateUrl: 'contraofertaView.html',
                    controller: modalDealCtrl,
                    windowClass: 'modalTrato',
                    resolve: {
                        trato: function () {
                            return trato;
                        }
                    },
                    keyboard: false
                });

                modalDeal.result.then(function (respuesta) {

                }, function () {
                    $scope.toasterGeneral = true;
                });
            }
        };

        var modalNoLoginCtrl = function ($scope, $rootScope, $modalInstance, conFav2) {

            if (conFav2 == 'contraoferta') {
                $scope.conFav = 'Para poder realizar una contraoferta necesitas estar logueado. ' +
                    'Deseas acceder o si aún no estas registrado registrarte?';
            } else {
                $scope.conFav = 'Para poder añadir un favorito necesitas estar logueado. ' +
                    'Deseas acceder o si aún no estas registrado registrarte?';
            }


            $scope.ok = function () {
                console.log("BORRAR");
                $modalInstance.close("OK");
            };

            $scope.cancel = function () {
                console.log("NO BORRAR");
                $modalInstance.dismiss('Cancelado');
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        var modalDealCtrl = function ($scope, $rootScope, $modalInstance, trato) {

            $scope.tratos = trato;

            if (trato.opciones[0].need.length > 0) {
                $scope.intereses = true;
            }

            if (trato.opciones[0].contraoferta) {
                $scope.contraoferta = true;
                $scope.dealDiv = true;
                $scope.mostrarForm = false;
                $scope.error = false;

                $http.get('/comprobarContraoferta', {params: {idTrato: trato._id}})
                    .success(function (response) {
                        if (response.aceptado === "nulo") {
                            $scope.alertOpciones =
                            { type: 'info',
                                title: 'Contraoferta realizada',
                                msg: 'El usuario aún no ha aceptado ni descartado tu oferta, hasta que esto no ocurra no podrás ' +
                                    'realizar otra contraoferta. Si estás muy interesado puedes enviarle un mensaje para hacer mas ' +
                                    'incapie.' }
                            ;
                            $scope.mostrarAlert = true;
                        } else if (response.aceptado == "true") {
                            $scope.alertOpciones =
                            { type: 'success',
                                title: 'El usuario ha aceptado tu contraoferta',
                                msg: 'Enhorabuena! El usuario ha aceptado tu contraoferta.' }
                            ;
                            $scope.mostrarAlert = true;
                        } else if (response.aceptado == "false") {
                            $scope.alertOpciones =
                            { type: 'warning',
                                title: 'El usuario ha rechazado tu contraoferta',
                                msg: 'Lo sentimos, el usuario ha rechazado tu contraoferta de ' + response.contraoferta.precio + '€'
                            };
                            $scope.precio = response.contraoferta.precio;
                            $scope.id = response.contraoferta._id;
                            $scope.mostrarAlert = true;
                            $scope.mostrarButton = true;
                        } else if (response.aceptado === 0) {
                            $scope.mostrarForm = true;
                        }
                    });

                if (trato.opciones[0].formaPago && trato.opciones[0].trueque) {
                    $scope.formaPago = true;
                    $scope.deal = true;
                    $scope.mostrarAlert = false;
                    $scope.mostrarButton = false;

                    $http.get('/comprobarTrueques', {params: {idUser: Global.user._id, idTrato: trato._id, interest: trato.opciones[0].need}})
                        .success(function (response) {
                            if (response.coincidencia.length > 0) {
                                $scope.coincidencia = true;
                                $scope.resultCoinci = response.coincidencia.length;
                                $scope.tratosCoincidencia = response.coincidencia;
                            } else {
                                $scope.coincidencia = false;
                                $scope.misTratos = response.misTratos;
                                if (response.misTratos.length == 1) {
                                    $scope.noRepeat = true;
                                } else {
                                    $scope.noRepeat = false;
                                }
                            }
                        });
                } else if (trato.opciones[0].formaPago && !trato.opciones[0].trueque) {
                    $scope.formaPago = true;
                } else if (!trato.opciones[0].formaPago && trato.opciones[0].trueque) {
                    $scope.deal = true;
                    $http.get('/comprobarTrueques', {params: {idUser: Global.user._id, idTrato: trato._id, interest: trato.opciones[0].need}})
                        .success(function (response) {
                            if (response.coincidencia.length > 0) {
                                $scope.coincidencia = true;
                                $scope.resultCoinci = response.coincidencia.length;
                                $scope.tratosCoincidencia = response.coincidencia;
                            } else {
                                $scope.coincidencia = false;
                                $scope.misTratos = response.misTratos;
                                if (response.misTratos.length == 1) {
                                    $scope.noRepeat = true;
                                } else {
                                    $scope.noRepeat = false;
                                }
                            }
                        });
                }
            } else if (trato.opciones[0].formaPago) {
                $scope.formaPago = true;
                $scope.productDiv = true;
                if (trato.opciones[0].trueque) {
                    $scope.deal = true;
                }
            } else if (trato.opciones[0].trueque) {
                $scope.deal = true;
                $scope.barterDiv = true;
                $http.get('/comprobarTrueques', {params: {idUser: Global.user._id, idTrato: trato._id, interest: trato.opciones[0].need}})
                    .success(function (response) {
                        if (response.coincidencia.length > 0) {
                            $scope.coincidencia = true;
                            $scope.resultCoinci = response.coincidencia.length;
                            $scope.tratosCoincidencia = response.coincidencia;
                        } else {
                            $scope.coincidencia = false;
                            $scope.misTratos = response.misTratos;
                            if (response.misTratos.length == 1) {
                                $scope.noRepeat = true;
                            } else {
                                $scope.noRepeat = false;
                            }
                        }
                    });
            }

            Geocoder.addressForLatLng($scope.tratos.locs[1], $scope.tratos.locs[0]).then(function (data) {
                $scope.address = data.address;
            });

            $scope.ok = function () {
                console.log("BORRAR");
                $modalInstance.close("OK");
            };

            $scope.cancel = function () {
                console.log("NO BORRAR");
                $modalInstance.dismiss('Cancelado');
            };

            $scope.show_dialog = function () {
                FancyboxService.open("div.wrapper");
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }]);