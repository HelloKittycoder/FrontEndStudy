/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

Ext.onReady(function(){

    var myData = [
        ['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am'],
        ['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am'],
		['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am'],
		['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am'],
		['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am'],
		['医生当值查询',71.72,0.02,0.03,'9/1 12:00am'],
        ['护士当值查询',29.01,0.42,1.47,'9/1 12:00am'],
        ['医疗药费查询',83.81,0.28,0.34,'9/1 12:00am'],
        ['住院药费查询',52.55,0.01,0.02,'9/1 12:00am'],
        ['心理诊疗查询',64.13,0.31,0.49,'9/1 12:00am'],
        ['化疗收费查询',31.61,-0.48,-1.54,'9/1 12:00am']
    ];

    // example of custom renderer function
    function change(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    // create the data store
    var store = new Ext.data.Store({
        proxy: new Ext.ux.data.PagingMemoryProxy(myData),
        remoteSort:true,
        sortInfo: {field:'company', direction:'ASC'},
        reader: new Ext.data.ArrayReader({
            fields: [
               {name: 'company'},
            ]
        })
    });

    // create the Grid
    var grid = new Ext.grid.GridPanel({
        store: store,
        columns: [
            {id:'company',header: "可应用查询项目", width: 160, sortable: true, dataIndex: 'company'}
           
        ],
        stripeRows: true,
        autoExpandColumn: 'company',
        height:407,
        width:200,
        frame:true,
        //title:'Sliding Pager',

        plugins: new Ext.ux.PanelResizer({
            minHeight: 100
        }),

       bbar: new Ext.PagingToolbar({
          pageSize: 15,
          store: store,
          displayInfo: true,

           plugins: new Ext.ux.ProgressBarPager()
        })
    });

    grid.render('left-tree-grid');

    store.load({params:{start:0, limit:15}});
});