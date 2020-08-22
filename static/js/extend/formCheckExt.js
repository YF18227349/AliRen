layui.define(['jquery', 'fun', 'form'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        form = layui.form,
        errorClass = 'hos-error layui-form-danger',
        verification = null,
        _val = null;
    let body = $('body');
    let codemirrorArr = new Array();
    layui.each($("[codemirror]"), function (k, dom) {
        codemirrorArr[k] = CodeMirror.fromTextArea(document.getElementById(dom.id), {
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true, //显示行号
            line: true,
            foldgutter: true,
            theme: "ttcn", //设置主题
            lineWrapping: true, //代码折叠
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            matchBrackets: true, //括号匹配
            autoCloseBrackets: true
        });
        $(dom).attr("codemirror-index", k);
    });
    // 验证提示规则
    verification = {
        errorMessage: function (item, msg) {
            $(item).parents(".form-group").addClass(errorClass);
            $(item).focus();
            if ($(item).is("input")) {
                return ($(item).attr("lay-title")) ?
                    ($(item).attr("lay-title") + msg + '!') :
                    ($(item).attr("placeholder")) ?
                        ($(item).attr("placeholder")) :
                        ($(item).attr("name") + msg + '!')
            } else {
                return ($(item).attr("lay-title")) ?
                    ('请选择' + $(item).attr("lay-title") + '!') :
                    ('请选择' + $(item).attr("name") + '!')
            }
        }
    }
    //验证器
    form.verify({
        /**
         * 非空驗證
         */
        required: function (value, item) {
            value = $.trim(value);
            if (value.length == 0) {
                return verification.errorMessage(item, "不能为空")
            }
        },
        nozh: function (value, item) {
            if (!new RegExp("^[\u4e00-\u9fa5\\s·]+$").test(value)) {
                return verification.errorMessage(item, "不能出现中文")
            }
        },
        zh: function (value, item) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return verification.errorMessage(item, "不能有特殊字符")
            }
        },
        noStart_: function (value, item) {
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return verification.errorMessage(item, "首尾不能出现下划线\'_\'")
            }
        },
        /**
         * 不能全數字驗證
         */
        nonumber: function (value, item) {
            value = $.trim(value);
            if (/^\d+\d+\d$/.test(value)) {
                return verification.errorMessage(item, "不能全为数字")
            }
        },
        /**
         * 數字驗證
         */
        number: function (value, item) {
            value = $.trim(value);
            if (!value || isNaN(value)) {
                return verification.errorMessage(item, "必须为纯数字")
            }
        },
        /**
         * 字符串驗證[不能出現中文]
         */
        string: function (value, item) {
            value = $.trim(value);
            if (!(/^[a-zA-Z0-9]+$/.test(value))) {
                return verification.errorMessage(item, "不能有特殊字符,只允许英文大小写和数字")
            }
        },
        /**
         * 字符串驗證[不能出現中文]
         */
        capitalization: function (value, item) {
            value = $.trim(value);
            if (!(/^[A-Z]+$/.test(value))) {
                return verification.errorMessage(item, "必须为英文")
            }
        },
        /**
         * 電話驗證
         */
        phone: function (value, item) {
            value = $.trim(value);
            if (!fun._isPhone(value)) {
                return verification.errorMessage(item, "格式有误,不是正确的手机号")
            }
        },
        /**
         * 郵箱驗證
         */
        email: function (value, item) {
            value = $.trim(value);
            if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value))) {
                return verification.errorMessage(item, "格式有误,不是正确的邮箱地址")
            }
        },
        /**
         * URL地址驗證
         */
        url: function (value, item) {
            value = $.trim(value);
            if (!fun._isUrl(value)) {
                return verification.errorMessage(item, "格式有误,不是正确的链接地址")
            }
        },
        /**
         * 整除验证
         */
        double: function (value, item) {
            value = $.trim(value);
            if ((typeof ($(item).attr("lay-double")) != 'undefined')) {
                if (value % $(item).attr("lay-double") != 0) {
                    $(item).parents(".form-group").addClass(errorClass);
                    $(item).focus();
                    return $(item).attr("lay-title") + '必须是' + $(item).attr("lay-double") + '的整数倍';
                }
            }
        },
        /**
         * QQ賬號驗證
         */
        qq: function (value, item) {
            value = $.trim(value);
            if (!(/^\d{5,10}$/.test(value))) {
                return verification.errorMessage(item, "格式有误,不是正确的QQ号码")
            }
        },
        /**
         * 身份證號驗證
         */
        identity: function (value, item) {
            value = $.trim(value);
            if (!(/(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(value))) {
                return verification.errorMessage(item, "格式有误,不是正确的身份证号")
            }
        },
        /**
         * 日期驗證
         */
        date: function (value, item) {
            value = $.trim(value);
            if (!(/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/.test(value))) {
                return verification.errorMessage(item, "格式有误,不是正确的日期格式")
            }
        },
        /**
         * 空格驗證
         */
        noSpace: function (value, item) {
            value = $.trim(value);
            if (!(/^\S*$/.test(value))) {
                return verification.errorMessage(item, "不能出现空格")
            }
        },
        pass: function (value, item) {
            value = $.trim(value);
            if (!(/^\S*$/.test(value))) {
                return verification.errorMessage(item, "不能出现空格")
            }
        },
        /**
         * 長度驗證
         * @access    public
         * @author RigorouseMe 2018-10-18
         * @copyright RigorouseMe
         * @version   ?time=2018-10-18
         */
        len: function (value, item) {
            value = $.trim(value);
            let config = fun.str2json($(item).attr("lay-len"));
            if (typeof (config.min) != 'undefined') {
                if (value.length < config.min) {
                    $(item).focus();
                    return $(item).attr("lay-title") + '长度不能小于' + config.min + '个字符!';
                }
            }
            if (typeof (config.max) != 'undefined') {
                if (value.length > config.max) {
                    $(item).focus();
                    return $(item).attr("lay-title") + '长度不能超过' + config.max + '个字符!';
                }
            }
            if (typeof (config.eq) != 'undefined') {
                if (value.length != config.eq) {
                    $(item).focus();
                    return $(item).attr("lay-title") + '长度必须等于' + config.eq + '个字符!';
                }
            }
        },
        ncLayUiEdit: function (value, item) {
            layEdit.sync($(item).attr("layEdit-index"));
        },
        ncCodemirror: function (value, item) {
            $(item).text(codemirrorArr[$(item).attr("codemirror-index")].getValue());
        },
    });
    exports('formCheckExt');
});