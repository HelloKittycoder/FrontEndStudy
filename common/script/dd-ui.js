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
            },
            /**
             * 删除数组中的多个元素
             * @param originalArr 原始数组
             * @param elements 需要删除的元素（多个的话以逗号进行分隔）
             * @returns 删除元素后的数组（这里直接操作了原始数组originalArr，因为数组是引用类型
             * ，可以直接取originalArr；这个函数可以不返回originalArr）
             *
             * 使用示例：
             * $.ddcommon.removeArrayElements([1,2,3,4,5], '55,3,2'); // [1,4,5]
             * $.ddcommon.removeArrayElements(['aa','bb','cc','dd','ee'], 'ee,cc,dd,kkk'); // ['aa','bb']
             */
            removeArrayElements : function (originalArr, elements) {
                if (!$.ddcommon.isArray(originalArr)) {
                    throw "originalArr is not Array";
                }
                var ele;
                var excludeElementsArr = elements ? elements.split(",") : [];
                for (var i = originalArr.length - 1; i >= 0; i--) {
                    ele = originalArr[i] + "";
                    if ($.inArray(ele, excludeElementsArr) > -1) {
                        originalArr.splice(i, 1);
                    }
                }
                return originalArr;
            },
            /**
             * 判断数组中是否有重复数据（https://zhidao.baidu.com/question/430438748927025572.html）
             * @param arr 原始数组
             * @returns 是否有重复数据，有则返回true，否则返回false
             *
             * 使用示例：
             * $.ddcommon.checkIsRepeat([1,2,3,3,4]); // true
             * $.ddcommon.checkIsRepeat([1,2,3,4]); // false
             */
            checkIsRepeat: function (arr) {
                var hash = {};
                for(var i in arr) {
                    if(hash[arr[i]])
                        return true;
                    hash[arr[i]] = true;
                }
                return false;
            },
            /**
             * 获取日期的起止区间（起：周一对应的日期、止：周日对应的日期）
             *
             * @param date Date类型的对象
             * @param format 如果不传，则不做格式化
             * @returns 数组，有2个元素（如果传了format，则为字符串；没传的话，则为Date格式）
             *
             * 使用示例：
             * $.ddcommon.getWeekInterval(new Date(2022,4,21), "yyyy-MM-dd"); // [2022-05-16,2022-05-22]
             * $.ddcommon.getWeekInterval(new Date(2022,4,16), "yyyy-MM-dd"); // [2022-05-16,2022-05-22]
             * $.ddcommon.getWeekInterval(new Date(2022,4,22), "yyyy-MM-dd"); // [2022-05-16,2022-05-22]
             */
            getWeekInterval: function (date, format) {
                if (!date || !(date instanceof Date)) {
                    throw "date必须是Date类型";
                }

                // 获取当前是星期几（周日的话，getDay()返回0，这里排在第7天；周一至周六的话，getDay()返回1~6）
                var day = date.getDay() || 7;
                var startDate = new Date();
                var endDate = new Date();

                startDate.setDate(date.getDate() - (day - 1));
                endDate.setDate(startDate.getDate() + 6);

                var resultArr = [];
                if (format) {
                    resultArr.push($.hbcommon.dateFormat(startDate, format), $.hbcommon.dateFormat(endDate, format));
                } else {
                    resultArr.push(startDate, endDate);
                }
                return resultArr;
            },
            /**
             * 日期格式化
             * @param date Date类型的对象
             * @param format 如果不传，默认值为 yyyy-MM-dd hh:mm:ss
             * @return 格式化后的日期字符串
             * 参考链接：https://www.cnblogs.com/tugenhua0707/p/3776808.html
             *
             * 使用示例：
             * // 比如：今天是2021-06-15 18:10:05
             * $.ddcommon.dateFormat(new Date()); // 2021-06-15 18:10:05
             * $.ddcommon.dateFormat(new Date(), "yyyyMMdd"); // 20210615
             */
            dateFormat: function (date, format) {
                if (!date || !(date instanceof Date)) {
                    throw "date必须是Date类型";
                }
                if (!format) {
                    format = "yyyy-MM-dd hh:mm:ss";
                }

                var o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(format)) {
                    format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                }
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(format)){
                        format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }
                return format;
            },
            /**
             * 格式化文件大小，输出成带单位的字符串
             * @param {Number} size 文件大小
             * @param {Number} [pointLength=2] 精确到的小数点数
             * @param {Array} units 单位数组
             * @returns {*}
             *
             * @example
             * console.log($.ddcommon.formatSize(100)); // 100B
             * console.log($.ddcommon.formatSize(1024)); // 1.00K
             * console.log($.ddcommon.formatSize(1024 * 1024)); // 1.00M
             * console.log($.ddcommon.formatSize(1024 * 1024 * 1024)); // 1.00G
             * console.log($.ddcommon.formatSize(1024 * 1024 * 1024, 0, ['B', 'K', 'M']); // 1024.00M
             * console.log($.ddcommon.formatSize(1024 * 1024 * 1024, 0, ['B', 'K']); // 1048576.00K
             *
             * 参考链接：这个是看的baidu的webuploader源码后改的
             */
            formatSize: function (size, pointLength, units) {
                units = units || ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
                var unit;
                while ((unit = units.shift()) && units.length > 0 && size >= 1024) {
                    size /= 1024;
                }
                return (unit === 'B' ? size : size.toFixed(pointLength || 2))
                    + unit;
            }
        },
        // 常用正则
        ddreg : {
            /**
             * 校验密码
             * 要求：长度必须在8-16位且至少同时包含数字、大写字母、小写字母及特殊字符中的三种字符
             * 参考链接：https://blog.csdn.net/u012967849/article/details/84037792
             *
             * $.ddreg.checkPassword("aaaa1234", console.log); // false
             * $.ddreg.checkPassword("aaa?123A", console.log); // true
             * @param passwordStr
             * @param callback
             */
            checkPassword : function (passwordStr, callback) {
                var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/;
                // 或者写成（参考：https://www.xp.cn/b.php/33838.html）
                // var reg = new RegExp("^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,16}$");
                var result = reg.test(passwordStr);
                if (callback) callback(result);
            },
            /**
             * 校验密码（可以指定长度的范围）
             * 要求：长度必须在[a,b]位且至少同时包含数字、大写字母、小写字母及特殊字符中的三种字符
             * 参考链接：https://www.cnblogs.com/daizhonghai1314/articles/2951572.html
             *
             * $.ddreg.checkPasswordNum("aaaa1234", 8, 16 ,console.log); // false
             * $.ddreg.checkPasswordNum("aaa?123A", 8, 16 ,console.log); // true
             * $.ddreg.checkPasswordNum("a?A", 2, "", console.log); // true
             * $.ddreg.checkPasswordNum("a?Aa", "", 4, console.log); // true
             *
             * @param passwordStr
             * @param start
             * @param end
             * @param callback
             */
            checkPasswordNum : function (passwordStr, start, end, callback) {
                if (start == undefined || start == "") {
                    start = 0;
                }
                var reg = new RegExp("^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{"+start+","+end+"}$");
                var result = reg.test(passwordStr);
                if (callback) callback(result);
            },
            /**
             * 是否为整数
             * 参考链接：https://www.cnblogs.com/xianfengzhike/p/9525814.html
             *
             * $.ddreg.isInt(12, console.log); // true
             * $.ddreg.isInt('12a', console.log); // false
             * $.ddreg.isInt(-12, console.log); // true
             * $.ddreg.isInt('-12a', console.log); // false
             * @param str
             * @param callback
             */
            isInt : function(str, callback) {
                var reg = /^-?[1-9]\d*$/;
                var result = reg.test(str);
                if (callback) callback(result);
            },
            /**
             * 是否为正整数
             *
             * $.ddreg.isPositiveInt(12, console.log); // true
             * $.ddreg.isPositiveInt(-12, console.log); // false
             * @param str
             * @param callback
             */
            isPositiveInt : function(str, callback) {
                var reg = /^[1-9]\d*$/;
                var result = reg.test(str);
                if (callback) callback(result);
            },
            /**
             * 判断是否为数字
             *
             * $.ddreg.isNum(str, console.log); // str依次放入（-1，+5，5，0.5）中的数字均为true
             * @param str
             * @param callback
             */
            isNum : function (str, callback) {
                var reg = /^(-|\+)?\d+.?[0-9]*$/;
                var result = reg.test(str);
                if (callback) callback(result);
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
            },
            // 获取表格的总列数
            getTotalColumns : function (tableId) {
                // $("#table2>thead>tr:eq(0)").find("th[colspan],td[colspan]")
                var tr0 = $("#" + tableId + ">thead>tr:eq(0)"); // 获取表头对应的行
                var hasColspanTds = tr0.find("th[colspan],td[colspan]"); // 获取带colspan的td
                var notHasColspanTds = tr0.find("th,td").not("[colspan]"); // 获取不带colspan的td

                var colspanColumnNum = 0;
                hasColspanTds.each(function () {
                    colspanColumnNum += parseInt($(this).attr("colspan"));
                });

                return colspanColumnNum + notHasColspanTds.length;
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
            },
            /**
             * 获取被处理的echarts的dom
             * 解决出现警告（There is a chart instance already initialized on the dom），同时页面不生成新的图的问题
             * @param elementId
             */
            getProcessedEcharts: function (elementId) {
                var dom = document.getElementById(elementId);
                var myChart = echarts.getInstanceByDom(dom);
                // 避免出现在原dom上画图，新数据不生效的情况
                if (myChart) {
                    myChart.dispose();
                }
                myChart = echarts.init(dom);
                return myChart;
            }
        },
        // 数组操作工具方法
        ddarray : {
            /**
             * 向数组中批量添加元素（要批量添加的元素放在数组里）
             * 参考链接：https://javascript.ruanyifeng.com/oop/this.html#toc8
             *
             * 使用：
             * var a = [{aa:11}];
             * $.ddarray.push(a, [{bb:22},{cc:33}]); // 结果为 [{aa:11},{bb:22},{cc:33}]
             * 上面这种写法等同于 Array.prototype.push.apply(a, [{bb:22},{cc:33}]);
             * 等同于 Array.prototype.push.call(a,{bb:22},{cc:33});
             * 等同于 a.push({bb:22},{cc:33});
             */
            push : Function.prototype.apply.bind(Array.prototype.push)
        }
    });
}(jQuery);

