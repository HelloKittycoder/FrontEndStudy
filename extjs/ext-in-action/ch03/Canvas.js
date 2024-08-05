Ext.ns('Application.CustomizedButtonEvent');
Application.Canvas = function (config) {
    this.containerDiv = '';
    this.rowNum = 0;
    this.colNum = 0;
    this.squareSize = 10;
    this.drawType = Application.Canvas.DRWA_BY_COL;
    
    Ext.apply(this, config);
}

Application.Canvas.prototype = {
    drawSquare: function (squareNum, offsetPX, direction) {
        var dh = Ext.DomHelper;
        // 将要创建的元素先放到数组中
        var children = [];
        for (var i = 0; i < squareNum; i++) {
            children.push({
                tag: 'div',
                // 定义类名
                cls: 'canvas-pixel-div',
                // 确保div能够正常显示，需要在内容中放一个空白字符或&nbsp
                html: ' ',
                // 使用style属性设定大小
                style: 'width:' + this.squareSize + 'px;height:' + this.squareSize + "px;"
            });
        }
        // 使用一个动态div包括所有的方块，以便DomHelper可以一次创建完全部的方块
        var resultDom = {
            tag: 'div',
            cls: 'fake-container',
            children: children
        };
        
        // 放置resultDom以定位
        dh.append(this.containerDiv, resultDom);
        
        // 接下来通过类名查询所有的方块
        var doms = Ext.query('div.canvas-pixel-div');
        var initPos = 0;
        for (var i = 0; i < doms.length; i++) {
            if (direction == Application.Canvas.DRWA_BY_COL) { // vertical
                // 按照列进行绘图
                // 动态截取每个DOM并产生Element
                // 以便使用MoveTo()方法移动方块至定位点(x, y)
                Ext.fly(doms[i]).moveTo(0, initPos);
                // 累加某个固定的值
                initPos += offsetPX;
            } else { // horizontal
                // 按照行进行绘图
                // 动态截取每个DOM并产生Element
                // 以便使用MoveTo()方法移动方块至定位点(x, y)
                Ext.fly(doms[i]).moveTo(initPos, 0);
                // 累加某个固定的值
                initPos += offsetPX;
            }
        }
        // console.log('initPos: ', initPos);
    }
};

Application.Canvas.DRWA_BY_ROW = "byRow";
Application.Canvas.DRWA_BY_COL = "byColumn";
Application.Canvas.DRWA_HARD = "drawHard";
Application.Canvas.DRWA_SOFT = "drawSoft";

Ext.onReady(function () {
    var config = {
        containerDiv: 'canvasContainer',
        squareSize: 20,
        rowNum: 20,
        colNum: 20,
        drawType: Application.Canvas.DRWA_BY_COL
    };
    var canvas = new Application.Canvas(config);
    console.time('testPerformance');
    canvas.drawSquare(30, 10, Application.Canvas.DRWA_BY_COL)
    console.timeEnd('testPerformance');
});