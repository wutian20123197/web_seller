/**
 * Created by wutian on 2016/5/22.
 */
var messageModel = require('../model/message_model').model;
var exp = {

    addMessage: function(req, res){
        messageModel.create(req.body, function(err, info){
            if(!err){
                res.send({code: 200, data: req.body});
            }else{
                res.send({code: -100, message: "系统错误"});
            }
        });
    },

    replyMessage: function(){

    }

};
exports.modelInfo = exp;