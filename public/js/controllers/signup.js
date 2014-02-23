/**
 * Created by Victor-BookPro on 22/02/14.
 */

'use strict';

angular.module('elTrato.signup').controller('SignupController', ['$scope', '$http', 'Global', 'geolocation',
    function ($scope, $http, Global, geolocation) {
        $scope.global = Global;

        var latitude = "0";
        var longitude = "0";

        $scope.mapa = true;
        $scope.radioAct = true;
        $scope.inputGeo = true;

        $scope.options = {
            value: ''
        };

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
            $scope.lng = data.coords.longitude;
            $scope.lat = data.coords.latitude;

            longitude = data.coords.longitude;
            latitude = data.coords.latitude;

            $scope.accuracy = data.coords.accuracy;

            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            $scope.model.myMap.setCenter(latlng);
            $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));

            console.log('Enviado desde Signup. Latitude: ' + data.coords.latitude + ' Longitude: ' + data.coords.longitude);
            console.log('Latitude in $scope: ' + $scope.lat);

            $scope.mapa = true;
            $scope.inputGeo = false;
            $scope.radioGo = false;

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

                    $scope.lng = geoLocation[0];
                    $scope.lat = geoLocation[1];

                    return addresses;
                });
        };

        $scope.newValue = function (value) {
            if (value === 'option2') {
                $scope.inputGeo = true;
            } else if (value === 'option1') {
                $scope.inputGeo = false;
                $scope.lng = longitude;
                $scope.lat = latitude;
            }
        }

        console.log('Enviado desde Signup. Latitude: ' + $scope.lat + ' Longitude: ' + $scope.lng);

        $scope.$on('error', function (event, args) {
            console.log(args.title);
            $scope.alerts = [
                { type: args.type, msg: args.geolocationMsg, title: args.title }
            ];

            $scope.mapa = false;
            $scope.radioAct = false;
            $scope.radioGo = true;
        });

        $scope.buscar = function () {
            console.log("$scope.q: " + $scope.q);
            var query = $scope.q.replace(/\s/g, "+");;
            $location.path('busqueda/' + query);
        };

    }]);
