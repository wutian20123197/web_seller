/**
 * 类目 offerlist 页面
 * Created by wutian on 2016/5/8.
 */
require(['../lib/config'], function () {
    require([
        'jquery',
        '../pages/login',
        '../pages/publish_offer',
        'template',
        'model'
    ], function ($, Login, Publish, Template, Model) {
        var config = {
            selectConditon: ".sl-category-item-content",
            current: "current"
        };
        var subCategoryName,$selectConditon;
        var conditions = {
            offer_degree: "",
            offer_area: "",
            sub_category: ""
        };
        var exports = {
            //offerlist模板
            tpl: ' <div class="sl-hot-recommend">'
            + '<div class="sl-hot-recommend">'
            + '<div class="sl-hot-recommend-body">'
            + '<ul class="clear">'
            + '{{each offerList}}'
            + '<li class="sl-offer-list">'
            + '<div class="sl-offer-list-imgbox">'
            + '<a href="/detail/{{$value._id}}">'
            + '<img src="{{$value.main_img}}" alt=""/>'
            + '</a>'
            + '</div>'
            + '<div class="sl-offer-text">'
            + '<p>{{$value.offer_title}}</p>'
            + '<div class="mt10 clear">'
            + '<div class="sl-offer-text-price">'
            + '<span class="f14">￥</span><span class="f14">{{$value.offer_price}}</span>'
            + '</div>'
            + '<div class="sl-offer-text-area">'
            + '<span><i class="iconfont">&#xe60c;</i>{{$value.offer_area}}</span>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</li>'
            + '{{/each}}'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>'
            ,

            init: function () {
                var me = this;
                $selectConditon = $(config.selectConditon);
                me.initEvent();
                var type = location.href.split('/')[4];
                //type=1 表示分类查询 type=2 表示全局搜索
                if(type == 1){
                    subCategoryName = me.getCategoryName();
                    conditions.sub_category = subCategoryName;
                }else if(type == 2){
                    var keywords = me.getCategoryName();
                    conditions.offer_title = keywords;
                }
                me.setOfferListHtml(conditions);
            },

            initEvent: function () {
                Login.init();
                Publish.showPublishDialog();
                $selectConditon.bind('click', exports.getConditions);
            },

            /**
             * 获取筛选条件
             */
            getConditions: function(){
                var $this = $(this);

                $this.addClass(config.current)
                    .siblings()
                    .removeClass(config.current);

                var name = $this.data('name');
                var val = $this.data('val');
                conditions[name] = val;
                exports.setOfferListHtml(conditions);
            },

            setOfferListHtml: function (params) {
                var me = this;
                Model.getRequestByParams('get_offer_list_bysubcategory',
                    params,
                    function (data) {
                        var render = Template.compile(me.tpl);
                        var html = render(data);
                        document.getElementById('content').innerHTML = html;

                        //商品数量
                        var totalNum = data.offerList.length;
                       $("#offer-num").html("共"+ totalNum + "件商品");
                    });
            },

            /**
             * 获取当前类目名称
             */
            getCategoryName: function () {
                var url = window.location.href;
                var name = url.split('/')[5];
                return decodeURIComponent(name);
            }

        };

        exports.init();
    });
});