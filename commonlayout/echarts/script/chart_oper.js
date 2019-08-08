/* echarts图操作工具方法 */
var ChartOper = function () {

    var queryChart1 = function () {
        loadChartBase('#chart1', function (callback) {
            /*$.post(chartAjaxDataUrl,{
                "chartDataType":"test1"
            }, function (responseText) {
                if (responseText != null) {
                    var option = getOption(responseText.seriesData, responseText.legendData);
                    callback(option);
                }
            });*/
            var responseText = getChartData1();
            var option = getOption(responseText.seriesData, responseText.legendData);
            callback(option);
        });

        function getOption(seriesData, legendData) {
            return {
                title : {
                    text: '各部门人员占比',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 60,
                    top: 20,
                    data: legendData
                },
                series : [
                    {
                        name:'数量（个）',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        }
    }

    var queryChart2 = function () {
        loadChartBase('#chart2', function (callback) {
            /*$.post(chartAjaxDataUrl,{
                "chartDataType":"test1"
            }, function (responseText) {
                if (responseText != null) {
                    var option = getOption(responseText.seriesData, responseText.legendData);
                    callback(option);
                }
            });*/
            var responseText = getChartData2();
            var option = getOption(responseText.seriesData, responseText.legendData);
            callback(option);
        });

        function getOption(seriesData, legendData) {
            return {
                title : {
                    text: '各团队人员占比',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 60,
                    top: 20,
                    data: legendData
                },
                series : [
                    {
                        name:'数量（个）',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        }
    }

    var getChartData1 = function () {
        return {
            seriesData : [{
                name : "部门1",
                value : 10
            },
            {
                name : "部门2",
                value : 20
            },
            {
                name : "部门3",
                value : 30
            },
            {
                name : "部门4",
                value : 40
            },
            {
                name : "部门5",
                value : 50
            }],
            legendData : ["部门1", "部门2", "部门3", "部门4", "部门5"]
        };
    }

    var getChartData2 = function () {
        return {
            seriesData : [{
                name : "团队1",
                value : 20
            },
                {
                    name : "团队2",
                    value : 30
                },
                {
                    name : "团队3",
                    value : 10
                },
                {
                    name : "团队4",
                    value : 50
                },
                {
                    name : "团队5",
                    value : 40
                }],
            legendData : ["团队1", "团队2", "团队3", "团队4", "团队5"]
        };
    }

    // 加载图形报表base方法
    var loadChartBase = function(selector, getDataFunc) {
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

    return {
        queryChart1 : function () {
            queryChart1();
        },
        queryChart2 : function () {
            queryChart2();
        }
    }
}();