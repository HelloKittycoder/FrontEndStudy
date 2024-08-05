ExtJS实战

### 3.2 ExtJS对事件的支持

#### 3.2.2 注册/移除事件处理程序

3_2_2.html



#### 3.2.5 Ext.util.Observable与自定义事件

3-16|customized_event_demo.html 自定义事件的基本使用

3-17|customized_button_event_demo.html 用户单击按钮时触发自定义事件

3-18|employee_demo.html 类Employee，除了记录员工的基本信息之外，还含有员工事件

### 3.3 实战练习：画布应用

canvas.html 画布应用（TODO：这个暂时先跳过）



lsc补充：

testdata目录 是使用nodejs来模拟后端返回数据的



### 5.1 Ext.Ajax与Ext.data.Connection

5_1_menu.html P169（为了模拟后端返回，这里需要先启动下testdata/test_data.js，运行 node test_data.js即可）



### 5.2 存储对象

#### 5.2.1 Ext.data.Store

5_2_1_data_store.html（P181-P183） data.Store的基本使用

simple_store_demo2.html 传递分页参数

simple_store_demo3.html 存储对象还提供了类似数据库事务的功能

simple_store_demo4.html 存储对象可以进行添加、更新、查找、删除与遍历存储的记录

#### 5.2.2 读取远程数据

test_remote_operations.html 使用ArrayReader和JsonReader读取远程数据

simple_store_demo5.html JsonReader用于读取客户端对象

test_remote_operations2.html 使用ArrayStore和JsonStore读取数据

simple_store_demo6.html ArrayStore和JsonStore用于读取客户端对象

#### 5.3 实战练习：表格组件

query_app.html



## 第6章 Component结构

### 6.1 Component模型

component_lifecycles_demo.html BoxComponent的基本使用（书上提供的写法是错的，自己写的代码中的写法是正确的）

component_applyTo_demo.html renderTo和applyTo的区别（实际用的时候，发现applyTo根本没效果）

boxcomponent_decoration_demo.html BoxComponent用作图片占位符



### 6.2 常用组件

实际开发中“6.2.2 Button按钮”和“6.2.5 DatePicker日期选择面板”用的比较多，其他的了解即可

#### 6.2.1 ColorPalette 调色板

simple_component_demo1.html



#### 6.2.2 Button按钮

simple_component_demo2.html



#### 6.2.3 SplitButton按钮

simple_component_demo3.html（书上提供的例子有问题，根本就用不了，后面有时间再研究下）



#### 6.2.4 BaseItem基础选项

simple_component_demo4.html



#### 6.2.5 DatePicker日期选择面板

simple_component_demo5.html



### 6.3 xtype神秘类型

xtype_usage_demo.html 基本使用



## 第7章 Container结构

### 7.1 Container容器

container_demo.html 基本用法

container_demo2.html 添加默认配置



### 7.2 Panel容器

panel_demo.html

#### 7.2.1 添加子组件/容器

panel_demo2.html

panel_demo3.html 使用其他类型的子组件，指定xtype

panel_demo4.html 使用defaults，设置子组件的默认属性

panel_demo5.html 容器在执行期间加入组件



#### 7.2.2 移动子组件/容器

panel_demo6.html

panel_demo7.html 更改组件的位置

panel_demo8.html 替换元素



#### 7.2.3 查找子组件/容器

panel_demo9.html filterBy

panel_demo10.html find


#### 7.2.4 删除子组件/容器

panel_demo13.html



#### 7.2.5 顶层组件栏(tbar)与底层组件栏(bbar)

panel_demo14.html



#### 7.2.6 可折叠的Panel

panel_demo16.html



#### 7.2.7 嵌套Panel

panel_demo17.html



## 第8章 页面布局

### 8.1 一切都从ContainerLayout开始

container_layout_demo.html



### 8.3 可随意摆放组件的AbsoluteLayout

absolute_layout_demo.html



### 8.4 填满容器的FitLayout

fit_layout_demo.html



### 8.5 如手风琴般的AccordionLayout

accordion_layout_demo.html



### 8.7 表单布局FormLayout

form_layout_demo.html



### 8.8 边界布局BorderLayout

border_layout_demo.html



### 8.10 列布局ColumnLayout

column_layout_demo.html



## 第9章 表单组件

### 9.1 表单容器FormPanel与一般容器Panel的差异

form_panel_intro_demo.html 基本使用

form_panel_intro_demo.html 添加提交url及参数



### 9.2 文本字段

text_field_demo.html



#### 9.2.2 文本上传字段

file_upload_demo.html



#### 9.2.3 文本块

textarea_demo.html



#### 9.2.4 数字字段

number_field_demo.html



#### 9.2.5 字段验证

custom_vtype_demo.html



### 9.3 下拉菜单与自动完成

#### 9.3.1 使用本地数据

combo_box_demo1.html 使用ArrayStore

combo_box_demo2.html 使用JsonStore

combo_box_demo3.html 使用复杂的JsonStore

combo_box_demo4.html 设置triggerAction，valueField



#### 9.3.2 远程数据与下拉菜单

combo_box_demo5.html 读取远程数据

combo_box_demo6.html 带分页参数



### 9.4 WYSIWYG文本编辑器

html_editor_demo.html（lsc注：感觉这个功能有点简单，一般应该不会用到）



### 9.5 日期字段

date_field_demo.html



### 9.6 复选组件与单选组件

check_box_demo.html 复选组件

radio_box_demo.html 单选组件



### 9.7 提交/读取数据

submit_form_demo.html 提交表单参数

read_form_data_demo.html 将服务器的数据读取到表单中



### 9.8 字段提示QuickTips与QuickTip

quick_tips_demo.html



### 9.9 美化表单

#### 9.9.1 使用BoxComponent为表单添加自定义HTML内容

simple_form_layout_demo.html

#### 9.9.2 使用FieldSet集合特定字段

field_set_demo.html



### 9.10 实战练习：登录表单

login_form_test.html

loginForm.js



## 第10章 表格组件

### 10.2 创建GridPanel与数据排序

grid_panel_demo1.html 基本使用

grid_panel_demo2.html 排序

grid_panel_demo3.html 属性配置 tools、collapsible、resizable

grid_panel_demo4.html 远程排序



### 10.3 使用PagingToolbar进行分页

paging_grid_panel_demo1.html 客户端分页

paging_grid_panel_demo4.html 服务端分页



## 第14章 树状组件

### 14.1 使用静态数据创建TreePanel

tree_panel_demo1.html



### 14.2 读取服务器数据

tree_panel_demo2.html



lsc注：“第10章 表格组件”和“第14章 树状组件”只是选择性的学了下，后续如果用的东西比较复杂，再去学习里面的章节；以上其他没有学习的章节，目前开发中用不到，后面等用到了，再去学习





