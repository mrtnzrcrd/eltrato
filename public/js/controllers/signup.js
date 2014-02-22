/**
 * Created by Victor-BookPro on 22/02/14.
 */

'use strict';

angular.module('mean.signup').controller('SignupController', ['$scope', 'Global', 'geolocation',
    function ($scope, Global, geolocation) {
        $scope.global = Global;

        $scope.mapa = true;
        $scope.inputGeo = false;

        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = { myMap: undefined };
        $scope.myMarkers = [];

        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.lat, $scope.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        geolocation.getLocation().then(function (data) {
            $scope.lat = data.coords.latitude;
            $scope.lng = data.coords.longitude;
            $scope.accuracy = data.coords.accuracy;

            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            $scope.model.myMap.setCenter(latlng);
            $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));

            console.log('Enviado desde Signup. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
            console.log('Latitude in $scope: ' + $scope.lat);

            $scope.mapa = false;
            $scope.inputGeo = true;
        });

        $scope.$on('error', function (event, args) {
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];

            $scope.mapa = true;
            $scope.inputGeo = false;
        });

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
            // var query = ($scope.q + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };

    }]);