$.fn.extend({
    /**
     * jquery对象需要保留的class
     * @param retainClassStr class名称，有多个的话用空格隔开
     * @return {*}
     *
     * e.g.
     * $("#test").retainClass('aa bb');
     */
    retainClass: function (retainClassStr) {
        var retainClassArr = [];
        if (retainClassStr) {
            retainClassArr = retainClassStr.split(" ");
        }

        return this.each(function () {
            if (retainClassArr.length == 0) {
                // 如果需要保留的class为空，则直接移除该元素上的所有class
                $(this).removeClass();
            } else {
                // 如果需要保留的class不为空，则计算出需要移除的class
                $(this).removeClass(function (index, oldClass) {
                    var needRemoveClass = [];
                    if (oldClass) {
                        var oldClassArr = oldClass.split(" ");
                        oldClassArr.forEach(function(item) {
                            // 该class不需要保留
                            if ($.inArray(item, retainClassArr) == -1) {
                                needRemoveClass.push(item);
                            }
                        });
                    }

                    // 返回需要移除的class
                    return needRemoveClass.join(" ");
                });
            }
        });
    }
});

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

// 一些扩展
// indexOf、remove参考了 https://www.jb51.net/article/134312.htm
/**
 * 查找某个元素在数组中第一次出现的位置
 * @return 返回元素在数组中第一次出现的索引；如果找不到，则返回-1
 * 使用示例：[1,2,2,3].indexOf(2)=>1
 *
 * jQuery中$.inArray也实现了同样的功能，使用示例为：
 * $.inArray(2,[1,2,2,3])=>1
 */
Array.prototype.indexOf = Array.prototype.indexOf || function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}

/**
 * 删除数组中的某个元素，只删它第一次出现的位置，不会产生缝隙
 * @return 如果有元素被删除，则返回刚刚被删除的元素；否则返回空数组
 * 使用示例：[1,2,2,3].remove(2)=>[1,2,3]
 */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        return this.splice(index, 1);
    } else {
        return [];
    }
}
