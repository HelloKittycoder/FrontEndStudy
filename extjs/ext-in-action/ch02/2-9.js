// P28
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

// 类Car
function Car(config) {
    Vehicle.prototype.constructor.call(this, config);
    this.color = config.color;
}

// 使用Ext提供的extend函数
// 第1个参数是子类
// 第2个参数是子类
// 第3个参数是要重写的方法
Ext.extend(Car, Vehicle, {
    // 重写父类的move
    move: function (dx) {
        this.x += dx;
    },
    // 重写父类的toString()
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
