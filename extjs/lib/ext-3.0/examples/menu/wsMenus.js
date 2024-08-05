/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * 刘明
 * http://www.lgws.com.cn
 */
Ext.onReady(function(){
    Ext.QuickTips.init();

   
    var store = new Ext.data.ArrayStore({
        fields: ['abbr', 'state'],
        data : Ext.exampledata.states 
    });

    
    var tb = new Ext.Toolbar();
    tb.render('toolbar');
//构建子菜单，修改时通过循环语句赋值
var aMenu = new Ext.menu.Menu();
    for (var i = 0; i < 5; ++i){
        aMenu.add({
            text: 'aaa ' + (i + 1)
        });
    }
    var dMenu = new Ext.menu.Menu();
    for (var i = 0; i < 8; ++i){
        dMenu.add({
            text: 'ddd ' + (i + 1)
        });
    }
    var scrollMenu = new Ext.menu.Menu();
    for (var i = 0; i < 6; ++i){
        scrollMenu.add({
            text: 'Item ' + (i + 1)
        });
    }
	
//构建菜单的时候为了按照权限分配可使用功能，每个items中的元素都要赋id的值	//text菜单名称，handler钩子事件功能，iconCls选择图标功能，menu子菜单容器，tooltip菜单说明，分割线用'-'表示
  //  bmenu.items.get('ableMe').disable();
	//amenu.items.get('disableMe').disable();
  
    // scrollable menu
	  
	
	  tb.add(
			 new Ext.Toolbar.SplitButton({icon: 'preview.png',cls: 'x-btn-text-icon',text: '系统管理',menu: aMenu}),'-',
			 new Ext.Toolbar.SplitButton({icon: 'preview.png',cls: 'x-btn-text-icon',text: '车辆管理',menu: dMenu}),'-',
			 new Ext.Toolbar.SplitButton({icon: 'preview.png',cls: 'x-btn-text-icon',text: '人员管理',menu: scrollMenu}),'-'
			);

    tb.doLayout();

    // functions to display feedback
    function onButtonClick(btn){
        Ext.example.msg('Button Click','You clicked the "{0}" button.', btn.text);
    }

    function onItemClick(item){
        Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }

    function onItemCheck(item, checked){
        Ext.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }

    function onItemToggle(item, pressed){
        Ext.example.msg('Button Toggled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
    }

});