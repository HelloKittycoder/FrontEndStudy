// P22
// 类的继承
function Person(name, email) {
    this.name = name;
    this.email = email;
}

Person.prototype.getInfo = function () {
    return "I'm " + this.name + ", with email " + this.email;
}

function Employee(name, email, title) {
    // 如同super，不过必须使用call明确定义scope为Employee的实例
    Person.call(this, name, email);
    this.title = title;
}

// 如果要继承Person，子类的prototype必须指派为父类的实例
Employee.prototype = new Person();

var employee = new Employee("Aitch", "aitch@mail.com", "CIO");
console.log("Employee: " + employee.getInfo());
