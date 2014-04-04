/**
 * Created by Victor-BookPro on 30/03/14.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Trato = mongoose.model('Trato'),
    fs = require('fs'),
    _ = require('lodash'),
    anuncio = require('./anunciosCtrlServer');

exports.createTrueque = function (req, res) {
    var trato = new Trato();

    trato.trato = req.body.params.idTrato;
    trato.anuncio = req.body.params.idAnuncio;
    trato.user = req.user._id;
    trato.comentario = req.body.params.comment;
    trato.tipo = 'trueque';
    trato.interest = req.body.params.interest;

    trato.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trato: trato
            });
        } else {
            res.jsonp({ok: 'ok'});
        }
    });
};

exports.createContraoferta = function (req, res) {

    if (req.body.params.precio <= req.body.params.precioOld) {
        res.jsonp({error : 'ok'});
    } else {
        if (req.body.params.update) {
            Trato.update({_id: req.body.params.id}, {$set: {aceptado: 0, precio: req.body.params.precio, comentario: req.body.params.comment}}).exec(function (err) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp({update: "ok"});
                }
            });
        } else {
            var trato = new Trato();

            trato.anuncio = req.body.params.idAnuncio;
            trato.user = req.user._id;
            trato.comentario = req.body.params.comment;
            trato.tipo = 'contraoferta';
            trato.precio = req.body.params.precio;
            trato.visto = false;

            trato.save(function (err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        trato: trato
                    });
                } else {
                    res.jsonp({ok: 'ok'});
                }
            });
        }
    }
};

exports.find = function (req, res) {
    Trato.find().sort('-created').populate('user', 'name username').populate('anuncio').exec(function (err, tratos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(tratos);
        }
    });
};

/*function getDateDiff(date1, date2) {
 var second = 1000,
 minute = second * 60,
 date1 = new Date(date1).getTime();
 date2 = (date2 == 'now') ? new Date().getTime() : new Date(date2).getTime(); // now means current date
 var timediff = date2 - date1;
 if (isNaN(timediff)) return NaN;
 return Math.floor(timediff / minute);
 }*/

exports.comprobarTrueques = function (req, res) {
    var ok = false;
    Trato.find({user: req.query.idUser, anuncio: req.query.idTrato, tipo: 'trueque'}, {_id: 0, trato: 1}).sort('-created').exec(function (err, trato) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (trato.length > 0) {
                /*console.log(trato);
                 console.log('tiempo server: ' + trato[0].created);
                 var actual = new Date().getTime();
                 console.log(actual);
                 var result = getDateDiff(trato[0].created, 'now');
                 console.log(result);*/
                ok = true;
                anuncio.misTratos(req, res, ok, trato);
            } else {
                ok = false;
                anuncio.misTratos(req, res, ok);
            }

        }
    });
};

exports.comprobarContraoferta = function (req, res) {

    Trato.find({user: req.user._id, anuncio: req.query.idTrato, tipo: 'contraoferta', aceptado: 2}).count().exec(function (err, contraoferta) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (contraoferta > 0) {
                /*console.log(trato);
                 console.log('tiempo server: ' + trato[0].created);
                 var actual = new Date().getTime();
                 console.log(actual);
                 var result = getDateDiff(trato[0].created, 'now');
                 console.log(result);*/

                res.jsonp({aceptado: "true"});
            } else {
                Trato.findOne({user: req.user._id, anuncio: req.query.idTrato, tipo: 'contraoferta', aceptado: 1}, {precio: 1}).exec(function (err, contraoferta) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        if (contraoferta) {
                            res.jsonp({aceptado: "false", contraoferta: contraoferta});
                        } else {
                            Trato.find({user: req.user._id, anuncio: req.query.idTrato, tipo: 'contraoferta', aceptado: 0}).count().exec(function (err, contraoferta) {
                                if (err) {
                                    res.render('error', {
                                        status: 500
                                    });
                                } else {
                                    if (contraoferta > 0) {
                                        res.jsonp({aceptado: "nulo"});
                                    } else {
                                        res.jsonp({aceptado: 0});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};

