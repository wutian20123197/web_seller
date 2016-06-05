/**
 * Created by wutian on 2016/5/22.
 */
var messageModel = require('../model/message_model').model;
var mongoose = require('mongoose');
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

    ignoreMessage: function(req, res){
        var messageId = mongoose.Types.ObjectId(req.body.id);
        console.log(messageId);
        messageModel.update({_id: messageId},{$set: {state: 1}}, function(err, info){
            if(!err){
                console.log(info);
                res.send({code: 200, message: "忽略成功"});
            }else{
                res.send({code: -100, message: "系统错误"});
            }
        });
    }

};
exports.modelInfo = exp;