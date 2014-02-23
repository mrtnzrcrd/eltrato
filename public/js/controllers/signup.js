/**
 * Created by Victor-BookPro on 22/02/14.
 */

'use strict';

angular.module('elTrato.signup').controller('SignupController', ['$scope', 'Global', 'geolocation',
    function ($scope, Global, geolocation) {
        $scope.global = Global;

        $scope.mapa = true;
        $scope.radioAct = true;

        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = { myMap: undefined };
        $scope.myMarkers = [];

        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.lat, $scope.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
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

            $scope.mapa = true;

        });

        $scope.getLocationViaGoogle = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false,
                    components: 'country:ES'
                }
            }).then(function(res){
                    var addresses = [];
                    var geoLocation = [];
                    angular.forEach(res.data.results, function(item){
                        addresses.push(item.formatted_address);
                        geoLocation.push(item.geometry.location.lng);
                        geoLocation.push(item.geometry.location.lat);
                    });

                    return addresses;
                });
        };

        $scope.$on('error', function (event, args) {
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];

            $scope.mapa = false;
            $scope.radioAct = false;
        });

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
            // var query = ($scope.q + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };

    }]);
