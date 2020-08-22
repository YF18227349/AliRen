layui.define(['layedit'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        layEdit = layui.layedit,
        _val = null;
    let body = $('body');
    let KindEditorSite = {
        width: '100%',
        minHeight: "500",
        itemsMax: [
            'source',
            '|', 'undo', 'redo',
            '|', 'preview', 'print', 'plainpaste', 'wordpaste',
            '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
            '|', 'insertorderedlist', 'insertunorderedlist',
            '|', 'indent', 'outdent',
            '|', 'subscript', 'superscript',
            '|', 'clearhtml', 'quickformat', 'selectall', 'removeformat', 'fullscreen',
            '/', 'formatblock', 'fontname', 'fontsize',
            '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight',
            '|', 'image', 'multiimage', 'insertfile', 'table', 'hr', 'emoticons', 'link', 'unlink',
        ],
        itemsMin: [
            'source',
            '|', 'preview',
            '|', 'formatblock', 'fontname', 'fontsize',
            '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough',
            '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
            '|', 'insertorderedlist', 'insertunorderedlist',
            '|', 'indent', 'outdent',
            '|', 'table', 'hr', 'link', 'unlink',
            '|', 'clearhtml', 'quickformat', 'selectall', 'removeformat', 'fullscreen',
        ],
        resizeType: 1,
        themeType: 'default',
        // langType: 'zh-CN',
        newlineTag: 'br',
        pasteType: 1, //0:禁止粘贴, 1:纯文本粘贴, 2:HTML粘贴
        useContextmenu: true,
        syncType: 'form',
        indentChar: "\t",
        colorTable: [
            ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
            ['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
            ['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
            ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
        ],
        afterCreate: function () {
            var self = this;
            KindEditor.ctrl(document, 13, function () {
                self.sync();
            });
            KindEditor.ctrl(self.edit.doc, 13, function () {
                self.sync();
            });
        },
        afterChange: function () {

        },
        afterTab: function () {

        },
        afterFocus: function () {

        },
        afterBlur: function () {
            this.sync();
        },
        afterUpload: function (url) {
            console.log(url);
        },
        uploadJson: '',
        fileManagerJson: '',
        allowImageUpload: true,
        allowFileManager: false,
        allowFlashUpload: false,
        allowMediaUpload: true,
        allowFileUpload: true,
        fontSizeTable: ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'],
        formatUploadUrl: true,
        afterSelectFile: function () { },
        fixToolBar: false,
        imageUploadLimit: 90,
        imageSizeLimit: "10MB",
    };
    layui.each($("[KindEditor]"), function (k, dom) {
        KindEditorSite.extraFileUploadParams = fun.str2json($(dom).attr("site-params"));
        KindEditorSite.uploadJson = $(dom).attr("site-upp-src");
        KindEditorSite.fileManagerJson = $(dom).attr("site-list-src");
        let items = $(dom).attr("site-items") || 'Min';
        KindEditorSite.items = (items == 'Max') ? KindEditorSite.itemsMax : KindEditorSite.itemsMin;
        KindEditor.create(dom, KindEditorSite);
    });
    let ueditorArr = new Array();
    layui.each($("[UEditor]"), function (k, dom) {
        let bar = [
            [
                'fullscreen', 'source',
                '|', 'undo', 'redo', '|', 'indent',
                '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript',
                '|', 'removeformat', 'formatmatch', 'autotypeset', 'pasteplain',
                '|', 'print', 'preview', 'searchreplace', 'drafts', 'cleardoc', 'selectall',
                '||', 'customstyle', '|', 'paragraph', '|', 'fontfamily', '|', 'fontsize',
                '||', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',
                '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight',
                '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                '|', 'touppercase', 'tolowercase',
                '|', 'background', 'horizontal', 'date', 'time', 'spechars', 'wordimage',
                '||', 'link', 'unlink', 'anchor',
                '|', 'simpleupload', 'insertimage', 'emotion', 'scrawl', 'attachment', 'insertvideo',
                '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter',
                '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts',
            ]
        ];
        ueditorArr[k] = UE.getEditor(dom.id, {
            initialFrameWidth: "100%",
            initialFrameHeight: 400,
            serverUrl: $(dom).attr("site-server"),
            toolbars: bar,
            enableAutoSave: true,
            saveInterval: 3600,
        });
    });
    layEdit.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: '',
            accept: 'image',
            acceptMime: 'image/*',
            exts: 'jpg|png|gif|bmp|jpeg',
            size: '10240'
        },
        uploadVideo: {
            url: '',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: '20480'
        },
        calldel: {
            url: '',
        },
        //开发者模式 --默认为false
        devmode: true,
        //插入代码设置
        codeConfig: {
            hide: true, //是否显示编码语言选择框
            default: 'javascript' //hide为true时的默认语言格式
        },
        tool: [
            'html', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|', 'fontFomatt', 'colorpicker', 'face', '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'image_alt', 'video', '|', 'fullScreen'
        ],
        height: '500'
    });
    layui.each($("[lay-edit]"), function (k, dom) {
        let uppSrc = $(dom).attr("lay-upp-src"),
            delSrc = $(dom).attr("lay-call-del");
        layEdit.set().config.uploadImage.url = uppSrc + "?type=image";
        layEdit.set().config.uploadVideo.url = uppSrc + "?type=video";
        layEdit.set().config.calldel.url = delSrc;
        let editor = layEdit.build(dom.id);
        $(dom).attr("layEdit-index", editor);
    });
    exports('editExt');
});