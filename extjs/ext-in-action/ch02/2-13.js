// P32
// Ext.override
function Car() {
}
Car.prototype.move = function () {
    return "car moves";
}
Car.prototype.toString = function () {
    return "This is a car";
}

// Ext.override()重写的是Car的prototype
Ext.override(Car, {
    move: function () {
        return "car moves fancy";
    },
    toString: function () {
        return "This is not just a car";
    },
    // 不是方法也可以重写
    hahaha: "WaHaHa!!"
});

var car = new Car();
console.log(car.move()); // car moves fancy
