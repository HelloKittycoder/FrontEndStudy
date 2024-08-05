// P31
// Ext.apply的使用，带有默认值
var defaults = {
    width: 50,
    alpha: 1,
    color: "white"
};

var config1 = {
    width: 100,
    height: 200,
    alpha: 1
}

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
Ext.apply(config1, config2, defaults);

// config1被覆盖后
// After Ext.apply() Config1 with [100,200] alpha: 0.5 angle: 0.25 color: white
console.log("After Ext.apply() Config1 with [%d,%d] alpha: %f angle: %f color: %s",
    config1.width, config1.height, config1.alpha, config1.angle, config1.color);
