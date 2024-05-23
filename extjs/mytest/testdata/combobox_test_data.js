/**
 * 
 * 启动：node combobox_test_data.js
 * 前端：12 下拉列表联动Combobox_Two.html
 * 
 * 使用node自带api写的
 * 
 * 参考链接：https://blog.csdn.net/baichaji/article/details/129419952
 */
const http = require('http');
const{parse} = require('url');

/**
 * 给前端返回 application/json 响应头的数据
 */
function resonseApplicationJson(res, objData) {
    // 解决前端跨域问题
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    // 返回json数据
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(objData));
}

// 主方法
function main() {
    const server = http.createServer((req, res) => {
        const {url, method} = req;
        const urlObj = parse(url, true); // 解析url

        // 下拉框联动测试数据
        // 请求地址
        const  pathName = urlObj.pathname;
        if (method === 'GET' && pathName === '/demo/city') {
            // 返回城市信息
            resonseApplicationJson(res, {data:[{id:1,name:'北京'},{id:2,name:'上海'}]});
        } else if (method === 'POST' && pathName === '/demo/area') {
            let postParams = '';
            req.on('data', chunk => {
                // 获取post传来的Form Data数据
                postParams+=chunk;
            });
            req.on('end', () => {
                // console.log(postParams);
                // 返回区信息
                var data = {};
                var idPart = postParams.split('&')[0]; // 获取id参数（这种写法有空可以用正则改进下）
                if (idPart === 'id=1') {
                    data = {data:[{id:1,name:'东城区'},{id:2,name:'西城区'},{id:2,name:'海淀区'}]};
                } else if (idPart === 'id=2') {
                    data = {data:[{id:1,name:'杨浦区'},{id:2,name:'虹口区'},{id:2,name:'闸北区'}]};
                }
                resonseApplicationJson(res, data);
            });
        } else {
            // 其他情况，返回空数据
            resonseApplicationJson(res, {});
        }
    });

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
