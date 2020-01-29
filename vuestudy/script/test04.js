var app = new Vue({
    el: '#app',
    data: {
        isActive: true,
        hasError: false,
        classObject: {
            active: true,
            'text-dander': false
        }
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        activeClass: 'active',
        errorClass: 'text-danger',
        isActive: true
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        activeColor: 'red',
        fontSize:30,
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        baseStyles: {
            color: 'red',
            fontSize: '30px',
            'text-decoration': 'underline'
        },
        overridingStyles: {
            color: 'maroon',
            fontSize: '20px'
        }
    }
});