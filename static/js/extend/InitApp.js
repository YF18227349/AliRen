layui.define([], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        _val = null;
    let body = $('body'), device = fun.initWebSite();
    // $(document).mousedown(function (e) {
    //     if (e.clientX >= $(window).width() || e.clientY >= $(window).height()) {
    //         return;
    //     }
    //     let json = {
    //         page_x: e.pageX,
    //         page_y: e.pageY,
    //         screen_width: screen.width,
    //         screen_height: screen.height
    //     };
    //     console.log(json);
    // });
    // $(window).mousemove(function (e) {
    //     let json = {
    //         page_x: e.pageX,
    //         page_y: e.pageY,
    //         screen_width: screen.width,
    //         screen_height: screen.height
    //     };
    //     console.log(json);
    // });
    if (typeof (NProgress) == 'undefined') {
        NProgress = {
            start: function () {

            },
            done: function () {

            },
            set: function () {

            }
        };
    }
    if (typeof (WOW) != 'undefined') {
        // 动画使用
        new WOW().init();
    }
    /**
     * keyup() 键盘监听
     */
    fun.keyup(function (keyCode, event) {
        //回车搜索
        if ($("*.layui-form").length != 0 && keyCode == 13) {
            let form = $("*.layui-form").eq(0);
            if (form.attr("lay-autoaction") == 1) {
                form.find('[lay-submit]').click();
            }
        }
    });
    fun.scroll(function (data, window) {
        let height = fun._int($("body").attr("data-scroll-height"));
        if (window.scrollTop() > height) {
            $("[return-top]").fadeIn(500);
        } else {
            $("[return-top]").fadeOut(500);
        }
    });
    fun.ready(function () {
        //自定义路由跳转属性
        body.on("click", "*[zy-href]", function () {
            fun._href($(this).attr("zy-href"));
        });
        body.on("click", "*[zy-open]", function () {
            fun._open($(this).attr("zy-open"));
        });
        // 在线客服外链功能
        body.on("click", "*[zy-kefu]", function () {
            let that = $(this);
            console.log(that);
        });
        //自定义返回顶部
        body.on("click", "*[zy-top]", function () {
            $('body, html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
        let events = {
            goBack: function () {
                fun._back();
            },
        };
        body.on("click", "*[zy-buff]", function () {
            let othis = $(this),
                buff = othis.attr("zy-buff");
            if (typeof events[buff] === "undefined") {
                console.error(buff + " 未定义!");
            } else {
                events[buff] && events[buff].call(this, othis);
            }
        });
    });
    exports('InitApp');
});