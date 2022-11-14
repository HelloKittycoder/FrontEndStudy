var DatagridSortDemo3 = function () {

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
            title: "Single Sorting",
            data: dgData,
            fit: false,
            fitColumns: false,
            width: 700,
            height: 250,
            remoteSort: false,
            multiSort: true,
            columns: [[
                {
                    field:'itemid',
                    title: 'Item ID',
                    width:80
                },
                {
                    field:'productid',
                    title: 'Product',
                    width:100
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
                    align:'right'
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
                 * 这里考虑的是单列排序，排序列是 listprice
                 *
                 * 以下情形，sort和order的值分别为
                 * 升序：'listprice'   'asc'
                 * 降序：'listprice'   'desc'
                 * 不排序：''   ''
                 *
                 * 升序和降序，easyui都做了处理，不排序时easyui并未恢复初始状态，这个需要自己写代码实现
                 */
                if (sort == '' && order == '') {
                    /**
                     * 这里需要拷贝一次initDgData，而且是深拷贝
                     * 因为datagrid每做一次排序，传入的data就会发生变化；如果直接传initDgData，最初始的状态就找不回来了
                     */
                    var initDgDataCopy = $.extend(true, [], initDgData);
                    $(this).datagrid("loadData", initDgDataCopy);
                }
            }
        });
    }

    return {
        init: _init
    }
}();

$(function () {
    DatagridSortDemo3.init();
});