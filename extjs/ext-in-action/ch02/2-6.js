// P23
// 类的继承，明确指明子类的构造函数
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

// 如果不需要父类的属性，可以通过delete加以删除
delete Employee.prototype.name;

// 明确指明子类的构造函数
Employee.prototype.constructor = Employee;

var employee = new Employee("Aitch", "aitch@mail.com", "CIO");
console.info("Employee: " + employee.getInfo());
console.info("Employee's Constructor: " + Employee.prototype.constructor);
