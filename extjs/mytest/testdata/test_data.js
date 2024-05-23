/**
 *
 * 启动：node test_data.js
 * 前端：12 下拉列表联动Combobox_Two.html
 * 13 上传图片File.html
 * 18 树TreePanel.html
 * 20 数据交互AJAX.html
 *
 * 使用node express框架写的
 */
const express = require('express')
const app = express()
const port = 3000

// 允许跨域（https://blog.csdn.net/SupperSA/article/details/134926957）
const cors = require('cors');
const corsOptions = cors({
    origin: '*'
})
app.use(corsOptions)

// 使用body-parser中间件解析表单数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

// 设置multer的存储配置
const multer  = require('multer');

// 主方法
function main() {
    // 返回城市信息
    app.get('/demo/city', (req, res) => {
        res.json({data:[{id:1,name:'北京'},{id:2,name:'上海'}]});
    });

    // 返回区信息
    app.post('/demo/area', (req, res) => {
        // 获取POST表单数据
        const formData = req.body;
        
        // 获取名为“id”的表单字段
        const id = formData.id;

        var data = {};
        if (id === '1') {
            data = {data:[{id:1,name:'东城区'},{id:2,name:'西城区'},{id:2,name:'海淀区'}]};
        } else if (id === '2') {
            data = {data:[{id:1,name:'杨浦区'},{id:2,name:'虹口区'},{id:2,name:'闸北区'}]};
        }
        res.json(data);
    });
    
    // 返回树结构数据
    app.post('/demo/tree', (req, res) => {
        var data = [
            { text: '根下节点一[user图标]', leaf: true, iconCls: 'nodeicon' },
            { text: '根下节点二', leaf: true },
            { text: '根下节点三', leaf: false, children: [
                    { text: '节点三子节点一', leaf: true },
                    { text: '节点三子节点二', leaf: false, expanded: true, children: [
                            { text: '节点三子节点二节点一', leaf: true },
                            { text: '节点三子节点二节点二', leaf: true }
                        ]
                    }
                ]
            }
        ];
        res.json(data);
    });
    
    // 返回ajax响应数据
    app.post('/demo/ajax', (req, res) => {
        var data = {
            id: 1,
            name: '张三',
            brithday: '2001-01-01',
            height: 178,
            sex: '0',
            discribe: '张三是一个.net软件工程师<br />现在正在学习ExtJs。'
        };
        res.json(data);
    });
    
    // 处理上传的图片
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/') // 确保这个文件夹已经存在（可以自己手动建下，不然会报错，后续有空研究下如何让程序自动创建）
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });

    const upload = multer({ storage: storage });
    /**
     * 为单个文件设置上传限制
     * 当客户端向/upload端点发送POST请求并附带名为myFile的文件时，该文件将被保存到uploads文件夹中，
     * 并可通过req.file在服务器端访问到该文件的信息
     */
    const singleUpload = upload.single('imgFile');

    app.post('/demo/upload', singleUpload, (req, res) => {
        const file = req.file; // 获取上传的文件
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        // 文件信息
        console.log(file);
        res.send('File uploaded successfully.');
    });
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main()

