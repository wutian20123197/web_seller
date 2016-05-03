/**
 * Created by wutian on 2016/5/3.
 */
var userModel = require('../model/user_model').user;

var exp = {

    onLogin: function (){
        var conditions = {'name':'wutian'};
        userModel.findOne(conditions,function(err,info) {
            console.log(info.name);
        });
    },
    /**
     * 用户注册
     */
    onRegister: function (){
        var conditions = {'name':'wutian', 'password':123456, "email": "807572915@qq.com"};
        userModel.create(conditions, function(err){
            console.log(err);
        });
    }
};

exports.modelInfo = exp;
