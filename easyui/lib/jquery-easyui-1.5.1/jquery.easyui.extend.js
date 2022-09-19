var EasyuiCommon = function() {

    // 序号formatter
    var _serialFormatter = function (value, row, index) {
        console.log("formatter被调用了...", arguments);
        if (value) {
            return value;
        } else {
            return index + 1;
        }
    }

    return {
        serialFormatter: _serialFormatter
    }
}();

// 辅助工具方法
/**
 * 将日期格式化成字符串
 * 参考链接：https://www.cnblogs.com/summary-2017/p/9462748.html
 * 调用：
 * new Date().formatDate("yyyy-MM-dd");
 * new Date().formatDate("yyyy-MM-dd HH:mm:ss");
 * @param pattern
 */
Date.prototype.formatDate = function(pattern) {
    var o = {
        "M+":this.getMonth() + 1, // 月
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    }

    var result = pattern;
    if (/(y+)/.test(result)) {
        result = result.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(result)) {
            result = result.replace(RegExp.$1, (RegExp.$1.length == 1) ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return result;
}

/**
 * 将字符串格式化成日期
 * 目前：只支持“年月日”、“年月日时分秒”两种情况
 * 这两种情况里，每个部分的位置可以在别的位置，比如“日月年”、“秒分时日月年”
 * 调用：
 * '2021-12-18 21:11:27'.parseDate("yyyy-MM-dd hh:mm:ss").formatDate("yyyy-MM-dd hh:mm:ss")
 * '12-18-2021 21:11:27'.parseDate("MM-dd-yyyy hh:mm:ss").formatDate("yyyy-MM-dd hh:mm:ss")
 *
 * @param str
 * @param pattern
 */
String.prototype.parseDate = function(pattern) {
    var o = ["y+","M+","d+","h+","m+","s+"];
    // 先对数据进行归类
    var tempObj = {};
    var tempObjKeyNum = 0;
    var _this = this;
    o.forEach(function (ele) {
        if (new RegExp("("+ ele +")").test(pattern)) {
            var matchEle = RegExp.$1;
            tempObj[ele] = _this.substr(pattern.indexOf(matchEle), matchEle.length);
            tempObjKeyNum++;
        }
    });

    if (tempObjKeyNum == 3) {
        // 年月日
        return new Date(tempObj["y+"], tempObj["M+"] - 1, tempObj["d+"]);
    } else {
        // 年月日时分秒
        return new Date(tempObj["y+"], tempObj["M+"] - 1, tempObj["d+"], tempObj["h+"], tempObj["m+"], tempObj["s+"]);
    }
}

/**
 * 对easyui的方法进行扩展
 * 参考链接：https://www.jeasyui.com/forum/index.php?topic=3805.0
 * https://www.cnblogs.com/huangf714/p/6148791.html
 */
$.extend($.fn.datagrid.methods,{
    // 展示第几行（index从0开始算）
    showRow: function(jq, index){
        return jq.each(function(){
            var opts = $(this).datagrid('options');
            opts.finder.getTr(this, index).show();
        })
    },
    // 隐藏第几行
    hideRow: function(jq, index){
        return jq.each(function(){
            var opts = $(this).datagrid('options');
            opts.finder.getTr(this, index).hide();
        })
    }
});

$.extend($.fn.dialog.methods,{
    /**
     * 打开对话框，页面居中展示
     * 参考链接：https://blog.csdn.net/qq_23113521/article/details/79010569
     *
     * 使用示例：
     * $("#openMessage2").dialog("openWindow", {
     *      title: '指标计算说明',
     *      width: 480,
     *      height: 280
     * });
     *
     * @param jq
     * @param options
     *
     * 最终调用时传的option
     * {
     *      title: '指标计算说明',
     *      width: 480,
     *      height: 280,
     *      left: 688,
     *      top: 2589.5,
     *      modal: true,
     *      closed: true
     *  }
     *
     * @return {*}
     */
    openWindow: function (jq, options) {
        var defaultOptions = {
            title: '',
            width: 200,
            height: 200,
            modal: true,
            closed: true
        };
        var parsedOptions = $.extend({}, defaultOptions, options);

        // 计算弹窗的left和top，用于弹窗居中展示
        // 页面高度
        var windowHeight = $(window).height();
        // 弹窗宽度
        var dialogWidth = parsedOptions.width;
        // 弹窗高度
        var dialogHeight = parsedOptions.height;
        var left = (document.body.scrollWidth - dialogWidth) / 2;
        var top = $(document).scrollTop() + (windowHeight - dialogHeight) * 0.5;

        parsedOptions["left"] = left;
        parsedOptions["top"] = top;
        return jq.each(function () {
            $(this).dialog(parsedOptions).dialog('open');
        });
    }
});
