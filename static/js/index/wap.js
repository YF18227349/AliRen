layui.define(['jquery', 'fun'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        _val = null;
    let body = $('body');
    fun.ready(() => {
        // 打开菜单
        var inst = new mdui.Drawer('#drawer');
        $('[menu-toggle]').on('click', function () {
            inst.toggle();
        });
        // 主轮播图
        new Swiper('.swiper-container-main', {
            pagination: {
                el: '.pagination-main',
            },
            autoplay: true,
            loop: true
        });
        // 首页数字抖动效果
        function showNum(start, end, obj) {
            var t = setInterval(function () {
                if (start < end) {
                    start++;
                    $(obj).html(start);
                } else {
                    return false;
                    clearInterval(t);
                }
            }, 40);
        };
        layui.each($("[initPurNumber]"), function (k, v) {
            let start = $(v).attr('plus-start');
            let end = $(v).attr('plus-end');
            let obj = $(v);
            showNum(start, end, obj)
        });
        new Swiper('.swiper-product-recommended', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true
        });
        new Swiper('.swiper-product-advantages', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true
        });
        new Swiper('.swiper-engineering-case', {
            autoplay: {
                disableOnInteraction: true,
                delay: 2000
            },
            loop:true,
            pagination:{
                el:'.swiper-pagination1',
                clickable:true
            }
        });
        new Swiper('.swiper-company-advantage', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true
        });


        $('[lay-go-back]').on('click', function() {
            fun._back()
        });
       
    });
    exports('wap');
});