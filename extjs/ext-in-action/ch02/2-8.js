// P26
// 委托方式
function AbstractPerson() {
}

AbstractPerson.prototype.assignMagicNumber = function () {
    // console.log("调用AbstractPerson.prototype.assignMagicNumber");
    return Math.random();
}

function Employee(name, email) {
    this.name = name;
    this.email = email;
    this.person = new AbstractPerson();
}

Employee.prototype.getMagicNumber = function () {
    // getMagicNumber实际的操作委托给AbstractPerson的assignMagicNumber
    // console.log("调用Employee.prototype.getMagicNumber");
    return this.person.assignMagicNumber();
}

var employee = new Employee();
console.info("Employee's magic number: " + employee.getMagicNumber());

// 看到P27