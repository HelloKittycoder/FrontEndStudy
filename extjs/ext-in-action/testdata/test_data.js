const http = require('http');
const{parse} = require('url');

// 创建一个日期格式化器
const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

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

        // 请求地址
        const  pathName = urlObj.pathname;
        // 当前时间
        const formattedDate = dateFormatter.format(new Date()).replace(/(\/)/g, '-');
        console.log(`[${formattedDate}]请求地址：${pathName}，method：${method}`);
        if (pathName === '/demo/menuList') {
            // 返回菜单信息（2秒后进行响应）
            setTimeout(function () {
                resonseApplicationJson(res, {menuItems:["目录浏览", "书签管理", "事件管理"]})
            }, 2000);
        } else if (pathName === '/users/testJsonRecords') {
            resonseApplicationJson(res, userList)
        } else if (pathName === '/users/combo_test') {
            resonseApplicationJson(res, userList);
        } else if (method === 'POST' && pathName === '/users/combo_page_test') {
            let userList = [
                {"id": 1, "name": "Aitch", "age": 28},
                {"id": 2, "name": "Mary", "age": 27},
                {"id": 3, "name": "David", "age": 26},
                {"id": 4, "name": "John", "age": 25},
                {"id": 5, "name": "Joe", "age": 24},
                {"id": 6, "name": "Chris", "age": 23},
                {"id": 7, "name": "Johncy", "age": 22},
                {"id": 8, "name": "Hellen", "age": 21},
            ];
            
            let postParams = '';
            req.on('data', chunk => {
                // 获取post传来的Form Data数据
                postParams+=chunk;
            });

            req.on('end', () => {
                // console.log(postParams);
                
                var paramArray = postParams.split('&');
                var queryParam = paramArray[0].split('=')[1];
                // 查询条件
                var data = userList.filter(user => user.name.toLowerCase().indexOf(queryParam.toLowerCase()) > -1);
                
                // 处理分页
                var start = paramArray[1].split('=')[1];
                var limit = paramArray[2].split('=')[1];
                var end = Math.min(start + limit, data.length);
                var result =  {
                    count: data.length,
                    employees: data.slice(start, end)
                }
                resonseApplicationJson(res, result);
            });
        } else if (pathName === '/users/receiver') {
            // 返回响应信息（2秒后进行响应）
            setTimeout(function () {
                resonseApplicationJson(res, {success:true, msg:"访问成功"});
            }, 2000);
        } else if (pathName === '/users/load_form_data_test') {
            // 测试加载表单数据
            resonseApplicationJson(res, [
                {username:'Aitch', email:'aitch@mail.com'}
            ]);
        } else if (pathName === '/users/remote_sort_test') {
            let userList = [
                {id:1, name:'aitch', info:'Funny man', created:'2011/02/28'},
                {id:2, name:'david', info:'Canon man', created:'2011/02/25'},
                {id:3, name:'john', info:'Decent man', created:'2011/02/20'},
                {id:4, name:'halen', info:'Test man', created:'2011/02/24'},
            ];
            
            // 测试服务端排序
            let postParams = '';
            req.on('data', chunk => {
                // 获取post传来的Form Data数据
                postParams+=chunk;
            });

            req.on('end', () => {
                console.log(postParams);

                if (postParams === '') {
                    // 无需排序
                    resonseApplicationJson(res, userList);
                } else {
                    // 需要排序
                    var paramArray = postParams.split('&');
                    var sort = paramArray[0].split('=')[1];
                    var dir = paramArray[1].split('=')[1];
                    
                    var userListCopy = userList.slice();
                    userListCopy.sort((u1, u2) => {
                        if (dir === 'ASC') {
                            return u1[sort].localeCompare(u2[sort]);
                        } else {
                            return u2[sort].localeCompare(u1[sort]);
                        }
                    });
                    resonseApplicationJson(res, userListCopy);
                }
            });
        } else if (method === 'POST' && pathName === '/users/remote_paging_test') {
            // 测试GridPanel 服务端分页
            let songList = [{"id":1,"artist":"id-101","title":"title-101","rate":1},
                {"id":2,"artist":"id-102","title":"title-102","rate":2},
                {"id":3,"artist":"id-103","title":"title-103","rate":3},
                {"id":4,"artist":"id-104","title":"title-104","rate":4},
                {"id":5,"artist":"id-105","title":"title-105","rate":5},
                {"id":6,"artist":"id-106","title":"title-106","rate":6},
                {"id":7,"artist":"id-107","title":"title-107","rate":7},
                {"id":8,"artist":"id-108","title":"title-108","rate":8},
                {"id":9,"artist":"id-109","title":"title-109","rate":9}];

            let postParams = '';
            req.on('data', chunk => {
                // 获取post传来的Form Data数据
                postParams+=chunk;
            });

            req.on('end', () => {
                // console.log(postParams);

                var paramArray = postParams.split('&');
                // 查询条件
                var data = songList;

                // 处理分页
                var start = paramArray[0].split('=')[1];
                var limit = paramArray[1].split('=')[1];
                var end = Math.min(start + limit, data.length);
                var result =  {
                    count: data.length,
                    songs: data.slice(start, end)
                }
                resonseApplicationJson(res, result);
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
