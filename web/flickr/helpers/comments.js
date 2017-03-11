/* jshint node: true */
"use strict"

var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function(callback) {
		//寻找最新的5条评论
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } },
            function(err, comments){
                var attachImage = function(comment, next) {
				    //根据这条评论的ID找到对应的图片
                    models.Image.findOne({ _id : comment.image_id},
                        function(err, image) {
                            if (err) throw err;

                            comment.image = image; //comment 模式的虚拟属性image
                            next(err); //next是attachImage的输入参数，acts as chain link
                        });
                };
				//对5条评论都应用attachImage
                async.each(comments, attachImage,
                    function(err) {
						//以下语句当5条评论都执行完了才执行,callback是newest::function的输入参数
                        if (err) throw err;
                        callback(err, comments);
                    });
            });
    }
};
