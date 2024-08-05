Ext.ns('Aitch.ext.EmotionTextBox');

// 初始版
/*Aitch.ext.EmotionTextBox = Ext.extend(Ext.BoxComponent, {
    initComponent: function () {
        console.log("INIT EmotionTextBox");
        Aitch.ext.EmotionTextBox.superclass.initComponent.call(this);
    },
    onRender: function (container, position) {
        console.log("RENDER EmotionTextBox");
        Aitch.ext.EmotionTextBox.superclass.onRender.call(this, container, position);
    }
});*/

// 改进版
Aitch.ext.EmotionTextBox = Ext.extend(Ext.BoxComponent, {
    initComponent: function () {
        console.log("INIT EmotionTextBox");
        Aitch.ext.EmotionTextBox.superclass.initComponent.call(this);
        this.tpl = new Ext.Template(
            '<img src="{iconType}" style="width: 24px; height: 24px"/>',
            '<div class="{contentCls}">{content}</div>'
        );
    },
    onRender: function (container, position) {
        console.log("RENDER EmotionTextBox");
        Aitch.ext.EmotionTextBox.superclass.onRender.call(this, container, position);
        
        // this.el就是给当前组件创建的div容器
        this.tpl.append(this.el, {
            iconType: this.iconType,
            contentCls: this.contentCls,
            content: this.text
        });
        this.el.addClass('emotion-wrapper');
    }
});

// 将各种表情定义为常量，以减少用户可能出现的输入错误（这里暂时只用一张图片来验证下，其他表情就不定义了）
Aitch.ext.EmotionTextBox.SMILE = 'images/smile.png';

Ext.reg('aitch_emotiontextbox', Aitch.ext.EmotionTextBox);