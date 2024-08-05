// P20
function Rectangle(width, height) {
    // 定义实例变量
    this.width = width;
    this.height = height;
}

// 该方法对于所有Rectangle对象都共用一个
Rectangle.prototype.area = function () {
    return this.width * this.height;
}

var rect = new Rectangle(30, 20);
console.log("Rectangle rect has area: %d", rect.area());