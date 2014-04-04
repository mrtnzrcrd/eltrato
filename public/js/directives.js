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
}]);
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

angular.module('elTrato.system').directive('myTrato', function () {
    return {
        scope: {
            anuncio1: '=dataAnuncio'
        },
        templateUrl: 'views/anuncios/trato.html'
    };
});

angular.module('elTrato.system').directive('myTrato2', function () {
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