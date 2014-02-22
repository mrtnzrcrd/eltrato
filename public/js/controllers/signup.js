/**
 * Created by Victor-BookPro on 22/02/14.
 */

'use strict';

function onGoogleReady() {
    angular.bootstrap(document.getElementById("map"), ['ui-map']);
}

angular.module('mean.signup').controller('SignupController', ['$scope', 'Global', 'geolocation',
    function ($scope, Global, geolocation) {
        $scope.global = Global;

        geolocation.getLocation().then(function (data) {
            console.log('Enviado desde Signup. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
            $scope.lat = data.coords.latitude;
            $scope.lng = data.coords.longitude;
            console.log('Latitude in $scope: ' + $scope.lat);

            $scope.mapOptions = {
                center: new google.maps.LatLng($scope.lat, $scope.lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        });



        $scope.$on('error', function (event, args) {
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];
        });

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
            // var query = ($scope.q + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };

    }]);
