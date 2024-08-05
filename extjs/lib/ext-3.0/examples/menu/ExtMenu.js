
Ext.onReady(function() {
    var dateMenu = new Ext.menu.DateMenu({
        handler: function(datepicker, date){
            alert('Date Selected! you chose: ' + date.format('M j, Y'));
        }
    });

    var colorMenu = new Ext.menu.Menu({
        id: 'colorMenu', // the menu's id we use later to assign as submenu
        items: [
            new Ext.menu.ColorItem({
                selectHandler: function(colorpicker, color){
                    alert('Color Selected! you chose: ' + color);
                }
            })
        ]
    });

    var tb = new Ext.Toolbar('toolbar', [{
            text:'Our first Menu',
            menu: {
                id: 'basicMenu',
                items: [{
                        text: 'An item',
                        handler: clickHandler
                    }, {
                        text: 'Another item',
                        handler: clickHandler
                    },
                    '-',
                    new Ext.menu.CheckItem({
                        text: 'A check item',
                        checkHandler: checkHandler
                    }),
                    new Ext.menu.CheckItem({
                        text: 'Another check item',
                        checkHandler: checkHandler
                    }),
                    '-', {
                        text: 'DateMenu as submenu',
                        menu: dateMenu // assign the dateMenu we created above by variable reference,
                    }, {
                        text: 'Submenu with ColorItem',
                        menu: 'colorMenu'    // we assign the submenu containing a ColorItem using it's id
                    }
                ]
            }
        }
    ]);

    function clickHandler(item, e) {
        alert('Clicked on the menu item: ' + item.text);
    }

    function checkHandler(item, e) {
        alert('Checked the item: ' + item.text);
    }

    new Ext.MenuButton('menubutton', {text:'Menu Button 1', menu: dateMenu});
});