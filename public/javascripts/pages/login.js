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
        //注册
        showLoginDialogBtn: "#show-login-dialog",
        onRegisterBtn: "#register-btn",
        tplId: "login",
        userRegisterForm: "#user-register-form",
        registerAccount: '#register-account',
        registerPassword: "#register-password",
        registerrePasswprd: "#register-repassword",
        registerEmail: "#register-email",

        //登录
        showRegisterDialogBtn: "#show-register-dialog",
        loginBtn: "#login-btn",
        loginAccount: "#login-account",
        loginPassword: "#login-password"

    };

    var $showLoginDialogBtn, $registerBtn, $userRegisterForm,
        $showRegisterDialogBtn, $loginBtn;

    var exports = {
        init: function () {
            $showLoginDialogBtn = $(config.showLoginDialogBtn);
            $showRegisterDialogBtn = $(config.showRegisterDialogBtn);
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

            /**
             * 显示登录弹框
             * @param type 0 登录 1注册 2找回密码
             */
            showDialog: function (e) {
                var html = exports.handlers.getTpl();
                Dialog.defaults.transition = "zoom";
                Dialog.confirm()
                    .set({ 'title': "二手物品交易网站"})
                    .setContent(html)
                    .show();
                $(".ajs-footer").hide();
                exports.handlers.initDialogParams();
                Tabs.selectTabs(e.data.type);
            },

            /**
             * 注销用户登录
             */
            loginOut: function(){
                localStorage.removeItem('account');
                localStorage.removeItem('userName');
                localStorage.removeItem('headImg');
                location.reload();
            },

            /**
             * 初始化弹窗需要的注册事件
             */
            initDialogParams: function () {
                Tabs.init({id: "#login-tabs-wrapper"});
                $registerBtn = $(config.onRegisterBtn);
                $loginBtn = $(config.loginBtn);
                $userRegisterForm = $(config.userRegisterForm);

                $loginBtn.bind('click', exports.handlers.doLogin);
                $registerBtn.bind('click', exports.handlers.doRegister);
            },

            /**
             * 用户注册
             * @returns {boolean}
             */
            doRegister: function () {
                var me = exports.handlers;
               var flag = me.chargeRegisterForm();
                if (!flag) {
                    return false;
                }
                var account = $(config.registerAccount).val();
                var password = $(config.registerPassword).val();
                var email = $(config.registerEmail).val();

                var params = {
                    "account": account,
                    "password": password,
                    "email": email
                };
                Model.getRequestByParams('do_register', params, function (data) {
                    if(data.code === 200){
                        Dialog.confirm().close();//关闭注册框
                        Dialog.success("注册成功，请登录！");
                    }
                });
            },

            /**
             * 用户登录
             */
            doLogin: function() {
                var params = {};
               params.account = $(config.loginAccount).val();
               params.password = $(config.loginPassword).val();
                Model.getRequestByParams('do_login', params, function (data) {
                    if(data.code === 200){
                        Dialog.confirm().close();
                        localStorage.setItem('account',data.data.account) ;
                        localStorage.setItem("userName", data.data.userName);
                        localStorage.setItem("headImg",data.data.headImg);
                        window.location.reload();
                    }
                });
            },

            /**
             * 搜索商品
             */
            searchOffers: function(){
                var keywords = $("#search-keywords").val();
                if(keywords){
                    window.location.href = "/search/2/" + keywords;
                }
            },

            /**
             * 校验注册表单格式
             */
            chargeRegisterForm: function () {
                var isValid = $userRegisterForm.isValid();
                var password = $(config.registerPassword).val();
                var rePassword = $(config.registerrePasswprd).val();
                if (password !== rePassword) {
                    Dialog.notify('前后两次输入密码不相同，请重新输入!', 'error', 3);
                    return false;
                }
                return true;
            }
        },

        showUserName: function(){
            var account = localStorage.getItem("account");
            if(account){
                var html = '<span>欢迎您，'+ account +'</span>';
                $("#userName").html(html);
                !(account === "admin") || $("#admin").show();
            }else{
                $("#show-login-dialog").html("亲，请登录");
                $("#show-register-dialog").html("免费注册");
            }
        },

        bindEvents: function () {
            var handlers = this.handlers;
            $showLoginDialogBtn.bind('click',{type: 0}, handlers.showDialog);
            $showRegisterDialogBtn.bind('click',{type: 1}, handlers.showDialog);
            this.showUserName();
            $("#login-out").bind("click", handlers.loginOut);
            $(".search").bind("click", handlers.searchOffers);
        }
    };
    return exports;
});
