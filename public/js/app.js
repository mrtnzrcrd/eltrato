'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.anuncios']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.anuncios', [ 'mean.upload']);