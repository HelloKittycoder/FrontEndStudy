/* echarts图操作工具方法 */
var BarDemo = function () {

    var pageEchartsElements = new MyArray({
        push : function () {
            // 如何给绑定事件传入数据？
            // 参考链接：https://zhidao.baidu.com/question/396453758295149125.html
            // http://jquery.cuishifeng.cn/resize.html

            // console.log("添加了一个元素" + this);
            // resize里传的this和上面打印的this是一样的，都是在调用push方法时添加的echarts元素
            $(window).resize(this, function (d) {
                d.data.resize();
            });
        }
    });

    var queryChart1 = function () {
        $.ddchart.loadChartBase('#chart1', function (callback) {
            /*$.post(chartAjaxDataUrl,{
                "chartDataType":"test1"
            }, function (responseText) {
                if (responseText != null) {
                    var option = getOption(responseText.seriesData, responseText.legendData);
                    callback(option);
                }
            });*/
            var responseText = getChartData1();
            var option = getOption(responseText.axisData, responseText.seriesData, responseText.legendData);
            pageEchartsElements.push(callback(option));
        });

        function getOption(axisData, seriesData, legendData) {
            return {
                title: {
                    text: '本周访问量统计',
                    x: 'center'
                },
                color: ['#ffd75c'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: 60,
                    top: 20,
                    data: legendData
                },
                xAxis : [
                    {
                        type : 'category',
                        name : '工作日',
                        data : axisData['x'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '访问量（次）'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%', // 经过尝试发现barWidth设置成百分比需要echarts3.2.2才支持
                        data: seriesData
                    }
                ]
            };
        }
    }

    var queryChart2 = function () {
        $.ddchart.loadChartBase('#chart2', function (callback) {
            var responseText = getChartData2();
            var option = getOption(responseText.axisData, responseText.seriesData, responseText.legendData);
            pageEchartsElements.push(callback(option));
        });

        function getOption(axisData, seriesData, legendData) {
            var labelOption = {
                normal: {
                    show: true,
                    position: 'top'
                }
            };
            return {
                title: {
                    text: '历年植被面积变动',
                    x: 'center'
                },
                color: ['#FFD67B', '#5CEAA3', '#FE9191', '#62B9F1'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
                    top: 25
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        name: '年份',
                        axisTick: {show: false},
                        data: axisData['x']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '植被面积（km^2）'
                    }
                ],
                series: [
                    {
                        name: 'Forest',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        data: seriesData[0]
                    },
                    {
                        name: 'Steppe',
                        type: 'bar',
                        label: labelOption,
                        data: seriesData[1]
                    },
                    {
                        name: 'Desert',
                        type: 'bar',
                        label: labelOption,
                        data: seriesData[2]
                    },
                    {
                        name: 'Wetland',
                        type: 'bar',
                        label: labelOption,
                        data: seriesData[3]
                    }
                ]
            };
        }
    }

    var getChartData1 = function () {
        return {
            axisData : {
                x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            seriesData : [10, 52, 200, 334, 390, 330, 220],
            legendData : ['直接访问']
        };
    }

    var getChartData2 = function () {
        return {
            axisData : {
                x: ['2012', '2013', '2014', '2015', '2016']
            },
            seriesData : [
                [320, 332, 301, 334, 390],
                [220, 182, 191, 234, 290],
                [150, 232, 201, 154, 190],
                [98, 77, 101, 99, 40]
            ],
            legendData : ['Forest', 'Steppe', 'Desert', 'Wetland']
        };
    }

    return {
        queryChart1 : function () {
            queryChart1();
        },
        queryChart2 : function () {
            queryChart2();
        },
        getPageEchartsElements : function () {
            return pageEchartsElements;
        }
    }
}();

$(function () {
    $.ddchart.initEchart();
});