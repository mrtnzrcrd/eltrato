'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Anuncio = mongoose.model('Anuncio'),
    fs = require('fs'),
    _ = require('lodash');


/**
 * Find anuncio by id
 */
exports.anuncio = function (req, res, next, id) {
    if (req.params.anuncioId === "create") {
        return res.redirect('/#!/anuncios/create');
    } else {
        Anuncio.load(id, function (err, anuncio) {
            if (err) return next(err);
            if (!anuncio) return next(new Error('Failed to load anuncio ' + id));
            req.anuncio = anuncio;
            next();
        });
    }
};

/**
 * Create a anuncio
 */

function escapeRegExpTags(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\<\>\!\?\.\;\\\^\$\|]/g, "");
}

function escapeRegExpDescription(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\<\>\\\^\$\|]/g, "");
}

exports.create = function (req, res) {
    var anuncio = new Anuncio(req.body);
    anuncio.user = req.user;

    if (req.body.trueque) {
        var opciones = {trueque: req.body.trueque, need: req.body.need};
        anuncio.opciones = opciones;
        console.log(anuncio.opciones);
    }

    // Metodo para coger todos los #Hastags y guardarlos en una array

    var tempArrayTags = new Array();
    var tempArrayLower = new Array();
    var newArrayDescription = new Array();

    var descripcion = anuncio.descripcion.split(" ");
    var descripcion2 = anuncio.descripcion.split(" ");
    var contador = 0;
    for (var i = 0; i < descripcion.length; i++) {
        var tag = descripcion[i];
        var hastag = tag.charAt(0);
        if (hastag == '#') {
            tag = escapeRegExpTags(tag);
            tag = tag.substring(1, tag.length);
            tempArrayTags[contador] = tag;
            descripcion2.splice(tag, 1);
            contador++;
            tag.replace("#", "");
        }
        tag = escapeRegExpDescription(tag);
        newArrayDescription.push(tag);
    }

    var newDescripcion = newArrayDescription.join(" ");

    anuncio.descripcion = newDescripcion;
    // Fin del metodo para guargar #Hastags
    anuncio.tags = tempArrayTags;

    for (var i = 0; i < tempArrayTags.length; i++) {
        tempArrayLower.push(tempArrayTags[i].toLowerCase());
    }

    anuncio.tagsLower = tempArrayLower;

    if (anuncio.descripcion === '' && anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar los campos descripción, precio y añadir como minimo una imagen para poder ' +
                'insertar tu anuncio, gracias.'});
    } else if (tempArrayTags.length === 0 && anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag, rellenar el campo precio y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.precio === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo precio y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.precio === 0 && anuncio.descripcion === '') {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar los campos descripción y ' +
                'precio para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.descripcion === '' && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0 && anuncio.images.length === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag y ' +
                'añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0 && anuncio.precio === 0) {
        return res.jsonp({title: 'Se han producido los siguientes errores al insertar tu anuncio',
            errorTag: 'Tienes que rellenar el campo descripción con al menos un #hastag y ' +
                'el campo precio para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (anuncio.images.length === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tienes que añadir como minimo una imagen para poder insertar tu anuncio, gracias',
            anuncio: anuncio});
    } else if (tempArrayTags.length === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tiene que insertar al menos un #Hastag para poder insertar el anuncio',
            anuncio: anuncio});
    } else if (anuncio.precio === 0) {
        return res.jsonp({title: 'Se ha producido el siguiente error:',
            errorTag: 'Tienes que introducir un precio para poder insertar tu anuncio',
            anuncio: anuncio});
    } else {
        anuncio.save(function (err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    anuncio: anuncio
                });
            } else {
                res.jsonp(anuncio);
            }
        });
    }

};

/**
 * Update a anuncio
 */
exports.update = function (req, res) {
    var anuncio = req.anuncio;

    anuncio = _.extend(anuncio, req.body);

    anuncio.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                anuncio: anuncio
            });
        } else {
            res.jsonp(anuncio);
        }
    });
};

/**
 * Delete an anuncio
 */
exports.destroy = function (req, res) {
    var anuncio = req.anuncio;

    anuncio.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                anuncio: anuncio
            });
        } else {
            res.jsonp(anuncio);
        }
    });
};

/**
 * Show an anuncio
 */
exports.show = function (req, res) {
    res.jsonp(req.anuncio);
};

/**
 * List of Anuncios
 */

exports.all = function (req, res) {
   // Anuncio.find({locs: { $near: [global.lngUser, global.latUser], $maxDistance: 10}}).populate('user', 'name username').exec(function (err, anuncios) {
    Anuncio.find().sort('-created').populate('user', 'name username').exec(function (err, anuncios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(anuncios);
        }
    });
};

exports.mis = function (req, res) {
    var usuarioId = req.params.usuarioId;
    console.log("{ 'query': '" + req.params.usuarioId + "' }");
    Anuncio.find({user: usuarioId}).sort('-created').populate('user', 'name username').exec(function (err, anuncio) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('Resultado: ' + anuncio);
            res.jsonp(anuncio);
        }
    });
};

exports.find = function (req, res) {
    console.log("{ 'query': '" + req.params.q + "' }");
    var tags = req.params.q;
    var tagsParams = new Array();
    console.log("tagParams: " + tagsParams);
    tagsParams = tags.split("+");
    for (var i = 0; i < tags.length; i++) {
        tagsParams.push(tags[i].toLowerCase());
    }
    if (req.user) {
        Anuncio.find({user: {$ne: req.user._id}, tagsLower: { $in: tagsParams }}).sort('-created').populate('user', 'name username').exec(function (err, anuncio) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                console.log('Resultado: ' + anuncio);
                res.jsonp(anuncio);
            }
        });
    } else {
        Anuncio.find({tagsLower: { $in: tagsParams }}).sort('-created').populate('user', 'name username').exec(function (err, anuncio) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                console.log('Resultado: ' + anuncio);
                res.jsonp(anuncio);
            }
        });
    }
};

