/**
 * 图片上传
 * Created by wutian on 2016/5/6.
 */

var formidable = require("formidable"); //载入 formidable
var fs = require('fs');

var exp = {
    upload: function(req , res){
        var form = new formidable.IncomingForm();
        form.uploadDir =  './public/tmp';  //文件上传 临时文件存放路径
        form.parse(req, function(error, fields, files){
            var file = files.img;
            var fName = (new Date()).getTime();
            switch (file.type){
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName =fName + ".png";
                    break;
            }
            var uploadDir = "./public/upload/" + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err+"\n");
                    res.end();
                }
                res.send({data: uploadDir.substring(1)}); //将相对路径转换为绝对路径
            });
        });
    },

    showImg: function(){

    }
};

exports.modelInfo = exp;