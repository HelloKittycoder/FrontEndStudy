var BasicDataGridApp1 = function() {
    // 请求数据
    var dgData, dg2Data, dg3Data;
    $.ajax({
        url: "mytest_data1.json",
        dataType: "json",
        async: false,
        success: function (responseText) {
            dgData = responseText;
            console.log("数据加载完成");
        }
    });
    $.ajax({
        url: "mytest_data2.json",
        dataType: "json",
        async: false,
        success: function (responseText) {
            dg2Data = responseText;
        }
    });
    $.ajax({
        url: "mytest_data3.json",
        dataType: "json",
        async: false,
        success: function (responseText) {
            dg3Data = responseText;
        }
    });

    return {
        dgData: dgData,
        dg2Data: dg2Data,
        dg3Data: dg3Data
    }
}();

$(function () {
    console.log("页面初始化完成");
    $("#dg").datagrid({
        title:'产品列表1',
        data: BasicDataGridApp1.dgData,
        width: '600',
        // collapsible: true,
        rownumbers : true,
        columns:[[
            {field:'cb',checkbox: true,width:10},
            {field:'itemid',title:'编号',width:100},
            {field:'productid',title:'产品编号',width:130},
            {field:'productname',title:'产品名称',width:100},
            {field:'listprice',title:'市场价',width:80,align:'right'}
        ]]
    });

    $("#dg2").datagrid({
        title:'产品列表2',
        width: '600',
        // collapsible: true,
        rownumbers : true,
        columns:[[
            {field:'cb',checkbox: true,width:10},
            {field:'itemid',title:'编号',width:100},
            {field:'productid',title:'产品编号',width:130},
            {field:'productname',title:'产品名称',width:100},
            {field:'listprice',title:'市场价',width:80,align:'right'}
        ]]
    });

    $("#dg3").datagrid({
        title:'产品列表3',
        width: '600',
        // collapsible: true,
        rownumbers : true,
        columns:[[
            {field:'cb',checkbox: true,width:10},
            {field:'itemid',title:'编号',width:100},
            {field:'productid',title:'产品编号',width:130},
            {field:'productname',title:'产品名称',width:100},
            {field:'listprice',title:'市场价',width:80,align:'right'}
        ]]
    });

    $("#projectSelectType").combobox({
        onSelect: function (result) {
            // 当前选中的值
            projectSelectType = result.value;
            var commonPrefix = "dg" + (projectSelectType == "1" ? "" : projectSelectType);
            var showListContainerSelector = commonPrefix + "Container";
            $("#" + showListContainerSelector).show().siblings().hide();
            console.log("执行loadData操作");

            if (projectSelectType == "1" || projectSelectType == "2") {
                $("#" + commonPrefix).datagrid("loadData", BasicDataGridApp1[commonPrefix + "Data"]);
                $("#othertr").hide();
            } else {
                $("#othertr").show();
            }
        }
    });
});

function queryProductList() {
    $("#dg3").datagrid({
        url: "mytest_data3.json",
        loadMsg: "正在加载....，请稍候！"
    });
}

var projectSelectType;
// 记录已经选中的code
var selectedCodes = {
    totalSelectedCode: [] // 选中项的汇总code
};

