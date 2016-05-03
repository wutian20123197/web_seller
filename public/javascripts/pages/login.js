/**
 * 用户登录 注册 找回密码弹窗
 * Created by wutian on 2016/5/2.
 */
define('../pages/login', [
    'jquery',
    'dialog',
    'template',
    'tabs'
], function ($, Dialog, Template, Tabs) {
    var config = {
        showLoginDialogBtn: "#show-login-dialog",
        tplId: "login"
    };

    var $showLoginDialogBtn;

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
                Tabs.init({id: "#login-tabs-wrapper"});
            }
        },
        bindEvents: function () {
            var handlers = this.handlers;
            $showLoginDialogBtn.bind('click', handlers.showLoginDialog);
        }
    };
    return exports;
});
