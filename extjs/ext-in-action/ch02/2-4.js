// P22
// 2.1.2 定义类方法与类属性
function Person() {
}
// 类属性
Person.id = 0;
// 类方法
Person.createAccount = function () {
    Person.id++;
    return new Person();
}

var david = Person.createAccount();
var mary = Person.createAccount();

console.log("How many people are there? %d people around.", Person.id);
// 结果显示：How many people are there? 2 people around.
