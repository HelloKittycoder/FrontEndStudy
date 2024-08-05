Ext.namespace('Aitch.ext.LoginForm');

// Constructor
Aitch.ext.LoginForm = function (config) {
    
    // public properties
    // 经常实用的配置属性可放在这里
    this.renderTarget = 'container';
    this.formTitle = '登录表单';
    this.formWidth = 300;
    this.formHeight = 230;
    this.formIcon = 'images/login.png';
    this.formLegend = '请输入账号密码';
    this.form = null;
    this.accountLabel = 'Username';
    this.accountField = 'username';
    this.accountVtype = null;
    this.passwordLabel = 'Password';
    this.passwordField = 'password';
    this.passwordVtype = null;
    this.submitAction = null;
    
    // 如果要修改常用属性，可以将新的数值放在config内
    // Ext.apply()会将旧值取代
    Ext.apply(this, config);
    
    // private properties
    // 位置固定的组件可以放在这里
    var banner = {
        xtype: 'box',
        autoEl: {
            html:'<div class="login_banner">' +
                    '<img src="' + this.formIcon + '"/>' +
                    '<span>' + this.formLegend + '</span>' +
                '</div>'
        },
        style: 'font-size:1.5em;width:100%;text-align:center;padding:15px'
    };
    
    var account = {
        xtype: 'textfield',
        fieldLabel:this.accountLabel,
        name:this.accountField,
        anchor:'90%',
        allowBlank:false,
        blankText:'本字段不可为空',
        minLength:4,
        minLengthText:'账号最少4个字符',
        maxLength:25,
        maxLengthText:'账号最多25个字符',
        msgTarget:'under',
        vtype:this.accountVtype,
        vtypeText:this.accountVtype!=null?'格式不符合':''
    };

    var password = {
        xtype: 'textfield',
        fieldLabel:this.passwordLabel,
        name:this.passwordField,
        anchor:'90%',
        allowBlank:false,
        blankText:'密码不可为空',
        minLength:4,
        minLengthText:'密码最少4个字符',
        maxLength:25,
        maxLengthText:'密码最多25个字符',
        msgTarget:'under',
        vtype:this.passwordVtype,
        vtypeText:this.passwordVtype!=null?'格式不符合':'',
        inputType:'password'
    };
    
    // config中也可包含用来设置FormPanel的配置属性
    // 使用Ext.apply()为config添加额外的配置属性
    Ext.apply(config, {
        title:this.formTitle,
        width:this.formWidth,
        height:this.formHeight,
        frame:true,
        items:[
            banner, account, password
        ],
        buttons:[
            {text:'提交', handler:this.submitForm, scope:this},
            {text:'清除', handler:this.resetForm, scope:this},
        ]
    });
    this.form = new Ext.form.FormPanel(config);
};

// Methods
Aitch.ext.LoginForm.prototype = {
    submitForm:function () {
        // 程序员可自行实现提交的各种动作
        // 并将自定义的动作放在config的submitAction中
        this.form.getForm().submit(this.submitAction);
    },
    resetForm:function () {
        this.form.getForm().reset();
    },
    renderForm:function () {
        this.form.render(this.renderTarget);
    }
};