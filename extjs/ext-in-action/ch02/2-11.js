// P30
// Ext.apply的使用
var config1 = {
    width: 100,
    height: 200,
    alpha: 1
};

var config2 = {
    width: 100,
    alpha: 0.5,
    angle: .25
};

// config1被覆盖前
// Before Ext.apply() Config1 with [100,200] alpha: 1
console.log("Before Ext.apply() Config1 with [%d,%d] alpha: %f",
    config1.width, config1.height, config1.alpha);

// 不管config1原有属性存在与否，一律重写
// 第一个参数是目标对象
// 第一个参数是源对象
Ext.apply(config1, config2);

// config1被覆盖后
// After Ext.apply() Config1 with [100,200] alpha: 0.5 angle: 0.25
console.log("After Ext.apply() Config1 with [%d,%d] alpha: %f angle: %f",
    config1.width, config1.height, config1.alpha, config1.angle);
