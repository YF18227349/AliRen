layui.define(['laydate'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        layDate = layui.laydate,
        _val = null;
    let body = $('body');
    layui.each($("[lay-rolldate]"), function (k, dom) {
        let that = $(dom);
        let config = {
            beginYear: (typeof (that.attr('lay-min')) != 'undefined') ? that.attr('lay-min') : 1900,
            endYear: (typeof (that.attr('lay-max')) != 'undefined') ? that.attr('lay-max') : 2099,
            format: (typeof (that.attr('lay-format')) != 'undefined') ? that.attr('lay-format') : "YYYY-MM-DD hh:mm:ss",
            value: (typeof (that.attr('lay-value')) != 'undefined') ? that.attr('lay-value') : new Date(),
            position: (typeof (that.attr('lay-position')) != 'undefined') ? that.attr('lay-position') : "fixed",
        };
        new Rolldate({
            el: that[0],
            format: config.format,
            beginYear: config.beginYear,
            endYear: config.endYear,
        });
    });
    layui.each($("[lay-date]"), function (k, dom) {
        let that = $(dom);
        let config = {
            min: (typeof (that.attr('lay-min')) != 'undefined') ? that.attr('lay-min') : "1900-1-1 00:00:01",
            max: (typeof (that.attr('lay-max')) != 'undefined') ? that.attr('lay-max') : "2099-12-31 23:59:58",
            range: (typeof (that.attr('lay-range')) != 'undefined') ? that.attr('lay-range') : false,
            type: (typeof (that.attr('lay-type')) != 'undefined') ? that.attr('lay-type') : "datetime",
            value: (typeof (that.attr('lay-value')) != 'undefined') ? that.attr('lay-value') : new Date(),
            position: (typeof (that.attr('lay-position')) != 'undefined') ? that.attr('lay-position') : "fixed",
        };
        switch (config.type) {
            case 'year':
                config.format = that.attr('lay-format') ? that.attr('lay-format') : "y";
                break;
            case 'month':
                config.format = that.attr('lay-format') ? that.attr('lay-format') : "y-MM";
                break;
            case 'date':
                config.format = that.attr('lay-format') ? that.attr('lay-format') : "y-MM-dd";
                break;
            case 'time':
                config.format = that.attr('lay-format') ? that.attr('lay-format') : "HH:mm:ss";
                break;
            case 'datetime':
                config.format = that.attr('lay-format') ? that.attr('lay-format') : "y-MM-dd HH:mm:ss";
                break;
        }
        layDate.render({
            elem: that[0],
            theme: 'grid',
            position: config.position,
            btns: ['clear', 'now', 'confirm'],
            calendar: true,
            trigger: 'click',
            range: config.range,
            type: config.type,
            max: config.max,
            min: config.min,
            format: config.format,
            value: config.value,
            isInitValue: true,
        });
    });
    exports('dateExt');
});