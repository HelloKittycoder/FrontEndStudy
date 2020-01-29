var app = new Vue({
    el: '#app',
    data: {
        counter:0
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        name: 'vue'
    },
    methods: {
        greet: function (event) {
            // `this`在方法里指向当前Vue实例
            alert('Hello ' + this.name + '!');
            // `event`是原生DOM事件
            if (event) {
                console.log(event);
            }
        },
        say: function (message) {
            alert(message);
        },
        warn: function (message, event) {
            // 现在可以访问用原生事件对象
            if (event) {
                event.preventDefault();
            }
            alert(message);
        }
    }
});
