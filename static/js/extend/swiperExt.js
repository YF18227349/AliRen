layui.define(['laydate'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        UA = fun.initWebSite().type;
    let SwiperArr = SwiperThumbArr = {};
    layui.each($("*[new-swiper]"), function (k, v) {
        let opt = optionFun(v);
        SwiperArr[k] = new Swiper($(v), opt);
        if (typeof ($(v).attr("site-for-thumbs")) != 'undefined') {
            let thumbDom = $('*[site-thumbs="' + $(v).attr("site-for-thumbs") + '"]');
            let thumbOpt = optionFun(thumbDom);
            console.log(thumbOpt);
            thumbOpt.thumbs = {
                swiper: SwiperArr[k],
            };
            SwiperThumbArr[k] = new Swiper(thumbDom, thumbOpt);
        }
    });


    function optionFun(v) {
        let option = {};
        option.autoplay = (typeof ($(v).attr('site-autoplay')) == 'undefined') ? false : {
            delay: fun._int($(v).attr('site-autoplay')),
            disableOnInteraction: false,
        };
        switch (UA) {
            case 'pc':
                if (option.autoplay != false) {
                    option.autoplay.disableOnInteraction = true;
                }
                break;
            default:
                if (option.autoplay != false) {
                    option.autoplay.disableOnInteraction = false;
                }
                break;
        }
        option.effect = (typeof ($(v).attr('site-effect')) == 'undefined') ? 'slide' : $(v).attr('site-effect');
        option.loop = (typeof ($(v).attr('site-loop')) == 'undefined') ? false : true;
        option.pagination = (typeof ($(v).attr('site-pagination')) == 'undefined') ? false : fun.str2json($(v).attr('site-pagination'));
        option.slidesPerView = (typeof ($(v).attr('site-slidesPerView')) == 'undefined') ? 1 : fun._int($(v).attr('site-slidesPerView'));
        option.slidesPerColumn = (typeof ($(v).attr('site-slidesPerColumn')) == 'undefined') ? 1 : fun._int($(v).attr('site-slidesPerColumn'));
        option.slidesPerColumnFill = (typeof ($(v).attr('site-slidesPerColumnFill')) == 'undefined') ? 'row' : "column";
        option.slidesPerGroup = (typeof ($(v).attr('site-slidesPerGroup')) == 'undefined') ? 1 : fun._int($(v).attr('site-slidesPerGroup'));
        option.spaceBetween = (typeof ($(v).attr('site-spaceBetween')) == 'undefined') ? 0 : fun._int($(v).attr('site-spaceBetween'));
        option.loopedSlides = (typeof ($(v).attr('site-loopedSlides')) == 'undefined') ? 1 : fun._int($(v).attr('site-loopedSlides'));
        option.loopAdditionalSlides = (typeof ($(v).attr('site-loopAdditionalSlides')) == 'undefined') ? 1 : fun._int($(v).attr('site-loopAdditionalSlides'));
        option.navigation = (typeof ($(v).attr('site-navigation')) == 'undefined') ? {} : fun.str2json($(v).attr('site-navigation'));
        option.watchSlidesVisibility = (typeof ($(v).attr('site-watchSlidesVisibility')) == 'undefined') ? false : true;//防止不可被点击
        option.watchSlidesProgress = (typeof ($(v).attr('site-watchSlidesProgress')) == 'undefined') ? false : true;
        option.freeMode = (typeof ($(v).attr('site-freeMode')) == 'undefined') ? false : true;
        option.loopFillGroupWithBlank = (typeof ($(v).attr('site-loopFillGroupWithBlank')) == 'undefined') ? false : true;
        option.observer = true;
        option.observeParents = true;
        return option;
    }

    // layui.each($("*[new-swiper]"), function (k, v) {
    //     let option = {};
    //     let ListenType = (typeof ($(v).attr('site-listen')) == 'undefined') ? false : $(v).attr('site-listen');
    //     option.on = {
    //         transitionEnd: function (end) {
    //         },
    //         slideChange: function () {
    //             let index = this.activeIndex;
    //             switch (index) {
    //                 case 0:
    //                     switch (ListenType) {
    //                         case 'findVideos':
    //                             break;
    //                     }
    //                     console.log("重新回到0");
    //                     break;
    //                 default:
    //                     let prevDom = $(v).find('.swiper-slide').eq(index - 1);
    //                     switch (ListenType) {
    //                         case 'findVideos':
    //                             if (prevDom.find('*[video-control]').length == 1) {
    //                                 let that = prevDom.find('*[video-control]');
    //                                 let videoObj = videoArr[that.attr("video_key")];
    //                                 videoObj.pause();
    //                                 videoObj.currentTime(1);
    //                                 that.attr("video_is_play", 0);
    //                                 $(that).css({ 'display': 'block' });
    //                                 console.log(videoObj);
    //                             }
    //                             break;
    //                     }
    //                     console.log("当前索引" + index);
    //                     break;
    //             }
    //         },
    //     };
    //     option.autoplay = (typeof ($(v).attr('site-autoplay')) == 'undefined') ? false : {
    //         delay: fun._int($(v).attr('site-autoplay')),
    //         disableOnInteraction: true,
    //     };
    //     option.effect = (typeof ($(v).attr('site-effect')) == 'undefined') ? 'slide' : $(v).attr('site-effect');
    //     option.pagination = (typeof ($(v).attr('site-pagination')) == 'undefined') ? false : fun.str2json($(v).attr('site-pagination'));
    //     new Swiper($(v), option);
    // });
    exports('swiperExt');
});