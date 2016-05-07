/**
 * Created by wutian on 2016/5/2.
 */
define('../pages/publish_offer',[
        'jquery',
        'validator',
    'model'
    ], function ($, Valid, Model) {
        var config = {
            mainCategory: "#main-category",
            subCategory: "#sub-category",
            uploadForm: "#uploadForm",
            uploadBtn: "#upload-btn",
            imgWrapper: "#img-wrapper"
        };
    var $mainCategory, $subCategory, $uploadBtn, $imgWrapper;

    var exports = {
        init: function(){
            $mainCategory = $(config.mainCategory);
            $subCategory = $(config.subCategory);
            $uploadBtn = $(config.uploadBtn);
            $imgWrapper = $(config.imgWrapper);
            this.initEvents();
        },

        initEvents: function () {
            this.getMainCategoryList();
            $mainCategory.bind('change',this.getSubCategorysByID);
            $uploadBtn.bind('click',this.uploadImg);
        },

        uploadImg: function(){
            var formData = new FormData($(config.uploadForm)[0]);
            $.ajax({
                url: '/uploadPicture' ,
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    var img = '<img class="pre-view-offer-img" src="'+res.data+'"/>';
                    $imgWrapper.append(img);
                },
                error: function (returndata) {
                   alert("系统错误");
                }
            });
        },

        /**
         * 获取主类目名称列表
         */
        getMainCategoryList: function(){
            var html = "<option value=''>选择主类目</option>";
            Model.getRequestByParams("get_main_category_list",{},function(res){
                $.each(res.data, function(i, v){
                    html +=  "<option value='"+ v.categoryId+"'>"+ v.categoryName +"</option>";
                });
                $mainCategory.html(html);
            });
        },

        /**
         * 获取子分类通过 主类目id
         */
        getSubCategorysByID: function() {
            var mainId =  $mainCategory.val();
            var params = {
                categoryId: mainId
            };
            var html = "<option value=''>选择子类目</option>";
            Model.getRequestByParams('get_sub_category_list', params, function(res){
                var list = res.data.itemList || [];
                $.each(list, function(i, v){
                    html +=  "<option value='"+ '' +"'>"+ v.name +"</option>";
                });
                $subCategory.html(html);
            });
        }

    };
    return exports;
    });
