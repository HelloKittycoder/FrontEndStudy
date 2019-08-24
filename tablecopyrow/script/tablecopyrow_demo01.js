$(function () {
    // 添加单行
    $("#div1 .addBtn").click(function () {
        addRow.call(this); // 这个this代表添加按钮（原生jsdom对象）
        // 写成下面这种的话，addRow里的this就是window对象了；解决方法：如果addRow里可以不用this的话，就把当前按钮作为一个参数传进去
        // addRow(); // 全都采用默认值
    });
    // 说明：不能写成，因为这种写法jquery默认会传一个Event对象，也就是trId接到的就是Event对象
    // $(".containerDiv .addBtn").click(addRow);
    // 如果addRow没有参数，这样写没有问题

    $("#div2 .addBtn").click(function () {
        addRow.call(this, $("#div2 table"));
    });

    // 添加多行
    $("#div3 .addBtn").click(function () {
        addRow.call(this);
    });
    $("#div4 .addBtn").click(function () {
        addRow.call(this, $("#div4 table"));
    });
});

// 添加行
function addRow($table, trId, sequenceColNum) {
    trId = trId ? trId : "copt";
    sequenceColNum = sequenceColNum ? sequenceColNum : 0;

    var $addBtn = $(this);
    $table = $table ? $table : $addBtn.closest("table");

    var rowIdArr = [];
    var $hasRowIdTrs = $table.find("tbody>tr[rowid]");
    $hasRowIdTrs.each(function () {
        rowIdArr.push($(this).attr("rowid").replace(trId, ""));
    });
    var maxtrnum = Math.max.apply(null, rowIdArr); // 获取当前最大的行数

    // 复制模板
    var $tr0_clone = $table.find("tbody>tr[rowid='"+trId+"0']").clone(true);
    // 新行数
    var newRowCount = maxtrnum + 1;

    // 设置rowid
    $tr0_clone.attr("rowid", trId + newRowCount);

    // 设置序号列
    $tr0_clone.find("td:eq("+sequenceColNum+")").html(newRowCount);

    // 设置input（使用“:input”过滤tr中所有能够提交到后台的表单元素）要提交到后台的name
    $tr0_clone.find(":input").each(function () {
        var formElement = this;
        var cellid = formElement.id;
        if (cellid && cellid.indexOf("-1") > -1) {
            formElement.id = cellid.replace("-1", newRowCount - 1);
        }
        var cellname = formElement.name;
        if (cellname && cellname.indexOf("[-1]") > -1) {
            formElement.name = cellname.replace('[-1]', '[' + (newRowCount - 1) + ']');
        }
    });

    $hasRowIdTrs.last().after($tr0_clone);
    $tr0_clone.show();
}