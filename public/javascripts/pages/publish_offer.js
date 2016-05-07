/**
 * Created by wutian on 2016/5/2.
 */
define('../pages/publish_offer', [
    'jquery',
    'validator',
    'model',
    'dialog'
], function ($, Valid, Model, Dialog) {
    var config = {
        mainCategory: "#main-category",
        subCategory: "#sub-category",
        uploadForm: "#uploadForm",
        uploadBtn: "#upload-btn",
        imgWrapper: "#img-wrapper",
        publishOfferForm: "#publish-offer-form",
        offerArea: "#offer-area",
        offerTitle: "#offer-title",
        offerPrice: "#offer-price",
        offerNum: "#offer-num",
        offerDetailArea: "#offer-detail-area",
        offerDegree: "#offer-degree",
        offerTelNum: "#tel-num"
    };
    var $mainCategory, $subCategory, $uploadBtn, $imgWrapper, $publishOfferForm,
        $offerArea, $offerTitle, $offerPrice, $offerNum, $offerDetailArea,
        $offerDegree, $offerTelNum;

    var exports = {
        init: function () {
            $mainCategory = $(config.mainCategory);
            $subCategory = $(config.subCategory);
            $uploadBtn = $(config.uploadBtn);
            $imgWrapper = $(config.imgWrapper);
            $publishOfferForm = $(config.publishOfferForm);
            $offerArea = $(config.offerArea);
            $offerTitle = $(config.offerTitle);
            $offerPrice = $(config.offerPrice);
            $offerNum = $(config.offerNum);
            $offerDetailArea = $(config.offerDetailArea);
            $offerDegree = $(config.offerDegree);
            $offerTelNum = $(config.offerTelNum);
            this.initEvents();
        },

        initEvents: function () {
            this.getMainCategoryList();
            $mainCategory.bind('change', this.getSubCategorysByID);
            $uploadBtn.bind('click', this.uploadImg);
        },

        /**
         * 图片上传
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
                    var img = '<img class="pre-view-offer-img" src="' + res.data + '"/>';
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
        getMainCategoryList: function () {
            var html = "<option value=''>选择主类目</option>";
            Model.getRequestByParams("get_main_category_list", {}, function (res) {
                $.each(res.data, function (i, v) {
                    html += "<option value='" + v.categoryId + "'>" + v.categoryName + "</option>";
                });
                $mainCategory.html(html);
            });
        },

        /**
         * 获取子分类通过 主类目id
         */
        getSubCategorysByID: function () {
            var mainId = $mainCategory.val();
            var params = {
                categoryId: mainId
            };
            var html = "<option value=''>选择子类目</option>";
            Model.getRequestByParams('get_sub_category_list', params, function (res) {
                var list = res.data.itemList || [];
                $.each(list, function (i, v) {
                    html += "<option value='" + v.name + "'>" + v.name + "</option>";
                });
                $subCategory.html(html);
            });
        },

        /**
         * 发布offer
         */
        publishOffer: function () {
            //校验表单
            var isValid = $publishOfferForm.isValid();
            if(isValid){
                var params = {};
                params.main_category = $mainCategory.val();
                params.sub_category = $subCategory.val();
                params.offer_area = $offerArea.val();
                params.offer_title = $offerTitle.val();
                params.offer_price = $offerPrice.val();
                params.offer_num = $offerNum.val();
                params.offer_detail_area = $offerDetailArea.val();
                params.offer_degree = $offerDegree.val();
                params.img_list = this.getImages();
                params.main_img =  params.img_list[0].img_url;

                Model.getRequestByParams("add_offer", params, function (res) {
                    if (res.code === 200) {
                        Dialog.success("发布成功！");
                    }
                });
            }
        },

        /**
         * 获取图片urls
         */
        getImages: function () {
            var imgs = $imgWrapper.find('img');
            var imgList = [];
            $.each(imgs, function (i, v) {
                imgList.push({img_url: $(v).attr('src')});
            });
            return imgList;
        }
    };
    return exports;
});
