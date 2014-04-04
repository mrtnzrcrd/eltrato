/**
 * Created by Victor-BookPro on 04/04/14.
 */
"use strict";

// Favorites general
angular.module('elTrato.system').directive('isFavorite', ['$compile', '$http', 'Global', 'toaster', function ($compile, $http, Global, toaster) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            if (Global.user) {
                var favorite = attrs.favorite;
                var favorites = Global.user.favorites;
                var result = favorites.indexOf(favorite);
                var tag = '';

                scope.$on('removeFavorite', function (event, id) {
                    tag = '<a class="btn btn-favorite btn-sm" id="anuncio._id" role="button" ' +
                        'ng-click="favoritosGeneral(anuncio._id)" tooltip="Añadir a favoritos"> ' +
                        '<span class="glyphicon glyphicon-star-empty"></span> </a>';
                    angular.element('#' + id.id).replaceWith($compile(tag)(scope));
                });

                scope.$on('addFavorite', function (event, id) {
                    tag = '<a class="btn btn-warning btn-sm" id="anuncio._id" role="button" tooltip="Favorito" ' +
                        'ng-click="removeFavorite(anuncio._id)">' +
                        '<span class="glyphicon glyphicon-star"></span> </a>';
                    angular.element('#' + id.id).replaceWith($compile(tag)(scope));
                });

                scope.removeFavorite = function (id) {
                    $http.get('/removeFavorite', {params: {idTrato: id}}).success(function (response) {
                        if (response.ok == 'ok') {
                            toaster.pop('info', "Favoritos", 'Eliminado de tus favoritos');
                            var i = window.user.favorites.indexOf(id);

                            if (i != -1) {
                                window.user.favorites.splice(i, 1);
                            }

                            tag = '<a class="btn btn-favorite btn-sm" id="{{anuncio._id}}" role="button" ' +
                                'ng-click="favoritosGeneral(anuncio._id)" tooltip="Añadir a favoritos"> ' +
                                '<span class="glyphicon glyphicon-star-empty"></span> </a>';
                            element.html($compile(tag)(scope));
                        } else {
                            toaster.pop('error', "Se ha producido un error", 'No se ha podido eliminar de tus favoritos');
                        }
                    });
                };

                scope.favoritosGeneral = function (id) {
                    var favorites = window.user.favorites;
                    var result = favorites.indexOf(id);
                    if (result == -1) {
                        $http.get('/addFavorite', {params: {idTrato: id}}).success(function (response) {
                            if (response.ok == 'ok') {
                                toaster.pop('warning', "Favoritos", 'Se ha añadido a tus favoritos correctamente');
                                window.user.favorites.push(id);
                                tag = '<a class="btn btn-warning btn-sm" id="{{anuncio._id}}" role="button" tooltip="Favorito" ' +
                                    'ng-click="removeFavorite(anuncio._id)">' +
                                    '<span class="glyphicon glyphicon-star"></span> </a>';
                                element.html($compile(tag)(scope));
                            } else {
                                toaster.pop('error', "Se ha producido un error", 'No se ha podido añadir a tus favoritos');
                            }
                        });
                    }
                };

                if (result != -1) {
                    tag = '<a class="btn btn-warning btn-sm" role="button" tooltip="Favorito" ' +
                        'ng-click="removeFavorite(anuncio._id)" id="{{anuncio._id}}">' +
                        '<span class="glyphicon glyphicon-star"></span> </a>'
                } else {
                    tag = '<a class="btn btn-favorite btn-sm" id="{{anuncio._id}}" role="button" ' +
                        'ng-click="favoritosGeneral(anuncio._id)" tooltip="Añadir a favoritos"> ' +
                        '<span class="glyphicon glyphicon-star-empty"></span> </a>'
                }

                element.append($compile(tag)(scope));
            } else {
                var conFav = false;
                tag = '<a class="btn btn-favorite btn-sm" role="button" ' +
                    'ng-click="deal($event, anuncio,' + conFav + ' )" tooltip="Añadir a favoritos"> ' +
                    '<span class="glyphicon glyphicon-star-empty"></span> </a>'

                element.append($compile(tag)(scope));
            }
        }
    };
}]).directive('photos', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var photos = attrs.numphotos;
            photos = JSON.parse(photos);
            photos = photos.length;

            var tag = '<div class="col-md-12 numPhotos">' +
                '<span class="glyphicon glyphicon-camera"> </span> ' + photos +
                '</div>';

            element.append($compile(tag)(scope));
        }
    };
}]).directive('isTrueque', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var trueque = attrs.trueque;
            trueque = JSON.parse(trueque);
            if (trueque.length === 1) {
                var conFav = true;
                var tag = '';
                tag = '<a href="#" class="btn btn-deal btn-sm" role="button" tooltip="Contraoferta" ' +
                    'ng-click="deal($event, anuncio,' + conFav + ' )" <span class="glyphicon glyphicon-transfer"></span>' +
                    '<span class="glyphicon glyphicon-transfer"></span> Contraoferta </a>'
                element.append($compile(tag)(scope));
            }
        }
    };
}]);