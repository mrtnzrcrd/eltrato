'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Anuncio Schema
 */
var TratoSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        default: '',
        trim: true
    },
    comentario: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    anuncio: {
        type: Schema.ObjectId,
        ref: 'Anuncio'
    },
    trato: {
        type: Schema.ObjectId,
        ref: 'Anuncio'
    }
});

/**
 * Statics
 */
TratoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Trato', TratoSchema);
/**
 * Created by Victor-BookPro on 30/03/14.
 */
