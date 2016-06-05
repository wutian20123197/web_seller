/**
 * Created by wutian on 2016/5/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
   from_id: String,
    to_id: String,
    from_name: String,
    to_name: String,
    message_content: String,
    head_img: String,
    offer_id: String,
    state: {type: Number, default: 0}
});

exports.model = mongoose.model('user_messages', messageSchema);