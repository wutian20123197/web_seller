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
                $(".publish-message").bind("click", this.publishMessage);
                $(".reply-message").bind("click", this.replyMessage);
                $(".reply-publish-message").bind("click", this.replyPublishMessage);
            },

            /**
             * 通过回复留言的方式发表留言
             */
            replyPublishMessage: function(){
                var $this = $(this);
                var message = $this
                    .closest(".sl-detail-do-records")
                    .find("textarea").val();
                if(!message){
                    Dialog.error("留言信息不能为空！");
                    return false;
                }
                var params = {};
                params.to_id = $this.data("id");
                params.to_name = $this.data("name");
                params.from_id = localStorage.getItem('account');
                params.head_img = localStorage.getItem('headImg');
                params.from_name = localStorage.getItem('userName');
                params.message_content = message;
                params.offer_id = $this.data("offerid");
                Model.getRequestByParams('add_message', params, function(data){
                    if(data.code === 200){
                        Dialog.success("留言发布成功！");
                        $this.closest(".sl-detail-do-records").find("textarea").val("");
                        exports.setReplyMessageToList(data.data);
                        var $current = $this.closest('li').find('.hide-item');
                        $current.hide();
                    }
                })
            },

            setReplyMessageToList: function(data){
                var html = ' <li> <div class="item-message clear"> <div class="head-logo"> <img src="' + data.head_img + '" width="30" height="30"/>'
                    + ' <span class="user-name">'+data.from_name+ "回复"+ data.to_name +'</span> </div> <div class="content">'+ data.message_content +'</div> <div class="send-btn"> <a href="javascript:;">回复</a> </div> </div> </li>';
                $(".sl-detail-records-list").append(html);
            },

            /**
             * 留言回复功能
             */
            replyMessage: function (){
                var $this = $(this);
                var $current = $this.closest('li').find('.hide-item');
                $current.show(300);
                exports.resetMessageNum();
            },

            /**
             * 发表评论
             */
            publishMessage: function(){
                var $this = $(this);
                var message = $this
                    .closest(".sl-detail-do-records")
                    .find("textarea").val();
                if(!message){
                    Dialog.error("留言信息不能为空！");
                    return false;
                }
                var params = {};
                params.to_id = $this.data("id");
                params.to_name = $this.data("name");
                params.from_id = localStorage.getItem('account');
                params.head_img = localStorage.getItem('headImg');
                params.from_name = localStorage.getItem('userName');
                params.message_content = message;
                params.offer_id = $this.data("offerid");
                    Model.getRequestByParams('add_message', params, function(data){
                        if(data.code === 200){
                            Dialog.success("留言发布成功！");
                            $this.closest(".sl-detail-do-records").find("textarea").val("");
                            exports.setMessageToList(data.data);
                            exports.resetMessageNum();
                        }
                    });
            },

            resetMessageNum: function(){
                var num = $("#message-num").text();
                num++;
                $("#message-num").text(num);
            },

            /**
             * 更新留言列表
             */
            setMessageToList: function(data){
                var html = ' <li> <div class="item-message clear"> <div class="head-logo"> <img src="' + data.head_img + '" width="30" height="30"/><span class="user-name">'
                        + data.from_name+ '</span>  </div> <div class="content">'+ data.message_content +'</div> <div class="send-btn"> <a href="javascript:;">回复</a> </div> </div> </li>';
                $(".sl-detail-records-list").append(html);
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