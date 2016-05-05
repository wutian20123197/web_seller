/**
 * Created by wutian on 2016/5/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    account:String,
    password: String,
    email: String
});

exports.user = mongoose.model('users',userSchema);
