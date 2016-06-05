/**
 * 类目
 * Created by wutian on 2016/5/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    categoryId: Number,
    categoryName : String,
    category_img: String,
    index: Number,
    itemList: [{
        name: String,
        link: String
    }]
});

exports.model = mongoose.model('categorys',userSchema);
