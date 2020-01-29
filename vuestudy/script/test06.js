var app = new Vue({
    el: '#app',
    data: {
        parentMessage: 'Parent',
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
});

var app2 = new Vue({
    el: '#app2',
    data: {
        object: {
            title: 'How to do lists in Vue',
            author: 'Jane Doe',
            publishedAt: '2016-04-10'
        }
    }
});