function addItem() {
    var $dg = $("#dg"), $dg2 = $("#dg2"), $dg3 = $("#dg3");
    var dgRows = $dg.datagrid('getChecked');
    var dg2Rows = $dg2.datagrid('getChecked');
    var dg3Rows = $dg3.datagrid('getChecked');

    var $dgContainer, loadDataList, iterateRows,
        row, rowCodeKey = "itemid", rowValueKey = "productname",
        projectSelectCode, projectSelectValue;
    var totalSelectedCode = selectedCodes["totalSelectedCode"];

    // 当前“已选择”里的数量
    var length = totalSelectedCode.length;
    // 当前所有列表中勾选的数量
    var currentSelectItemLength = dgRows.length + dg2Rows.length + dg3Rows.length;
    // 总共勾选的数量
    var totalLength = length + currentSelectItemLength;
    var selectHtml = "";

    if (length == 5 || totalLength > 5) {
        $.messager.alert('操作提示', 'benchmark最多添加5个！', 'info')
        return;
    }

    if (projectSelectType == "1") {
        iterateRows = dgRows; // 待循环的行
        loadDataList = BasicDataGridApp1["dgData"]; // 重新加载时要用到的列表数据
        $dgContainer = $dg; // 重新加载时候要用到的列表数据
    } else if (projectSelectType == "2") {
        iterateRows = dg2Rows;
        loadDataList = BasicDataGridApp1["dg2Data"];
        $dgContainer = $dg2;
    } else if (projectSelectType == "3") {
        iterateRows = dg3Rows;
        $dgContainer = $dg3;
    } else {
        throw "类型不存在";
    }

    // 拼接页面“已选择”部分
    for (var i = 0; i < iterateRows.length; i++) {
        row = iterateRows[i];
        // 如果“已选择”里含有当前的选中项，则跳过本次循环
        projectSelectCode = row[rowCodeKey];
        projectSelectValue = row[rowValueKey];
        if ($.inArray(projectSelectCode, totalSelectedCode) > -1) {
            continue;
        }

        // 记录“已选择”的benchMarkCode
        totalSelectedCode.push(projectSelectCode);

        selectHtml += "<option value='"+projectSelectCode+"' projectSelectType='"+projectSelectType+"'>"+projectSelectValue+"</option>";
    }

    if (iterateRows && iterateRows.length > 0) {
        // 给对应类型的列表添加事件监听
        $dgContainer.datagrid({
            // 已选中的行，文字置灰显示
            rowStyler:function(index,row){
                if ($.inArray(row[rowCodeKey], totalSelectedCode) > -1){
                    return 'color:#999999e0;font-weight:bold;';
                }
            },
            // 已选中的行点击后无法选中
            onClickRow:function(index,row) {
                if ($.inArray(row[rowCodeKey], totalSelectedCode) > -1) {
                    $dgContainer.datagrid("uncheckRow", index);
                }
            },
            // 已选中的行无法勾选
            onCheck:function(index,row) {
                if ($.inArray(row[rowCodeKey], totalSelectedCode) > -1) {
                    $dgContainer.datagrid("uncheckRow", index);
                }
            },
            // 已选中的行无法通过点击“全选”进行勾选
            onCheckAll:function(rows) {
                $.each(rows, function (index, row) {
                    if ($.inArray(row[rowCodeKey], totalSelectedCode) > -1) {
                        $dgContainer.datagrid("uncheckRow", index);
                    }
                });
            }
        });

        // 刷新列表中的置灰状态
        if (loadDataList) {
            $dgContainer.datagrid("loadData", loadDataList);
        }

        $("#tempSelect").append(selectHtml);
    }
}

// 移除选项
function removeItem(type) {
    var $tempSelect = $("#tempSelect");
    var $selectedOptions;
    if (type == "selected") { // 只移除选中项
        $selectedOptions = $tempSelect.find("option:selected");
    } else if (type == "all") { // 移除所有项
        $selectedOptions = $tempSelect.find("option");
    } else {
        throw "type不能为空！";
    }
    var totalSelectedCode = selectedCodes["totalSelectedCode"];
    $selectedOptions.each(function () {
        var projectSelectType = $(this).attr("projectSelectType");
        var projectSelectCode = $(this).val();
        // 从所有已选中的code中移除code
        totalSelectedCode.remove(projectSelectCode);

        // 移除select中的option
        $(this).remove();

        // 列表中的记录恢复之前能正常选的状态
        reloadDataGridData(projectSelectType);
    });
}

// 清空选项
function clearItem() {
    removeItem("all");
}

// 根据projectSelectType重新加载列表数据
function reloadDataGridData(projectSelectType) {
    if (projectSelectType == "1") {
        $("#dg").datagrid("loadData", BasicDataGridApp1["dgData"]);
    } else if (projectSelectType == "2") {
        $("#dg2").datagrid("loadData", BasicDataGridApp1["dg2Data"]);
    } else if (projectSelectType == "3") {
        $("#dg3").datagrid("reload");
    }
}