exports.findGeo = function (req, res) {
    var distance = 20;

    var tags = req.query.search;
    var tagsParams = new Array();

    var loc = req.query.geo;

    if (tags && loc) {
        tagsParams = tags.split("+");
        loc = loc.split("+");
        for (var i = 0; i < tags.length; i++) {
            tagsParams.push(tags[i].toLowerCase());
        }
        if (req.user) {
            Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, tagsLower: { $in: tagsParams }}).populate('user', 'name username').exec(function (err, anuncio) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    console.log('Resultado: ' + anuncio);
                    res.jsonp(anuncio);
                }
            });
        } else {
            Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, tagsLower: { $in: tagsParams }}).populate('user', 'name username').exec(function (err, anuncio) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    console.log('Resultado: ' + anuncio);
                    res.jsonp(anuncio);
                }
            });
        }

    } else if (tags && !loc) {
        tagsParams = tags.split("+");
        Anuncio.find({tagsLower: { $in: tagsParams }}).sort('-created').populate('user', 'name username').exec(function (err, anuncio) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                console.log('Resultado: ' + anuncio);
                res.jsonp(anuncio);
            }
        });
    } else if (!tags && loc) {
        loc = loc.split("+");
        if (req.user) {
            Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}}).populate('user', 'name username').exec(function (err, anuncio) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    console.log('Resultado: ' + anuncio);
                    res.jsonp(anuncio);
                }
            });
        } else {
            Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}}).populate('user', 'name username').exec(function (err, anuncio) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    console.log('Resultado: ' + anuncio);
                    res.jsonp(anuncio);
                }
            });
        }

    }
};

exports.findDistancePrice = function (req, res) {
    var distance = req.query.distance;
    distance = parseInt(distance);

    var desde = req.query.desde;
    var hasta = req.query.hasta;

    var tags = req.query.tags;
    var tagsParams = new Array();

    if (tags) {
        tags = tags.split('+');
        for (var i = 0; i < tags.length; i++) {
            tagsParams.push(tags[i].toLowerCase());
        }
    }

    if (desde && hasta) {
        desde = parseInt(desde);
        hasta = parseInt(hasta);

        var provisionalDesde = parseInt(desde);
        var provisionalHasta = parseInt(hasta);

        if (desde > hasta) {
            hasta = provisionalDesde;
            desde = provisionalHasta
        }
    }

    if (distance === 0) {
        distance = 1;
    }

    var loc = req.query.geo;
    loc = loc.split("+");

    if (req.user) {
        if (desde && hasta) {
            if (!tags) {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde, $lte: hasta}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde, $lte: hasta}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (desde && !hasta) {
            if (!tags) {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (!desde && hasta) {
            if (!tags) {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $lte: hasta}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $lte: hasta}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (!desde && !hasta) {
            if (!tags) {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({user: {$ne: req.user._id}, locs: { $near: loc, $maxDistance: distance / 111.12}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        }
    } else {
        if (desde && hasta) {
            if (!tags) {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde, $lte: hasta}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde, $lte: hasta}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (desde && !hasta) {
            if (!tags) {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $gte: desde}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (!desde && hasta) {
            if (!tags) {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $lte: hasta}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, precio: { $lte: hasta}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        } else if (!desde && !hasta) {
            if (!tags) {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            } else {
                Anuncio.find({locs: { $near: loc, $maxDistance: distance / 111.12}, tagsLower: { $in: tagsParams }})
                    .populate('user', 'name username').exec(function (err, anuncio) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            console.log('Resultado: ' + anuncio);
                            res.jsonp(anuncio);
                        }
                    });
            }
        }
    }
};

exports.upload = function (req, res) {
    var body = '';
    var header = '';
    var content_type = req.headers['content-type'];
    var boundary = content_type.split('; ')[1].split('=')[1];
    var content_length = parseInt(req.headers['content-length']);
    var headerFlag = true;
    var filename = 'dummy.bin';
    var filenameRegexp = /filename="(.*)"/m;
    console.log('content-type: ' + content_type);
    console.log('boundary: ' + boundary);
    console.log('content-length: ' + content_length);

    req.on('data', function (raw) {
        console.log('received data length: ' + raw.length);
        var i = 0;
        while (i < raw.length)
            if (headerFlag) {
                var chars = raw.slice(i, i + 4).toString();
                if (chars === '\r\n\r\n') {
                    headerFlag = false;
                    header = raw.slice(0, i + 4).toString();
                    console.log('header length: ' + header.length);
                    console.log('header: ');
                    console.log(header);
                    i = i + 4;
                    // get the filename
                    var result = filenameRegexp.exec(header);
                    if (result[1]) {
                        filename = result[1];
                    }
                    console.log('filename: ' + filename);
                    console.log('header done');
                }
                else {
                    i += 1;
                }
            }
            else {
                // parsing body including footer
                body += raw.toString('binary', i, raw.length);
                i = raw.length;
                console.log('actual file size: ' + body.length);
            }
    });

    req.on('end', function () {
        // removing footer '\r\n'--boundary--\r\n' = (boundary.length + 8)
        body = body.slice(0, body.length - (boundary.length + 8))
        console.log('final file size: ' + body.length);
        fs.writeFileSync('public/img/uploads/' + filename, body, 'binary');
        console.log('done');

        res.json({answer: "File transfer completed"});
    })
};

// db.anuncios.find({locs : {$near : [ 1.9138029, 41.418776199999996 ], $maxDistance : 119/111.12 }}).pretty()
// Consulta con km ej: 119 km;
