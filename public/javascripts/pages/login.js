/**
 * 用户登录 注册 找回密码弹窗
 * Created by wutian on 2016/5/2.
 */
define('../pages/login', [
    'jquery',
    'dialog',
    'template',
    'tabs',
    'model'
], function ($, Dialog, Template, Tabs, Model) {
    var config = {
        showLoginDialogBtn: "#show-login-dialog",
        onRegisterBtn: "#register-btn",
        tplId: "login",
       registerAccount: '#register-account',
        registerPassword: "#register-password",
        registerrePasswprd: "#register-repassword",
        registerEmail: "#register-email"

    };

    var $showLoginDialogBtn, $registerBtn;

    var exports = {
        init: function () {
            $showLoginDialogBtn = $(config.showLoginDialogBtn);
            this.bindEvents();
        },
        handlers: {

            /**
             * 获取登录框模板
             */
            getTpl: function () {
                var tpl = Template("login", {name: "wutian"});
                return tpl || "";
            },

            showLoginDialog: function () {
                var html = exports.handlers.getTpl();
                Dialog.defaults.transition = "zoom";
                Dialog.confirm()
                    .set({'labels': {ok: '发布', cancel: '取消'}, 'title': "二手物品交易网站"})
                    .setContent(html)
                    .show();
                $(".ajs-footer").hide();
                exports.handlers.initDialogParams();
            },

            /**
             * 初始化弹窗需要的注册事件
             */
            initDialogParams : function() {
                Tabs.init({id: "#login-tabs-wrapper"});
                $registerBtn = $(config.onRegisterBtn);
                $registerBtn.bind('click',exports.handlers.doRegister);
            },

            doRegister : function() {
               var account = $(config.registerAccount).val();
              Model.getRequestByParams('do_register', {name: "wutian"}, function(data){
                  alert(data);
              });
            }
        },
        bindEvents: function () {
            var handlers = this.handlers;
            $showLoginDialogBtn.bind('click', handlers.showLoginDialog);
        }
    };
    return exports;
});
