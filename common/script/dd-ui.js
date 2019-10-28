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
            // 判断一个逗号分隔字符串中是否已经包含另一个逗号分隔字符串
            // 如："11,22,44,33"中包含"33,22"
            // $.ddcommon.isInAnotherCommaStr("11,22,44,33","33,22")
            isInAnotherCommaStr : function (originalStr, inStr) {
                var flag = true;

                var inStrArr = inStr.split(",");
                var originalStrArr = originalStr.split(",");

                for (var i = 0; i < inStrArr.length; i++) {
                    if ($.inArray(inStrArr[i], originalStrArr) == -1) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            // 移除逗号分隔字符串中的某个部分（目前inStr不能是多个逗号分隔的），默认会移除最后一个逗号
            // $.ddcommon.removeStrInCommaStr("11,22,44,33","33") 结果为：11,22,44
            removeStrInCommaStr : function (originalStr, inStr, notRemoveLastComma) {
                if (originalStr) {
                    // 如果originalStr不是以
                    if (originalStr.substr(originalStr.length - 1, originalStr.length) != ",") {
                        originalStr += ",";
                    }

                    var removeStr = inStr + ",";
                    var p = originalStr.indexOf(removeStr);
                    if (p != -1) {
                        originalStr = originalStr.substr(0, p) + originalStr.substr(p + removeStr.length);
                    }

                    // 如果不要移除最后一个逗号
                    if (!notRemoveLastComma) {
                        originalStr = $.ddcommon.removeLastComma(originalStr);
                    }
                }
                return originalStr;
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
            // 移除多行select中的选中项
            removeSelectedItem : function (s_selector, ids_selector, notRemoveLastComma) {
                // 获取选中项
                var $selectedOption = $(s_selector).find("option:selected");
                if ($selectedOption.length != 0) {
                    var optionVal = $(s_selector).val();

                    // 需要进行比对的id隐藏域
                    var $idsInput = $(ids_selector);
                    var idsVal = $idsInput.val();

                    var newIdsVal = $.ddcommon.removeStrInCommaStr(idsVal, optionVal, notRemoveLastComma);
                    $(ids_selector).val(newIdsVal);
                    $selectedOption.remove();
                }
            },
            /**
             * 选择页面进行数据回写，写到select里
             * @param selectedIds 选中项对应的ids
             * @param selectedNames 选中项对应的names
             * @param openerId opener的id部分的选择器
             * @param openerSelect opener的select部分的选择器
             */
            writeBackItemDataInSelect : function (selectedIds, selectedNames, openerId, openerSelect) {
                // 和opener页面对比，有哪些是opener里没有的，如果是没有的，就加上
                var $openerSelect = window.opener.$(openerSelect);
                var optionHtml = "";
                var appendIds = "";
                for (var i = 0; i < selectedIds.length; i++) {
                    var existed = false;
                    $("option", $openerSelect).each(function () {
                        if ($(this).val() === selectedIds[i]) {
                            existed = true;
                            return false; // 如果找到有重复的，立即退出循环
                        }
                    });
                    if (!existed) {
                        optionHtml += "<option value='" + selectedIds[i] + "'>" + selectedNames[i] + "</option>";
                        appendIds += selectedIds[i] + ",";
                    }
                }

                if (appendIds) { // 如果需要追加
                    $openerSelect.append(optionHtml);

                    var $openerId = window.opener.$(openerId);
                    var openerIdVal = $openerId.val(); // 获取页面原有的ids
                    if (openerIdVal) { // 原有ids非空
                        openerIdVal.endsWith(",") ?
                            $openerId.val(openerIdVal + appendIds) :
                            // 原来如果末尾不带逗号，则拼上去的结果还是末尾不带逗号
                            $openerId.val(openerIdVal + "," + $.ddcommon.removeLastComma(appendIds));
                    } else { // 原有ids为空
                        $openerId.val($.ddcommon.removeLastComma(appendIds));
                    }
                }
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