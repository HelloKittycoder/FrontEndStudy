// P21
// 实例方法和prototype方法性能差异对比
function Person1() {
    this.test = function () {
        return 1;
    }
}

function Person2() {
}
Person2.prototype.test = function () {
    return 1;
}

var p1 = [];
var p2 = [];

// 测试创建10000个实例并调用test方法的时间
console.time("p1 runs10000times");
for (var i = 0; i < 10000; i++) {
    p1[i] = new Person1();
    p1[i].test();
}
console.timeEnd("p1 runs10000times");

console.time("p2 runs10000times");
for (var j = 0; j < 10000; j++) {
    p2[j] = new Person2();
    p2[j].test();
}
console.timeEnd("p2 runs10000times");

/**
 * p1 runs10000times: 1.4970703125 ms
 * p2 runs10000times: 0.85888671875 ms
 * 从时间上来看，使用prototype效率更高
 */