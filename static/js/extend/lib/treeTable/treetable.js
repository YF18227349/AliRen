layui.define(['layer', 'table'], function (exports) {
    let $ = layui.jquery;
    let layer = layui.layer;
    let table = layui.table;
    let treetable = {
        // 渲染基础表格
        render: function (param) {
            // 渲染表格
            table.render(param);
        },
        // 重新渲染表格
        init: function (param, data, config) {
            param.treeColIndex = config.treeColIndex ? config.treeColIndex : 2;
            param.treeSpid = config.treeSpid ? config.treeSpid : 0;
            param.treeIdName = config.treeIdName ? config.treeIdName : 'id';
            param.treePidName = config.treePidName ? config.treePidName : 'pid';
            let mData = [];
            let doneCallback = param.call;
            let tNodes = data;
            // 补上id和pid字段
            for (let i = 0; i < tNodes.length; i++) {
                let tt = tNodes[i];
                if (!tt.id) {
                    tt.id = tt[param.treeIdName];
                }
                if (!tt.pid) {
                    tt.pid = tt[param.treePidName];
                }
            }
            let upData = [];
            let getDeep = function (data, r) {
                let deep = 0;
                if (r[param.treePidName] == 0) {
                    return deep;
                }
                let tPid;
                for (let i = 0; i < data.length; i++) {
                    if (r[param.treePidName] == data[i].id) {
                        deep += 1;
                        tPid = data[i];
                        break;
                    }
                }
                return deep + getDeep(data, tPid);
            };
            let treeStr = [
                '│', '├', '└',
            ];
            layui.each(tNodes, (k, v) => {
                if (v.pid != param.treeSpid) {
                    let deep = getDeep(tNodes, v);
                    v.deep = deep;
                    if (deep == 1) {
                        v.name = treeStr[1] + '  ' + v.name;
                    } else {
                        v.name = treeStr[1] + '  ' + v.name;
                    }
                }
                upData.push(v);
            });
            // 对数据进行排序
            let sort = function (s_pid, data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].pid == s_pid) {
                        let len = mData.length;
                        if (len > 0 && mData[len - 1].id == s_pid) {
                            mData[len - 1].isParent = true;
                        }
                        mData.push(data[i]);
                        sort(data[i].id, data);
                    }
                }
            };
            sort(param.treeSpid, upData);
            param.url = undefined;
            // 重写参数
            param.data = mData;
            param.cols[0][param.treeColIndex].templet = function (d) {
                let mId = d.id;
                let mPid = d.pid;
                let isDir = d.isParent;
                let emptyNum = treetable.getEmptyNum(mPid, mData);
                let deep = d.deep ? d.deep : 0;
                let iconHtml = '';
                for (let i = 0; i < emptyNum; i++) {
                    iconHtml += '<span class="treeTable-empty"></span>';
                }
                if (isDir) {
                    iconHtml += '';
                } else {
                    iconHtml += '';
                }
                iconHtml += '&nbsp;&nbsp;';
                let ttype = isDir ? 'dir' : 'file';
                let vg = '<span class="treeTable-icon open" lay-tid="' + mId + '" lay-tpid="' + mPid + '" lay-ttype="' + ttype + '">';

                let ret = vg + iconHtml + d[param.cols[0][param.treeColIndex].field] + '</span>';
                return ret;
            };
            param.done = function (res, curr, count) {
                $(param.elem).next().addClass('treeTable');
                $(param.elem).next().attr('treeLinkage', param.treeLinkage);
                treetable.expandAll(param.elem);
                if (doneCallback) {
                    doneCallback(res, curr, count);
                }
            };
            table.render(param);
        },
        // 计算缩进的数量
        getEmptyNum: function (pid, data) {
            let num = 0;
            if (!pid) {
                return num;
            }
            let tPid;
            for (let i = 0; i < data.length; i++) {
                if (pid == data[i].id) {
                    num += 1;
                    tPid = data[i].pid;
                    break;
                }
            }
            return num + treetable.getEmptyNum(tPid, data);
        },
        // 展开/折叠行
        toggleRows: function ($dom, linkage) {
            let type = $dom.attr('lay-ttype');
            if ('file' == type) {
                return;
            }
            let mId = $dom.attr('lay-tid');
            let isOpen = $dom.hasClass('open');
            if (isOpen) {
                $dom.removeClass('open');
            } else {
                $dom.addClass('open');
            }
            $dom.closest('tbody').find('tr').each(function () {
                let $ti = $(this).find('.treeTable-icon');
                let pid = $ti.attr('lay-tpid');
                let ttype = $ti.attr('lay-ttype');
                let tOpen = $ti.hasClass('open');
                if (mId == pid) {
                    if (isOpen) {
                        $(this).hide();
                        if ('dir' == ttype && tOpen == isOpen) {
                            $ti.trigger('click');
                        }
                    } else {
                        $(this).show();
                        if (linkage && 'dir' == ttype && tOpen == isOpen) {
                            $ti.trigger('click');
                        }
                    }
                }
            });
        },
        // 展开所有
        expandAll: function (dom) {
            $(dom).next('.treeTable').find('.layui-table-body tbody tr').each(function () {
                let $ti = $(this).find('.treeTable-icon');
                let ttype = $ti.attr('lay-ttype');
                let tOpen = $ti.hasClass('open');
                if ('dir' == ttype && !tOpen) {
                    $ti.trigger('click');
                }
            });
        },
        // 折叠所有
        foldAll: function (dom) {
            $(dom).next('.treeTable').find('.layui-table-body tbody tr').each(function () {
                let $ti = $(this).find('.treeTable-icon');
                let ttype = $ti.attr('lay-ttype');
                let tOpen = $ti.hasClass('open');
                if ('dir' == ttype && tOpen) {
                    $ti.trigger('click');
                }
            });
        }
    };
    layui.link(layui.cache.base + 'extend/lib/treeTable/treetable.css');
    // 给图标列绑定事件
    $('body').on('click', '.treeTable .treeTable-icon', function () {
        let treeLinkage = $(this).parents('.treeTable').attr('treeLinkage');
        if ('true' == treeLinkage) {
            treetable.toggleRows($(this), true);
        } else {
            treetable.toggleRows($(this), false);
        }
    });
    exports('treetable', treetable);
});
