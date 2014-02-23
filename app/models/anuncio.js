'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Anuncio Schema
 */
var AnuncioSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    descripcion: {
        type: String,
        default: '',
        trim: true
    },
    tags: {
        type: Array,
        default: '',
        trim: true
    },
    precio: {
        type: Number,
        default: 0,
        trim: true
    },
    images: {
        type: Array,
        default: '',
        trim: true
    },
    locs: {
        type: Array
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
AnuncioSchema.path('descripcion').validate(function(descripcion) {
    return descripcion.length;
}, 'Descripcion cannot be blank');

/**
 * Statics
 */
AnuncioSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Anuncio', AnuncioSchema);
