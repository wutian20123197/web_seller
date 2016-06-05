/**
 * Created by wutian on 2016/5/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    account:String,
    password: String,
    email: String,
    head_img: {type:String, default: "/public/upload/1463898859881.jpg"},
    collect_list:{type: Array},
    nick_name: String,
    state: {type:Number, default: 1},
    sex_type: {type:String, default: "保密"},
    real_name: String,
    interest_list: {type: Array}
});

exports.user = mongoose.model('users',userSchema);
