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

angular.module('elTrato.system').directive('isFavorite', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var favorite = attrs.favorite;
            var favorites = window.user.favorites;
            var result = favorites.indexOf(favorite);
            var tag = '';

            if (result != -1) {
                tag = '<a class="btn btn-warning btn-sm" role="button" tooltip="Favorito"> ' +
                    '<span class="glyphicon glyphicon-star"></span> </a>'
            } else {
                tag = '<a id="{{anuncio._id}}" class="btn btn-favorite btn-sm" role="button" ' +
                    'ng-click="favoritosGeneral(anuncio._id)" tooltip="Añadir a favoritos"> ' +
                    '<span class="glyphicon glyphicon-star-empty"></span> </a>'
            }

            element.append($compile(tag)(scope));
        }
    };
}]);

angular.module('elTrato.system').directive('isTrueque', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var trueque = attrs.trueque;
            var tag = '';

            if (trueque == "true") {
                tag = '<a href="#" class="btn btn-deal btn-sm" role="button" tooltip="Contraoferta" ' +
                    'data-ng-repeat="trueque in anuncio.opciones" ng-switch on="trueque.trueque"> ' +
                    '<span class="glyphicon glyphicon-transfer"></span> Contraoferta </a>'
            }

             element.append($compile(tag)(scope));
        }
    };
}]);

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