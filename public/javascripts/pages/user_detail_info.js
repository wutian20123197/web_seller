/**
 * Created by wutian on 2016/5/8.
 */
require(['../lib/config'], function () {
    require([
        'jquery',
        '../pages/login',
        '../pages/publish_offer',
        "model",
        "dialog"
    ], function ($, Login, Publish, Model, Dialog) {

        var config = {
            uploadForm: "#upload-head-form",
            uploadLogoBtn: "#upload-logo-btn",
            imgWrapper: ".logo-wrapper",
            saveUserBtn: "#save-user-info"
        };
        var $uploadLogoBtn, $imgWrapper, $saveUserBtn;
        var exports = {
            init: function(){
                $uploadLogoBtn = $(config.uploadLogoBtn);
                $imgWrapper = $(config.imgWrapper);
                $saveUserBtn = $(config.saveUserBtn);
                this.intiEvents();
            },

            intiEvents: function(){
                Login.init();
                Publish.showPublishDialog();
                this.changeItem();
                $uploadLogoBtn.bind('click', this.uploadImg);
                $("#change-password").bind("click", this.updatePassword);
                $saveUserBtn.bind('click',this.saveUserInfo);
                $(".remove").bind("click", this.removeMyCollectOffer);
            },

            /**
             * 头像上传
             */
            uploadImg: function () {
                var formData = new FormData($(config.uploadForm)[0]);
                $.ajax({
                    url: '/uploadPicture',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        var img = '<img class="pre-view-offer-img" width="100" height="100" src="' + res.data + '"/>';
                        $imgWrapper.html(img);
                        Dialog.success("头像上传成功！");
                    },
                    error: function (returndata) {
                        alert("系统错误");
                    }
                });
            },

            /**
             * 移除我的收藏
             */
            removeMyCollectOffer: function(){
                var $this = $(this);
                var id = $this.data("id");
                Model.getRequestByParams('remove_my_collect_offer', {id: id}, function(data){
                    if(data.code === 200){
                        Dialog.success(data.message);
                        $this.closest(".collect-list").remove();
                    }
                })
            },

            /**
             * 保存用户信息
             */
            saveUserInfo: function(){
                var nickName = $("#nick-name").val();
                var sexType = $("#sex-type").val();
                var headImg = $(".pre-view-offer-img").attr("src");
                var params = {
                    head_img: headImg,
                    nick_name: nickName,
                    sex_type: sexType,
                    account: localStorage.getItem('account')
                };
                Model.getRequestByParams('update_user_info',params, function(data){
                    if(data.code === 200){
                        Dialog.success("用户信息修改成功！")
                    }
                })
            },

            getCollectList: function(){
                Model.getRequestByParams("get_collect_list", {}, function(data){
                    console.log(data);
                })
            },

            /**
             * 修改密码
             */
            updatePassword: function(){
                var account = localStorage.getItem('account');
                var password = $("#current-password").val();
                var newPassword = $("#new-password").val();
                var confirmNewPassword = $("#confirm-new-password").val();

                if(newPassword !== confirmNewPassword){
                    Dialog.error("新密码前后两次输入不相同，请重新输入");
                    $("#new-password").val("");
                    $("#confirm-new-password").val("");
                    return false;
                }
                var valid = $("#password-reset-form").isValid;
                if(valid){
                    var params = {
                        account: account,
                        password: password,
                        newpassword: newPassword
                    };
                    Model.getRequestByParams('update_user_password',params, function(data){
                        if(data.code === 200){
                            Dialog.success(data.message);
                        }else{
                            Dialog.error(data.message);
                        }
                    });
                }else{
                    return false;
                }

            },



            changeItem: function(){
            $("#navItem>li").click(function(){
                var itemName = $(this).text();
                $(this).parent().children().removeClass("active");
                $(this).addClass("active");
                $("#info").children().addClass("show-none");
                switch (itemName){
                    case "个人信息":
                        $("#picSet").removeClass("show-none");
                        break;
                    case "修改密码":
                        $("#changePwd").removeClass("show-none");
                        break;
                    case "个人消息":
                        $("#myMessage").removeClass("show-none");
                        break;
                    case "我的发布":
                        $("#myPublish").removeClass("show-none");
                        break;
                    case "我的收藏":
                        $("#myCollect").removeClass("show-none");
                        exports.getCollectList();
                        break;
                    default :break;
                }
            })
        }
        };

        exports.init();
    });
});