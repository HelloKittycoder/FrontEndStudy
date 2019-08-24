var Chinamap_demo01 = function () {

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
            var option = getOption(responseText.seriesData1, responseText.seriesData2);
            callback(option);
        });

        function getOption(seriesData1, seriesData2) {
            return {
                title: {
                    text: '项目情況分布图',
                    //subtext: '纯属虚构',
                    left: 'center'
                },
                backgroundColor:"#F3F3F3",
                tooltip: {
                    trigger: 'item',
                    /* formatter : function(params) {
                         console.log(params[0]);

                         return params[0].name+"<br/>"+params[0].data[params[0].dataIndex].name;
                     }*/
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['项目数量(个)','投资金额（万元）'],
                    selectedMode: 'single',
                },
                visualMap: {
                    //min: 0,
                    //max: 50,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: false
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '项目数量(个)',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        zoom: 1.2,
                        itemStyle: {
                            normal: {
                                areaColor: '#FCFCFC',
                                borderColor: '#D1D1D1'
                            },
                            emphasis: {
                                //areaColor: '#f4e925'//ddb926
                            }
                        },
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:seriesData1
                    }, {
                        name: '投资金额（万元）',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        zoom: 1.2,
                        itemStyle: {
                            normal: {
                                areaColor: '#FCFCFC',
                                borderColor: '#D1D1D1'
                            },
                            emphasis: {
                                //areaColor: '#f4e925'//ddb926
                            }
                        },
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:seriesData2
                    }
                ]
            };
        }
    }

    var getChartData1 = function () {
        return {
            seriesData1 : [{
                name : "北京",
                value : 10
            },
            {
                name : "上海",
                value : 20
            },
            {
                name : "广东",
                value : 30
            },
            {
                name : "浙江",
                value : 40
            }],
            seriesData2 : [{
                name : "北京",
                value : 30
            },
            {
                name : "上海",
                value : 20
            },
            {
                name : "广东",
                value : 10
            },
            {
                name : "浙江",
                value : 40
            }]
        };
    }

    return {
        queryChart1 : function () {
            queryChart1();
        }
    }
}();