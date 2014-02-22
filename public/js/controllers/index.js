'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$rootScope', '$location', 'Global', 'geolocation',
    function ($scope, $rootScope, $location, Global, geolocation) {
        $scope.global = Global;

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
                        'elTrato.net. Disfrutalo',
                lat: data.coords.latitude}
            ];

            console.log('Enviado desde Index. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
            $scope.lat = data.coords.latitude;
            $scope.lng = data.coords.longitude;
            console.log('Latitude in $scope: ' + $scope.lat);
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

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
            // var query = ($scope.q + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };


        /*$scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";

        $scope.showPosition = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.alerts = [
                { type: 'success',
                    title: 'Muchisimas gracias!',
                    msg: 'Gracias por activar la geolocalización. Ya puedes disfrutar de todas las ventajas que te ofrece ' +
                        'elTrato.net. Disfrutalo' }
            ];
            $scope.$apply();
        }

        $scope.showResult = function () {
            return $scope.error == "";
        }

        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred.";
                    break;
            }
            $scope.$apply();
        }

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
                $scope.alerts = [
                    { type: 'info',
                        title: 'Disfruta al maximo de elTrato.net',
                        msg: 'Para poder disfrutar al máximo de elTrato.net necesitamos que permitas la geolocalización en tu navegador.' +
                            'Las ventajas seran maximas, automaticamente calcularemos los productos que están cerca de ti y lo mejor de todo' +
                            'es que solo lo tendrás que hacer una vez' }
                ];
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();*/
    }]);