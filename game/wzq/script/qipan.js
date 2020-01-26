(function () {
    window.onload = function (ev) {
        init();
    }

    var gameStatus = 0; // 0 未开始；1 进行中；2 已结束
    var gridNum = 13; // 棋盘的格子数量
    // 初始化棋盘数据
    var data = function (n) {
        var arr = [];
        for (var i = 0; i < (n + 1); i++) {
            arr.push(new Array(n + 1));
        }
        return arr;
    }(gridNum);
    var player = "red"; // 红子先行（红1；蓝2；空 undefined），同时记录当前在下棋的player
    var stepNum = 0;

    // 初始化
    var init = function() {
        createChessBoard(gridNum);
        createSerialNum(gridNum);
    }

    /**
     * 创建棋盘序号（格子数量为n*n）
     * @param n
     */
    var createSerialNum = function (n) {
        var topNum = document.getElementsByClassName("topNum")[0];
        var leftNum = document.getElementsByClassName("leftNum")[0];
        var rightNum = document.getElementsByClassName("rightNum")[0];
        var bottomNum = document.getElementsByClassName("bottomNum")[0];

        appendNumDiv(topNum);
        appendNumDiv(leftNum);
        appendNumDiv(rightNum);
        appendNumDiv(bottomNum);

        function appendNumDiv(xxxNumDiv) {
            var numDiv;
            var text;
            for (var i = 0; i < (n + 1); i++) {
                numDiv = document.createElement("div");
                numDiv.className = "qipanNum";
                text = document.createTextNode(i + 1);
                numDiv.appendChild(text);
                xxxNumDiv.appendChild(numDiv);
            }
        }
    }

    /**
     * 创建棋盘（格子数量为n*n）
     * @param n
     */
    var createChessBoard = function (n) {
        var qipan = document.getElementById("qipan");

        // 创建格子
        var gridDiv;
        // 9*9=>10*10共100张图
        // 13*13=>14*14共196张图，196个点
        for (var i = 0; i < (n + 1) * (n + 1); i++) {
            gridDiv = document.createElement("div");
            gridDiv.className = "grid";
            gridDiv.setAttribute("xpoint", Math.floor(i / 14) + 1); // x坐标
            gridDiv.setAttribute("ypoint", i % (n + 1) + 1); // y坐标
            qipan.appendChild(gridDiv);
        }

        // 绑定点击事件
        qipan.addEventListener("click", function (ev) {
            var target = ev.target;
            if (gameStatus == 0) { // 如果是“未开始”状态，就改成“进行中”
                gameStatus = 1;
                document.getElementById("statusText").innerText = "进行中";
            }
            if (gameStatus == 2) { // 如果是“已结束”状态，就直接返回
                return;
            }
            checkPiece(target, player);
            recordPieceData(target, player);
            // 正在进行，且已经达到赢的条件，则更改游戏状态
            if (gameStatus == 1 && checkWin(target, player)) {
                gameStatus = 2;
                document.getElementById("statusText").innerText = "游戏结束," + strToPagetext(player) + "胜利！";
                return;
            }
            // 控制顺序为红、蓝、红、蓝、...
            if (player == "red") {
                player = "blue";
            } else {
                player = "red";
            }
        });
    }

    // 放置棋子
    var checkPiece = function (target, color) {
        if (target.innerHTML == "") {
            var pieceDiv = document.createElement("div");
            pieceDiv.className = "piece";
            pieceDiv.style.backgroundColor = color;
            pieceDiv.appendChild(addStepNum());
            target.append(pieceDiv);

            stepNum++;
        }
    }

    // 悔棋
    var undoChess = function (data) {
    }

    // 重新开始
    var restartChess = function (data) {
    }

    // 获取目标div的坐标（(3,4)存放在数组的data[2][3]里）
    var getCoordinate = function (gridDiv) {
        return {
            x : parseInt(gridDiv.getAttribute("xpoint")),
            y : parseInt(gridDiv.getAttribute("ypoint"))
        };
    }

    // 记录坐标数据
    var recordPieceData = function (target, color) {
        var c = getCoordinate(target); // 坐标
        data[c.x - 1][c.y - 1] = colorToNum(color);
    }

    // （红1；蓝2；空 undefined）
    var colorToNum = function (str) {
        if (str == "red") {
            return 1;
        }
        if (str == "blue") {
            return 2;
        }
        return undefined;
    }

    // 将数字转换为页面上显示的文本
    var strToPagetext = function (num) {
        if (num == "red") {
            return "红方";
        }
        if (num == "blue") {
            return "蓝方";
        }
        return "未知";
    }

    // 添加步数
    var addStepNum = function () {
        var stepNumDiv = document.createElement("div");
        stepNumDiv.className = "stepNum";

        var text = document.createTextNode(stepNum);
        stepNumDiv.appendChild(text);
        return stepNumDiv;
    }

    // 判断是否赢了
    var checkWin = function (target, color) {
        var c = getCoordinate(target); // 坐标
        var xPoint = c.x - 1;
        var yPoint = c.y - 1;
        var gridNum = data.length;
        var colorNum = colorToNum(color); // 颜色对应的数字

        // 左上
        var count = 0;
        for (var i = xPoint, j = yPoint; (i >= 0 && i > xPoint - 5) && (j >= 0 && j > yPoint - 5);
            i--, j--) {
            if (data[i][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 上
        count = 0;
        for (var i = xPoint; i >= 0 && i > xPoint - 5; i--) {
            if (data[i][yPoint] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 右上
        count = 0;
        for (var i = xPoint, j = yPoint; (i < gridNum && i < xPoint + 5) && (j >= 0 && j > yPoint - 5);
              i++, j--) {
            if (data[i][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 右
        count = 0;
        for (var j = yPoint; j < gridNum && j < yPoint + 5; j++) {
            if (data[xPoint][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 右下
        count = 0;
        for (var i = xPoint, j = yPoint; (i < gridNum && i < xPoint + 5) && (j < gridNum && j < yPoint + 5);
             i++, j++) {
            if (data[i][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 下
        count = 0;
        for (var i = xPoint; i < gridNum && i < xPoint + 5; i++) {
            if (data[i][yPoint] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 左下
        count = 0;
        for (var i = xPoint, j = yPoint; (i >= 0 && i > xPoint - 5) && (j < gridNum && j < yPoint + 5);
             i--, j++) {
            if (data[i][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        // 左
        count = 0;
        for (var j = yPoint; j > 0 && j > yPoint - 5; j--) {
            if (data[xPoint][j] == colorNum) {
                count++;
            }
        }
        if (count == 5) {
            return true;
        }

        return false;
    }
})();