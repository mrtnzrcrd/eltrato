'use strict';

angular.module('elTrato.system').controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global',
    function ($scope, $rootScope, $location, Global) {
        $scope.global = Global;

        $scope.elTrato = true;

        if (window.user) {

            // Guardado de nuevos tags
            $scope.newTag = function (tags) {
                $rootScope.tagsHeader = tags.replace(/\s/g, "+");
            }

            $scope.buscar = function () {
                if ($scope.tagsHeader) {
                    var query = $rootScope.tagsHeader;
                    var parameters = {tags : query};
                    $rootScope.$broadcast('searcHeader', parameters);
                }
            };
        }

        $rootScope.location = $location;

        if ($rootScope.location.$$absUrl === "http://localhost:3000/signup" || $rootScope.location.$$absUrl === "http://localhost:3000/signin") {
            $scope.index = true;
            $scope.elTrato = false;
        } else {
            $scope.index = false;
        }

        $scope.isCollapsed = false;
    }]);