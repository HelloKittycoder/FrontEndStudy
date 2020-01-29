var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello'
    },
    computed: {
        // 计算属性的getter
        reversedMessage: function () {
            // `this`指向app实例
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        reversedMessage2: function () {
            // `this`指向app实例
            return this.message.split('').reverse().join('');
        }
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val;
        }
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName;
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
});

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you answer util you ask a question!'
    },
    watch: {
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.debouncedGetAnswer();
        }
    },
    created: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-';
                return;
            }
            this.answer = 'Thinking...';
            var vm = this;
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer);
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error;
                });
        }
    }
});
