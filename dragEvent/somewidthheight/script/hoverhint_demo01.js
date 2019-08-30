!(function ($) {
    // 初始化操作
    $(function () {
        $(".remarkImg").mousemove(function (e) {
            var target = $(this).attr("target");
            var html = $("#"+target).html();
            if (html) {
                showTitle(e, this);
            }
        });
        $(".remarkImg").mouseout(function (e) {
            if ($(".myTitle").size() > 0) {
                $(".myTitle").remove();
            }
        });
    });

    var showTitle = function(e, obj) {
        if ($(".myTitle").size() > 0) {
            return;
        }
        var target = $(obj).attr("target");
        // 鼠标在可见区的坐标
        var x = e.clientX;
        var y = e.clientY;
        var $body = $("body").eq(0);

        // 把隐藏域中的内容转移到要显示的div中
        var title = createTitle();
        $(title).html($("#"+target).html());
        $body.append(title);

        var bh; // 页面可见高度
        var bw; // 页面可见宽度
        // 判断是否为ie浏览器
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            // 获取ie浏览器下的可见高度（参考链接：https://www.cnblogs.com/Joans/archive/2011/10/28/2227919.html）
            bh = document.documentElement.offsetHeight;
            bw = document.documentElement.offsetWidth;
        } else {
            bh = document.body.clientHeight;
            bw = document.body.clientWidth;
        }

        var rh = bh - y;
        var rw = bw - x;
        var divH = $(title).get(0).offsetHeight;
        var divW = $(title).get(0).offsetWidth;

        // 计算页面滚动条（纵向和横向）
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取scrollTop，即获取滚动条距离顶部高度
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

        var divTop;
        var divLeft;
        divTop = (rh - 10 >= divH) ? (y + scrollTop) - divH : y;
        divLeft = (rw - 10 < x) ? (x + scrollLeft) - divW : x;
        $(title).attr("style", "margin-top:" + divTop + "px; margin-left:" + divLeft + "px;");
        // $(title).css({"margin-top" : divTop, "margin-left" : divLeft});
    }

    var createTitle = function() {
        var div = document.createElement("div");
        $(div).addClass("myTitle");
        return div;
    }
})(jQuery);