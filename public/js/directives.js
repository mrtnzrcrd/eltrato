'use strict';

window.angular.module('mean.upload', [])
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