/**
 * Created by Victor-BookPro on 22/02/14.
 */

'use strict';

angular.module('mean.signup').controller('SignupController', ['$scope', 'Global', 'geolocation',
    function ($scope, Global, geolocation) {
        $scope.global = Global;

        $scope.mapOptions = {
            center: new google.maps.LatLng(35.784, -78.670),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        console.log("center: " + $scope.mapOptions.center);
        console.log("zoom: " + $scope.mapOptions.zoom);
        console.log("ROADMAP: " + $scope.mapOptions.mapTypeId);

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
            console.log("center: " + $scope.mapOptions.center);
            console.log("zoom: " + $scope.mapOptions.zoom);
            console.log("ROADMAP: " + $scope.mapOptions.mapTypeId);

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
