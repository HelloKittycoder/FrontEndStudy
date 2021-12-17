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
     * 打开对话框后，自动在页面居中
     * 参考链接：https://blog.csdn.net/qq_23113521/article/details/79010569
     * @param jq
     * @param options
     */
    openDialog: function (jq, options) {
        return jq.each(function () {
            // needScrollCenter：表示需要在带滚动条的页面里水平垂直居中显示
            if (options && options.needScrollCenter) {
                var windowHeight = $(window).height();
                var dialogWidth = options.width;
                var dialogHeight = options.height;
                var left = (document.body.scrollWidth - dialogWidth) / 2;
                var top = $(document).scrollTop() + (windowHeight - dialogHeight) * 0.5;

                $.extend(options, {left: left, top: top});
            }
            $(this).dialog(options).dialog("open");
        });
    }
});