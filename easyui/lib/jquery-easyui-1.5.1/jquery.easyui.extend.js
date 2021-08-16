/**
 * 对easyui的方法进行扩展
 * 参考链接：https://www.jeasyui.com/forum/index.php?topic=3805.0
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