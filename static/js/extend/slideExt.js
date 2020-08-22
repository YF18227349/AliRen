layui.define(['slider'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        slider = layui.slider,
        _val = null;
    let body = $('body');
    let slideArr = new Array();
    layui.each($("[lay-slide]"), function (k, dom) {
        let that = $(dom);
        let config = {
            max: that.attr('lay-max') ? fun._int(that.attr('lay-max')) : 100,
            min: that.attr('lay-min') ? fun._int(that.attr('lay-min')) : 0,
            value: that.attr('lay-value') ? fun._int(that.attr('lay-value')) : 1,
            step: that.attr('lay-step') ? fun._int(that.attr('lay-step')) : 1,
            title: that.attr('lay-title') ? that.attr('lay-title') : "",
            for: that.attr('lay-for') ? that.attr('lay-for') : "0",
        };
        slideArr[k] = slider.render({
            elem: that, //绑定元素
            max: config.max,
            min: config.min,
            value: config.value,
            step: config.step,
            input: true,
            setTips: function (value) { //自定义提示文本
                return value + config.title;
            },
            change: function (value) {
                if (config.for != "0") {
                    $("#" + config.for).val(value);
                }
            }
        });
        slideArr[k].setValue(config.value);
    });
    exports('slideExt');
});