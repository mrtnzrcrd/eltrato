/**
 * Created by Victor-BookPro on 04/04/14.
 */
"use strict";

angular.module('elTrato.system').directive('modalHeaderTrato', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/trato/tratoHeader.html'
    }
}).directive('modalBodyTrato', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/trato/tratoBody.html'
    }
}).directive('modalFooterTrato', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/trato/tratoFooter.html'
    }
}).directive('isFavoriteModal', ['$rootScope', '$compile', '$http', 'toaster', function ($rootScope, $compile, $http, toaster) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var favorite = attrs.favorite;
            var favorites = window.user.favorites;
            var result = favorites.indexOf(favorite);
            var tag = '';

            scope.removeFavorite = function (id) {
                $http.get('/removeFavorite', {params: {idTrato: id}}).success(function (response) {
                    if (response.ok == 'ok') {
                        toaster.pop('info', "Favoritos", 'Eliminado de tus favoritos');
                        var i = window.user.favorites.indexOf(id);

                        if (i != -1) {
                            window.user.favorites.splice(i, 1);
                        }
                        tag = '<a class="btn btn-favorite" ng-click="favorite(tratos._id)" role="button" ' +
                            'title="Añadir a favoritos"> <span class="glyphicon glyphicon-star-empty"></span> Añadir a favoritos </a>';
                        element.html($compile(tag)(scope));
                        $rootScope.$broadcast('removeFavorite', {id: id});
                    } else {
                        toaster.pop('error', "Se ha producido un error", 'No se ha podido eliminar de tus favoritos');
                    }
                });
            };

            scope.favorite = function (id) {
                var favorites = window.user.favorites;
                var result = favorites.indexOf(id);
                if (result == -1) {
                    $http.get('/addFavorite', {params: {idTrato: id}}).success(function (response) {
                        if (response.ok == 'ok') {
                            toaster.pop('warning', "Favoritos", 'Se ha añadido a tus favoritos correctamente');
                            window.user.favorites.push(id);
                            tag = '<a class="btn btn-warning" ng-click="removeFavorite(tratos._id)"  role="button" title="Favorito"> ' +
                                '<span class="glyphicon glyphicon-star"></span> Favorito </a>';
                            element.html($compile(tag)(scope));
                            $rootScope.$broadcast('addFavorite', {id: id});
                        } else {
                            toaster.pop('error', "Se ha producido un error", 'No se ha podido añadir a tus favoritos');
                        }
                    });
                }
            };

            if (result != -1) {
                tag = '<a class="btn btn-warning" ng-click="removeFavorite(tratos._id)"  role="button" title="Favorito"> ' +
                    '<span class="glyphicon glyphicon-star"></span> Favorito </a>';
            } else {
                tag = '<a class="btn btn-favorite" ng-click="favorite(tratos._id)" role="button" ' +
                    'title="Añadir a favoritos"> <span class="glyphicon glyphicon-star-empty"></span> Añadir a favoritos </a>';
            }

            element.append($compile(tag)(scope));
        }
    }
}]);