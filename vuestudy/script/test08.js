var app = new Vue({
    el: '#app',
    data: {
        message: "test",
        message2: "hi",
        checkedNames: ['Jack','John'],
        picked: 'Two'
    },
    methods: {
        submit: function () {
            console.log(this.message);
            var postObj = {
                msg1 : this.message,
                msg2 : this.message2,
                checkval: this.checkedNames
            };
            console.log(postObj);
        }
    }
});
