var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require('async');

module.exports = function(viewModel, callback){
	//多线程
    async.parallel([
        function(next) {
            Stats(next);
        },
        function(next) {
            Images.popular(next);
        },
		//next不是递归，它与newest中的next相呼应,是一种延迟，代表Comments.newest都执行完毕
		//Once that next callback function is called, it is passed the results of all of its work.
        function(next) {
            Comments.newest(next);
        }
    ], function(err, results){
		//results装载了之前3个函数并行执行后的所有结果
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(viewModel);
    });
};
