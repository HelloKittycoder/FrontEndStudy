var app = new Vue({
    el: '#app',
    data: {
        msg: "test"
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        rawHtml: '<span style="color: red;">This should be red.</span>'
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        dynamicId: 'test',
        isButtonDisabled: "disabled"
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        number: 5,
        ok: true,
        message:"zhangsan"
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        url:"https://www.baidu.com",
    },
    methods: {
        dosth: function () {
            console.log("你点击了a标签");
        }
    }
});