/**
 * Created by wutian on 2016/5/1.
 */
require(['../lib/config'],function(){
    require([
        'jquery',
        "tabs",
        '../pages/login',
        '../pages/publish_offer',
        'model',
        "dialog"
    ],function($, Tabs, Login, Publish, Model, Dialog){
        var config = {
            itemPic: ".item",
            current: "current",
            macPic: ".max-pic"
        };

        var $itemPic, $macPic;
        var exports = {
            init: function(){
                $itemPic = $(config.itemPic);
                this.initEvents();
            },

            initEvents: function(){
                Tabs.init({id: "#detail-tab-wrapper"});
                Login.init();
                Publish.showPublishDialog();
                $itemPic.bind('click', this.changePics);
                $macPic = $(config.macPic);
                $(".collect-offer").bind('click',this.collectOffer);
                $("#report-offer").bind("click", this.reportOffer);
            },

            /**
             * 举报商品
             */
            reportOffer: function(){
                var $this = $(this);
                var offerId = $this.data('id');
                var params = {
                    id: offerId
                };
                Model.getRequestByParams("report_offer", params, function(res){
                    if(res.code === 200){
                        Dialog.success(res.message);
                    }
                });
            },

            /**
             * 收藏商品
             */
            collectOffer: function(){
                var $this = $(this);
                var offerId = $this.data('id');
                var params = {
                    id: offerId
                };
               Model.getRequestByParams('collect_offer',params, function(res){
                    if(res.code === 200){
                        var $collectNum = $("#collect-num");
                        var num = $collectNum.text();
                        num++;
                        $collectNum.text(num);
                        Dialog.success("收藏成功！");
                    }
               } );
            },

            changePics: function(){
                var me = $(this);
                me.addClass(config.current)
                    .siblings()
                    .removeClass(config.current);
               var currentImg = me.find("img").attr("src");
                $macPic.find("img").attr("src", currentImg);
            }
        };

        exports.init();
    });
});