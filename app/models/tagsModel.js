/**
 * Created by Victor-BookPro on 06/04/14.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Anuncio Schema
 */
var TagsSchema = new Schema({
    tag: {
        type: String
    }
});

/**
 * Statics
 */
TagsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Tags', TagsSchema);