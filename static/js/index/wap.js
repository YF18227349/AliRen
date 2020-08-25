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
    });
    exports('wap');
});