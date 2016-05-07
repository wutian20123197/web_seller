/**
 * offer详情
 * Created by wutian on 2016/5/7.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var offerDetailSchema = new Schema({
    main_category: String,
    sub_category : String,
    offer_area: String,
    offer_title: String,
    offer_price: Number,
    offer_num: Number,
    offer_detail_area: String,
    create_time:{type:Date,default:Date.now()},
    main_img: String,
    img_list: [{
        img_url: String
    }]
});

exports.model = mongoose.model('offer_details',offerDetailSchema);
