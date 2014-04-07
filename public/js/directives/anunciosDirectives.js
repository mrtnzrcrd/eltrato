/**
 * Created by Victor-BookPro on 04/04/14.
 */
"use strict";

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
}]).directive('ngFileOver', function () {
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
}).directive('ngFileSelect', [ '$fileUploader', function ($fileUploader) {
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
}]).directive('textcomplete', ['Textcomplete', '$http', function (Textcomplete, $http) {
    return {
        restrict: 'EA',
        scope: {
            members: '=',
            message: '='
        },
        template: '<textarea ng-model=\'message\' type=\'text\' name="Descripcion" id="descripcion" ' +
            'cols="30" rows="10" placeholder="Descripcion" class="form-control" required></textarea>',
        link: function (scope, iElement, iAttrs) {
            var mentions = [];
            var ta = iElement.find('textarea');
            var textcomplete = new Textcomplete(ta, [
                {
                    match: /(^|\s)#(\w*)$/,
                    search: function (term, callback) {
                        if (term.length >= 2) {
                            if (mentions.indexOf(term) === -1) {
                                $http.get('/searchTag', {params: {tag: term}}).success(function (response) {
                                    console.log(response);
                                    for (var i = 0; i < response.length; i++) {
                                        mentions.push(response[i].tag);
                                    }
                                });
                            }
                        }
                        callback($.map(mentions, function (mention) {
                            return mention.toLowerCase().indexOf(term.toLowerCase()) === 0 ? mention : null;
                        }));
                    },
                    index: 2,
                    replace: function (mention) {
                        return '$1#' + mention + ' ';
                    }
                }
            ]);

            $(textcomplete).on({
                'textComplete:select': function (e, value) {
                    scope.$apply(function () {
                        scope.message = value
                    })
                },
                'textComplete:show': function (e) {
                    $(this).data('autocompleting', true);
                },
                'textComplete:hide': function (e) {
                    $(this).data('autocompleting', false);
                }
            });
        }
    }
}]);
