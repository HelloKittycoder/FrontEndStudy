/**
 * 通用js方法封装处理
 */
!function ($) {
    $.extend({
        ddcommon : {
            // 判断是否为数组（https://www.cnblogs.com/ysk123/p/9995920.html）
            isArray : function(o) {
                return Object.prototype.toString.call(o) == '[object Array]';
            },
            /**
             * 去除字符串最后一个逗号
             * 如：$.ddcommon.removeLastComma("11,22,33,")结果为 11,22,33
             * @param str
             */
            removeLastComma : function (str) {
                return str.replace(/,$/gi,"");
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
            },
            /**
             * 获取url中的指定参数
             * 使用：
             * 例如页面网址为： http://localhost:8080/FrontStudy/bar_demo01.html?myparam=111&chart.type=bar
             * $.ddpage.getUrlParamByName("myparam"); // 111
             * $.ddpage.getUrlParamByName("chart.type"); // bar
             * @param paramName
             */
            getUrlParamByName : function (paramName) {
                // 获取url参数
                return $.ddpage.getUrlParams()[paramName];
            },
            // 获取url中的全部参数
            getUrlParams : function () {
                var url = location.search;
                var _params = {};
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        _params[strs[i].split("=")[0]] = strs[i].split("=")[1];
                    }
                }
                return _params;
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
                    applyElement(this, theme)
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
                        // 也可以在这里将所有的echarts绑定和window的resize事件绑定
                        // $(window).resize(myChart.resize);
                        // 如果不需要全局性的操作，不建议这样写；
                        // 可以写成bar_demo.js中MyArray的方式，需要的时候就进行绑定
                        return myChart;
                    });
                }
            }
        }
    });
}(jQuery);

/**
 * 自定义数组
 * @param option 选项
 * @constructor
 *
 * 使用示例：
     var a = new MyArray({
            push : function() {
                console.log("添加一个元素：" + this);
            }
        });
     a.push("111");
     a.push("测试数据");
     a.getArr();
 *
 * 如何监听数组的添加操作，或者说监听数组的变动？
 * 参考链接：
 * https://www.cnblogs.com/yayaxuping/p/9925675.html
 * https://blog.csdn.net/lookbackward/article/details/78365737
 * http://www.51xuediannao.com/javascript/javascriptjtszbh_1258.html
 */
function MyArray(option) {
    this.arr = [];
    // 每次创建好一个MyArray实例，只要向这个数组中添加元素，就会调用已经绑定的push方法的回调函数
    this.push = function (ele) {
        this.arr.push(ele);
        option ? option["push"].call(ele) : "";
    };
}

// prototype的方法不是在某个具体的实例上，而是在这一类的对象上（比如：MyArray）
MyArray.prototype.getArr = function () {
    return this.arr;
}