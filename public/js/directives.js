'use strict';
/*
 window.angular.module('elTrato.upload2', [])
 .directive('upload', [function () {
 return {
 restrict: 'A',
 link: function (scope, elem, attrs) {
 var reader = new FileReader();
 reader.onload = function (e) {
 var image = e.target.result;
 scope.$emit("fileSelected", { image: image, files : elem[0].files[0]});
 }

 elem.on('change', function () {
 reader.readAsDataURL(elem[0].files[0]);
 });
 }
 };
 }])
 */

// It is attached to an element that catches the event drop file
angular.module('elTrato.anuncios').directive('ngFileDrop', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        // don't use drag-n-drop files in IE9, because not File API support
        link: !$fileUploader.isHTML5 ? angular.noop : function (scope, element, attributes) {
            element
                .bind('drop', function (event) {
                    var dataTransfer = event.dataTransfer ?
                        event.dataTransfer :
                        event.originalEvent.dataTransfer; // jQuery fix;
                    if (!dataTransfer) return;
                    event.preventDefault();
                    event.stopPropagation();
                    scope.$broadcast('file:removeoverclass');
                    scope.$emit('file:add', dataTransfer.files, scope.$eval(attributes.ngFileDrop));
                })
                .bind('dragover', function (event) {
                    var dataTransfer = event.dataTransfer ?
                        event.dataTransfer :
                        event.originalEvent.dataTransfer; // jQuery fix;

                    event.preventDefault();
                    event.stopPropagation();
                    dataTransfer.dropEffect = 'copy';
                    scope.$broadcast('file:addoverclass');
                })
                .bind('dragleave', function () {
                    scope.$broadcast('file:removeoverclass');
                });
        }
    };
}])
// It is attached to an element which will be assigned to a class "ng-file-over" or ng-file-over="className"
angular.module('elTrato.anuncios').directive('ngFileOver', function () {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            scope.$on('file:addoverclass', function () {
                element.addClass(attributes.ngFileOver || 'ng-file-over');
            });
            scope.$on('file:removeoverclass', function () {
                element.removeClass(attributes.ngFileOver || 'ng-file-over');
            });
        }
    };
});
// It is attached to <input type="file"> element like <ng-file-select="options">
angular.module('elTrato.anuncios').directive('ngFileSelect', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            $fileUploader.isHTML5 || element.removeAttr('multiple');

            element.bind('change', function () {
                scope.$emit('file:add', $fileUploader.isHTML5 ? this.files : this, scope.$eval(attributes.ngFileSelect));
                ($fileUploader.isHTML5 && element.attr('multiple')) && element.prop('value', null);
            });

            element.prop('value', null); // FF fix
        }
    };
}]);

angular.module('elTrato.system').directive('myTrato', function() {
    return {
        scope: {
            anuncio1: '=dataAnuncio'
        },
        templateUrl: 'views/anuncios/trato.html'
    };
});

angular.module('elTrato.system').directive('myTrato2', function() {
    console.log("HOLA");
    return {
        restrict: 'E',
        template: 'Hola'
    };
});

angular.module('elTrato.system').directive('myInput', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function (event) {
                event.stopPropagation();
            });
        }
    };
});

/*angular.module('elTrato.system').directive("loadingIndicator", function() {
 return {
 restrict : "A",
 template: "<div id='loading' style='display: inline-block;'><img src='../img/icons/ajax-loader.gif'><p>Comprobando favorito</p></div>",
 link : function(scope, element, attrs) {
 scope.$on("loading-started", function(e) {
 element.css({"display" : ""});
 });

 scope.$on("loading-complete", function(e) {
 element.css({"display" : "none"});
 });

 }
 };
 });*/

//Comprobar si es trueque
angular.module('elTrato.system').directive('isTrueque', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var trueque = attrs.trueque;
            var tag = '';

            if (trueque == "true") {
                tag = '<a href="#" class="btn btn-deal btn-sm" role="button" tooltip="Contraoferta" ' +
                    'ng-click="deal($event, anuncio)" <span class="glyphicon glyphicon-transfer"></span>' +
                    '<span class="glyphicon glyphicon-transfer"></span> Contraoferta </a>'
            }

             element.append($compile(tag)(scope));
        }
    };
}]);

//Contar numero de fotos
angular.module('elTrato.system').directive('photos', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var photos = attrs.numphotos;
            photos = JSON.parse(photos);
            photos = photos.length;

            var  tag = '<div class="col-md-12 numPhotos">' +
                            '<span class="glyphicon glyphicon-camera"> </span> ' + photos +
                       '</div>';

            element.append($compile(tag)(scope));
        }
    };
}]);

//Formulario contraoferta
angular.module('elTrato.system').directive('formDealDiv', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        templateUrl: '../views/forms/dealForm.html',
        link:function (scope, element, attrs) {
            scope.mostrar = true;
            scope.sendDeal = function() {
                console.log(this.oferta);
                scope.mostrar = false;
            }
        }
    };
}]);

//Modal contraoferta
angular.module('elTrato.system').directive('modalHeaderDeal', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/deal/dealHeader.html'
    }
}]);

angular.module('elTrato.system').directive('modalBodyDeal', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/deal/dealBody.html'
    }
}]);

angular.module('elTrato.system').directive('modalFooterDeal', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/deal/dealFooter.html',
        link: function (scope, element, attrs) {
            scope.dealDiv = true;

            scope.dealButton = function (event) {
                scope.dealDiv = true;
                scope.productDiv = false;
                scope.barterDiv = false;
                angular.element('a').removeClass('active');
                angular.element(event.target).addClass('active');
            };

            scope.productOffer = function (event) {
                scope.dealDiv = false;
                scope.productDiv = true;
                scope.barterDiv = false;
                angular.element('a').removeClass('active');
                angular.element(event.target).addClass('active');
            }

            scope.barterButton = function (event) {
                scope.dealDiv = false;
                scope.productDiv = false;
                scope.barterDiv = true;
                angular.element('a').removeClass('active');
                angular.element(event.target).addClass('active');
            }
        }
    }
}]);
//End modal contraoferta

//Modal trato
angular.module('elTrato.system').directive('modalHeaderTrato', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/trato/tratoHeader.html'
    }
}]);

angular.module('elTrato.system').directive('modalBodyTrato', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/trato/tratoBody.html'
    }
}]);

angular.module('elTrato.system').directive('modalFooterTrato', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../views/modals/trato/tratoFooter.html'
    }
}]);
//End modal trato

angular.module('elTrato.system').directive('isFavoriteModal', ['$rootScope', '$compile', '$http', 'toaster', function ($rootScope, $compile, $http, toaster) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs, isfavoriteCrtl) {
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

// Favorites general
angular.module('elTrato.system').directive('isFavorite', ['$compile', '$http', 'toaster', function ($compile, $http, toaster) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var favorite = attrs.favorite;
            var favorites = window.user.favorites;
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
        }
    };
}]);

