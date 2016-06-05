/**
 * Created by wutian on 2016/6/4.
 */
require(['../lib/config'], function () {
    require([
        'jquery',
        '../pages/login',
        'model',
        'dialog'
    ], function ($, Login, Model, Dialog) {
        var exp = {
            init: function(){
                this.initEvent();
            },

            initEvent: function(){
                Login.init();
                $(".refuse").bind("click", this.refuseReport);
                $(".drop-down").bind("click", this.addToBlackList);
            },

            /**
             * 回绝举报
             */
            refuseReport: function(){
                var id = $(this).data('id');
                Model.getRequestByParams('refuse_report', {id: id}, function(info){
                    if(info.code === 200){
                        Dialog.success(info.message);
                        setTimeout(function(){
                           window.location.reload();
                        }, 800);
                    }
                });
            },

            addToBlackList: function(){
                var account = $(this).data('account');
                Model.getRequestByParams('add_to_black_list', {account: account}, function(info){
                    if(info.code === 200){
                        Dialog.success(info.message);
                        setTimeout(function(){
                            //window.location.reload();
                        }, 800);
                    }
                });
            }
        };

        exp.init();
    });
});
