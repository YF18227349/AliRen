layui.define(['jquery', 'fun'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        _val = null;
    let body = $('body');
    fun.ready(() => {
        // 首页数字抖动效果
        function showNum(start, end, currentDom) {
            let t = setInterval(function () {
                if (start < end) {
                    start++;
                    $(currentDom).html(start);
                } else {
                    return false;
                    clearInterval(t);
                }
            }, 40);
        };
        layui.each($("[initPurNumber]"), function (k, v) {
            let start = parseInt($(v).attr('plus-end')) - parseInt($(v).attr('plus-difference'));
            let end = parseInt($(v).attr('plus-end'));
            let currentDom = $(v);
            showNum(start, end, currentDom)
        });
    });
    exports('showNumber');
});