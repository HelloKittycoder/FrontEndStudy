// P29
// 使用对象作为设置参数
function Vehicle(config) {
    this.x = config.x;
    this.y = config.y;
}
Vehicle.prototype.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
}
Vehicle.prototype.toString = function () {
    return "Point:{" + this.x + "," + this.y +"}";
}

// 懒人用的子类继承方法
var Car = Ext.extend(Vehicle, {
    // 构造函数也可以重写
    constructor: function (config) {
        Vehicle.prototype.constructor.call(this, config);
        this.color = config.color;
    },
    // 重写move
    move: function (dx) {
        this.x += dx;
    },
    // 重写toString
    toString: function () {
        var str = "Car is " + this.x +
            " miles away from the original position.";
        str += "This car is: " + this.color;
        return str;
    }
});

// 使用对象作为设置参数
var carConfig = {
    x: 10,
    y: 0,
    color: "white"
};
var car = new Car(carConfig);
car.move(150);
console.log(car.toString()); // Car is 160 miles away from the original position.This car is: white
