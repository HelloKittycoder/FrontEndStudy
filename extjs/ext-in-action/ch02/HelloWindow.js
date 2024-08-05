// P33
// 2.1.5 实战练习：预配置类
var HelloWindow = Ext.extend(Ext.Window, {
    title: 'Hello',
    width: 500,
    height: 300,
    initComponent: function () {
        console.log("Start HelloWindow component.");
        HelloWindow.superclass.initComponent.apply(this, arguments);
    }
});