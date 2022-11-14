var DatagridSortDemo4 = function () {

    var $dg = $("#dg");
    var dgData;
    // 恢复未排序的初始状态用的
    var initDgData;

    var _init = function () {
        _loadTableData();
    }

    var _loadTableData = function () {
        $.ajax({
            url: "datagrid_data1.json",
            dataType: "json",
            async: false,
            success: function (responseText) {
                dgData = responseText;
                initDgData = $.extend(true, [], dgData);
            }
        });

        $dg.datagrid({
            title: "Multiple Sorting",
            data: dgData,
            fit: false,
            fitColumns: false,
            width: 700,
            height: 250,
            remoteSort:false,
            multiSort:true,
            columns: [[
                {
                    field:'itemid',
                    title: 'Item ID',
                    width:80,
                    sortable:true
                },
                {
                    field:'productid',
                    title: 'Product',
                    width:100,
                    sortable:true
                },
                {
                    field:'listprice',
                    title: 'List Price',
                    width:80,
                    align:'right',
                    sortable:true
                },
                {
                    field:'unitcost',
                    title: 'Unit Cost',
                    width:80,
                    align:'right',
                    sortable:true
                },
                {
                    field:'attr1',
                    title: 'Attribute',
                    width:250
                },
                {
                    field:'status',
                    title: 'Status',
                    width:60,
                    align:'center'
                }
            ]],
            onSortColumn: function (sort, order) {
                /**
                 * 这里考虑的是多列排序，排序列是 itemid、productid、listprice、unitcost
                 *
                 * 如果对 productid、listprice进行排序，sort和order所有可能的值分别为
                 * A.全部排序了（两个都排序了）
                 * 1）两个都是升序
                 * 'productid,listprice'    'asc,asc'
                 * 2）两个都是降序
                 * 'productid,listprice'    'desc,desc'
                 * 3）其中一个是升序，另外一个是降序
                 * 'productid,listprice'    'asc,desc'
                 * 'productid,listprice'    'desc,asc'
                 *
                 * B.部分排序了（其中一个排序了，另外一个没排序）
                 * 'productid'    'asc'
                 * 'productid'    'desc'
                 * 'listprice'    'asc'
                 * 'listprice'    'desc'
                 *
                 * C.全都未排序（两个都没排序）
                 * ''   ''
                 *
                 * 以上9种情况，只是考虑随便对其中两个字段进行排序时可能出现的情况，如果对其中三个字段进行排序也可以按照以上方式进行归类
                 * 现在考虑以上的9种情况，其中A类情况easyui已经处理了，B类情况需要自己手动对原来的数据排序后再设置回表格中（easyui是不会处理未排序字段的原始顺序的），
                 * C类情况需要自己手动把最原始的的数据直接设置回表格中
                 *
                 * 有两种思路：
                 * 思路1：只保存“全部未排序”时的原始数据，“全部都排序”则使用easyui的顺序，“部分排序”则手动实现排序功能
                 * TODO：主要问题出在部分排序上，无法恢复初始的顺序
                 *
                 * 思路2：把所有可能出现排序情况都保存下来，然后调用排序方法后直接加载这种情况下的排序数据即可（这种当要排序的字段比较多时，存储的数据过多）
                 */

                 // console.log(sort, order);

                var initDgDataCopy = $.extend(true, [], initDgData);
                // 全部未排序
                if (sort == "" && order == "") {
                    $(this).datagrid("loadData", initDgDataCopy);
                    return;
                }

                // 获取当前列表的所有可排序字段的数量
                var needSortFieldNum = 0;
                $(this).datagrid('options').columns[0].forEach(function(item) {
                    if (item.sortable) {
                        needSortFieldNum++;
                    }
                });

                var actualSortFieldNum = sort.split(",").length;
                // 全部排序了，这种情况不用处理，easyui已经排好序了
                if (needSortFieldNum == actualSortFieldNum) {
                    return;
                }

                // 部分排序了
                initDgDataCopy.sort((d1, d2)=>{
                    var needSortFieldArr = sort.split(",");
                    var sortOrderArr = order.split(",");

                    var compareResult;
                    for (var i = 0; i < needSortFieldArr.length; i++) {
                        // 待排序字段
                        var sortField = needSortFieldArr[i];
                        // 该字段是升序还是降序排列
                        var sortOrder = sortOrderArr[i];
                        var v1 = d1[sortField];
                        var v2 = d2[sortField];
                        // 比较该字段下两个值的大小
                        compareResult = _compare(v1, v2, sortOrder);
                        if (compareResult != 0) {
                            // 如果一开始比对出两个值的大小，就直接返回结果
                            return compareResult;
                        }
                    }
                    return compareResult;
                });
            }
        });
    }

    /**
     * 大小比较，只支持字符串和数字（TODO：这里没有考虑值可能为空的情况）
     * @param order
     * @param v1
     * @param v2
     * @private
     */
    var _compare = function (order, v1, v2) {
        var compareType = Object.prototype.toString.call(v1);
        // 是否升序排列
        var orderAsc = order == "asc";
        if (compareType == "[object Number]") {
            // 待比较的是数字
            return orderAsc ? v1 - v2 : v2 - v1;
        } else if (compareType == "[object String]") {
            // 待比较的是字符串
            return orderAsc ? v1.localeCompare(v2) : v2.localeCompare(v1);
        } else {
            // TODO：其他类型的数据比较还没想好怎么写
            throw "暂不支持此类型的数据比较";
        }
    }

    return {
        init: _init
    }
}();

$(function () {
    DatagridSortDemo4.init();
});