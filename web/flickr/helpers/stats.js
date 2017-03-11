/* jshint node: true */
'use strict';

var models = require('../models'),
    async = require('async');

module.exports = function(callback) {

    async.parallel([
        function(next) {
			/*
			全写
			models.Image.count({}, function(err, total){
				next(err, total);
			});
			*/
            models.Image.count({}, next);
        },
        function(next) {
            models.Comment.count({}, next);
        },
        function(next) {
			/*roup every document together and sum up all of their views into a single new field called
			viewsTotal
			*/
            models.Image.aggregate({ $group : {
                _id : '1',
                viewsTotal : { $sum : '$views' } //累计查看次数
            }}, function(err, result) {
                var viewsTotal = 0;
                if (result.length > 0) {
                    viewsTotal += result[0].viewsTotal;
                }
                next(null, viewsTotal);
            });
        },
        function(next) {
            models.Image.aggregate({ $group : {
                _id : '1',
                likesTotal : { $sum : '$likes' } //累计喜欢次数
            }}, function (err, result) {
                var likesTotal = 0;
                if (result.length > 0) {
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], function(err, results){
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    });
};
