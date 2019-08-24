/**
 * 通用js方法封装处理
 */
!function ($) {
    $.extend({
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
        },
        // echarts图操作工具方法
        ddchart : {
            loadChartBase : function (selector, getDataFunc) {
                $(selector).each(function () {
                    applyElement(this);
                });

                // 将图应用到页面元素上
                function applyElement(domElement) {
                    var myChart = echarts.init(domElement);
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