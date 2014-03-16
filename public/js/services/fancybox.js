/**
 * Created by Victor-BookPro on 15/03/14.
 */

angular.module('elTrato.fancybox').factory('FancyboxService', function() {
    return {
        open: function(selector) {
            $.fancybox.open($(selector));
        },
        close: function() {
            $.fancybox.close();
        }
    };
});