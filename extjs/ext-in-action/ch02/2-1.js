// P19
function Rectangle(width, height) {
    // 定义实例变量
    this.width = width;
    this.height = height;
    // 定义方法（实例方法）
    this.area = function () {
        return this.width * this.height;
    }
}