var models = require('../models');

module.exports = {
    popular: function(callback) {
		//找出最新的9张图
        models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }},
            function(err, images) {
                if (err) throw err;

                callback(null, images);
            });
    }
};
