'use strict';

angular.module('elTrato.system').controller('IndexController', ['$scope', '$http', '$rootScope', '$location', 'Global', 'geolocation',
    function ($scope, $http, $rootScope, $location, Global, geolocation) {
        $scope.global = Global;

        $scope.search = true;
        $scope.yesAd = false;
        $scope.alertOk = true;
        $scope.loading = false;

        if (window.user != null) {
            $scope.search = false;
            var query = window.user.locs[0] + '+' + window.user.locs[1];
            console.log(query);
            geolocation.getLocation().then(function (data) {
                $scope.alerts = [
                    { type: 'success',
                        title: 'Muchisimas gracias!',
                        msg: 'Gracias por activar la geolocalización. Ya puedes disfrutar de todas las ventajas que te ofrece ' +
                            'elTrato.net. Disfrutalo',
                        lat: data.coords.latitude}
                ];

                console.log('Enviado desde Index. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
                $rootScope.lat = data.coords.latitude;
                $rootScope.lng = data.coords.longitude;

                $rootScope.$broadcast('geo');

                var query = $scope.lng + '+' + $scope.lat;
                console.log(query);
                $http.post('/geo', {query: query}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                });
            });
            $http.post('/geo', {query: query}).success(function (response) {
                $scope.anuncios = response;
                $scope.yesAd = true;
                $scope.alertOk = false;
            });
        } else if ($rootScope.lng) {
            $scope.search = false;
            var query = $scope.lng + '+' + $scope.lat;
            console.log(query);
            $http.post('/geo', {query: query}).success(function (response) {
                $scope.anuncios = response;
                $scope.yesAd = true;
                $scope.alertOk = false;
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

                console.log('Enviado desde Index. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
                $rootScope.lat = data.coords.latitude;
                $rootScope.lng = data.coords.longitude;

                $rootScope.$broadcast('geo');

                var query = $scope.lng + '+' + $scope.lat;
                console.log(query);
                $http.post('/geo', {query: query}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
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
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];
        });

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $rootScope.$on('searcHeader', function (event, args) {
            $http.post('/searchGeo', {params: {search: args.search, geo: args.geo}}).success(function (response) {
                $scope.anuncios = response;
                $scope.search = false;
                $scope.yesAd = true;
                $scope.alertOk = false;
                $scope.loading = false;
            });
        });

        $scope.buscar = function () {
            console.log('longitude: ' + $scope.lng + ' LAtitude: ' + $scope.lat);
            console.log("$scope.q: " + this.q);
            if (this.q) {
                var query = this.q.replace(/\s/g, "+");
            }
            var query2 = $scope.lng + '+' + $scope.lat;
            if ($scope.lng && this.q) {
                $http.post('/searchGeo', {params: {search: query, geo: query2}}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                });
            } else if ($scope.lng && !this.q) {
                $http.post('/geo', {query: query2}).success(function (response) {
                    $scope.anuncios = response;
                    $scope.search = false;
                    $scope.yesAd = true;
                    $scope.alertOk = false;
                    $scope.loading = false;
                });
            } else if (this.q && !$scope.lng) {
                $location.path('busqueda/' + query);
            }
        };
    }]);