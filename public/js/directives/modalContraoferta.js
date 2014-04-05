/**
 * Created by Victor-BookPro on 04/04/14.
 */

"use strict";

angular.module('elTrato.system').directive('modalHeaderContraoferta', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/contraoferta/contraofertaHeader.html'
    }
}).directive('modalBodyContraoferta', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/contraoferta/contraofertaBody.html'
    }
}).directive('modalFooterContraoferta', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '../../views/modals/contraoferta/contraofertaFooter.html',
        link: function (scope) {

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
            };

            scope.barterButton = function (event) {
                scope.dealDiv = false;
                scope.productDiv = false;
                scope.barterDiv = true;
                angular.element('a').removeClass('active');
                angular.element(event.target).addClass('active');
            }
        }
    }
}).directive('formTruequeDiv', ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: '../../views/forms/truequeForm.html',
        link: function (scope) {

            scope.mostrar = true;
            var miTrueque = '';
            scope.trueque = function () {
                miTrueque = this.mitrueque.id;
            };
            scope.sendTrueque = function () {

                $http.post('/trueque', {params: {idTrato: miTrueque, idAnuncio: scope.tratos._id, comment: this.comentario,
                    interest: scope.coincidencia}})
                    .success(function (response) {
                        if (response.ok) {
                            scope.mostrar = false;
                            scope.alertOpciones =
                            { type: 'success',
                                title: 'Tu trueque se ha enviado correctamente',
                                msg: 'Si al usuario le interesa, en breves recibiras noticias suyas. Mucha suerte!' }
                            ;
                        } else {
                            scope.alertOpciones =
                            { type: 'danger',
                                title: 'Tu trueque no se ha enviado correctamente',
                                msg: 'Por favor, vuelve a intentarlo en unos minutos' }
                            ;
                        }
                    });
            };
        }
    };
}]).directive('formContraofertaDiv', ['$http', function ($http) {
    return {
        restrict: 'E',
        templateUrl: '../../views/forms/contraofertaForm.html',
        link: function (scope) {
            var update = false;

            scope.sendDeal = function () {
                if (this.oferta < scope.precio) {
                    scope.error = true;
                    scope.errorContra =
                    { type: 'danger',
                        msg: 'El precio que has introducido es menor al de tu ultima contraoferta de ' + scope.precio +
                            '€. Por favor envia una contraoferta mas elevada. '};
                } else if (this.oferta == scope.precio) {
                    scope.error = true;
                    scope.errorContra =
                    { type: 'danger',
                        msg: 'El precio que has introducido es igual a tu ultima contraoferta de ' + scope.precio +
                            '€. Por favor envia una contraoferta mas elevada. '};
                } else {
                    $http.post('/contraoferta', {params: {idAnuncio: scope.tratos._id, comment: this.comentario,
                        precio: this.oferta, precioOld: scope.precio, update: update, id: scope.id}})
                        .success(function (response) {
                            if (response.ok) {
                                scope.mostrarForm = false;
                                scope.mostrarAlert = true;
                                scope.alertOpciones =
                                { type: 'success',
                                    title: 'Tu contraoferta se ha enviado correctamente',
                                    msg: 'Si al usuario le interesa, en breves recibiras noticias suyas. Mucha suerte!' }
                                ;
                            } else if (response.update == "ok") {
                                scope.alertOpciones =
                                { type: 'success',
                                    title: 'Nueva contraoferta realizada',
                                    msg: 'Tu nueva contraoferta se ha realizado de forma correcta.'
                                };
                                scope.mostrarAlert = true;
                                scope.mostrarForm = false;
                            } else if (response.error == "ok") {
                                scope.error = true;
                                scope.errorContra =
                                { type: 'danger',
                                    msg: 'El precio que has introducido es menor al de tu ultima contraoferta de ' + scope.precio +
                                        '€. Por favor envia una contraoferta mas elevada. '};
                            } else if (response.error == "precioNull") {
                                scope.error = true;
                                scope.errorContra =
                                { type: 'danger',
                                    msg: 'Para poder realizar una contraoferta tienes que poner un precio.'};
                            } else {
                                scope.mostrarAlert = true;
                                scope.alertOpciones =
                                { type: 'danger',
                                    title: 'Tu contraoferta no se ha enviado correctamente',
                                    msg: 'Por favor, vuelve a intentarlo en unos minutos' }
                                ;
                            }
                        });
                }
            };

            scope.returnContra = function () {
                scope.mostrarAlert = false;
                scope.mostrarButton = false;
                scope.mostrarForm = true;
                update = true;
            };
        }
    };
}]);
