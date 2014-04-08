/**
 * Created by Victor-BookPro on 06/04/14.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tags = mongoose.model('Tags'),
    fs = require('fs'),
    _ = require('lodash');


exports.saveTagsInterest = function (interest) {
    var j = 0,
        x = 0,
        search = [],
        searchTemp = '';

    for (j = 0; j < interest.length; j++) {
        search = interest[j].split(" ");
        console.log(search);
        if (search.length === 1) {
            for (x = 0; x < search.length; x++) {
                if (search[x].length >= 2) {
                    searchTemp = search[x].toString().toLowerCase();
                    var tag = new Tags();
                    tag.tag = searchTemp;

                    tag.save(function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('correcto');
                        }
                    });
                }
            }
        }
    }
};

exports.saveTags = function (tags) {
    var i = 0;

    for (i = 0; i < tags.length; i++) {
        if (tags.length > 2) {
            var tag = new Tags();
            tag.tag = tags[i];

            tag.save( function (err) {
                if (err) {
                    console.log('error');
                } else {
                    console.log('correcto');
                }
            })
        }
    }
};

exports.findTagInterest = function (interest, callback) {
    interest = interest.toString().toLowerCase();
    Tags.findOne({tag : interest}).exec(function (err, tag) {
        if (tag) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

exports.searchTag = function (req, res) {
    console.log(req.query.tag);
    Tags.find({tag: { $regex: req.query.tag.toString().toLowerCase()}}, {_id: 0, tag : 1}).exec(function (err, tags) {
        if (tags) {
            res.jsonp(tags);
        }
    })
};