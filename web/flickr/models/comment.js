var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//此处schema类似sql server创建表格时可以定义约束
var CommentSchema = new Schema({
    image_id:   { type: ObjectId },
    email:      { type: String },
    name:       { type: String },
    gravatar:   { type: String },
    comment:    { type: String },
    timestamp:  { type: Date, 'default': Date.now }
});

//虚拟属性是个新东西，此处关联的是整个image schema，虽然不写入数据库
CommentSchema.virtual('image')
    .set(function(image){
        this._image = image;
    })
    .get(function() {
        return this._image;
    });

module.exports = mongoose.model('Comment', CommentSchema);
