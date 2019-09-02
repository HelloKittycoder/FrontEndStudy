/**
 * 通用js方法封装处理
 */
!function ($) {
    $.extend({
        ddcommon : {
            // 判断是否为数组（https://www.cnblogs.com/ysk123/p/9995920.html）
            isArray : function(o) {
                return Object.prototype.toString.call(o) == '[object Array]';
            }
        },
        ddpage : {
            // 根据类型查找给定对象中对应的类型字符串（模拟Map）
            /*
             * var typeFormEnum = {
             *     "1,2":"signFile", // 签报类表单
             *     "3,4,5":"transferMoney_out" // 资金调拨类（出款）表单
             * }
             * 传入1，查到对应类型字符串“signFile”
             */
            findTypeValue : function (typeObj, type) {
                // 加这个的原因是：预防传入空的type时，仍然返回一个类型
                // 比如：未加非空判断时，findTypeValue(typeFormEnum, "")查到的是signFile；
                // 现在加完以后查到的是""
                if (type) {
                    var pattern = new RegExp("\\b" + type + "\\b");
                    for (var obj in typeObj) {
                        if (obj.match(pattern)) {
                            return typeObj[obj];
                        }
                    }
                }
                return "";
            },
            getUrl : function (url) {
                var projectRootName = "/FrontEndStudy";
                return projectRootName + (url.startsWith("/") ? url : "/" + url);
            }
        },
        // echarts图操作工具方法
        ddchart : {
            // 初始化多套echarts主题，然后随时可以调用
            // https://www.oschina.net/question/2518638_2160208
            // https://www.jianshu.com/p/68686eacbfec
            initEchart : function() {
                // $.getJSON没有办法控制是否使用异步
                /*$.getJSON($.ddpage.getUrl("echarts/lib/theme/macarons.json"), function (responseText) {
                    echarts.registerTheme("macarons", responseText);
                });*/
                $.ddchart.registerThemes(["macarons", "selfdef01"]);
            },
            // 注册多个echarts主题
            registerThemes : function(obj) {
                if ($.ddcommon.isArray(obj)) {
                    var themePath = "echarts/lib/theme/";
                    // 注册多个主题
                    $.each(obj, function () {
                        var themeName = this;
                        $.ajax({
                            url : $.ddpage.getUrl(themePath + themeName + ".json"),
                            async : false,
                            data : "json",
                            success : function (responseText) {
                                echarts.registerTheme(themeName + "", responseText);
                            }
                        });
                    });
                }
            },
            loadChartBase : function (selector, getDataFunc, theme) {
                $(selector).each(function () {
                    applyElement(this, theme);
                });

                // 将图应用到页面元素上
                function applyElement(domElement, theme) {
                    var myChart = echarts.init(domElement, theme);
                    myChart.showLoading({
                        text: "图表数据正在努力加载...",
                        x: "center",
                        y: "center",
                        textStyle: {
                            color: "red",
                            fontSize: 14
                        },
                        effect: "spin"
                    });

                    // 调用请求json数据的方法
                    getDataFunc(function (option) {
                        myChart.setOption(option);
                        myChart.hideLoading();
                    });
                }
            }
        }
    });
}(jQuery);