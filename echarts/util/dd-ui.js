/**
 * 通用js方法封装处理
 */
!function ($) {
    $.extend({
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