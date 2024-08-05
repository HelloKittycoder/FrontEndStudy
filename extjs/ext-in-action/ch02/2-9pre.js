// P27
function Vehicle() {
    this.x = 0;
    this.y = 0;
}
Vehicle.prototype.move = function (dx, dy) {
    this.x += dx
    this.y += dy
}
Vehicle.prototype.toString = function () {
    return "Point:{" + this.x + "," + this.y +"}";
}

// 车
function Car() {
}
Car.prototype = new Vehicle();
Car.prototype.move = function (dx) {
    this.x += dx;
}
Car.prototype.toString = function () {
    return "Car is " + this.x + " miles away from the original position.";
}

// 电梯
function Elevator() {
}
Elevator.prototype = new Vehicle();
Elevator.prototype.move = function (dy) {
    this.y += dy
}

var car = new Car();
car.move(150);
console.log(car.toString()); // Car is 150 miles away from the original position.

var elevator = new Elevator();
elevator.move(100);
console.log(elevator.toString()); // Point:{0,200}

