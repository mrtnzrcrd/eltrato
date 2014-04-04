/**
 * Created by Victor-BookPro on 04/04/14.
 */

"use strict";

angular.module('elTrato.system').directive('modalHeaderNologin', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/noLogin/noLoginHeader.html'
    }
}).directive('modalBodyNologin', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/noLogin/noLoginBody.html'
    }
}).directive('modalFooterNologin', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/noLogin/noLoginFooter.html'
    }
});