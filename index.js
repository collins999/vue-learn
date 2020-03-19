function VueS() {
    this.$data = { name: 'stone' };
    this.el = document.getElementById('app');
    this.virtualdom = '';
    this.observer(this.$data);
    this.rander();
}
VueS.prototype.observer = function(obj) {
    var value,
        self = this;
    // this.$data = new Proxy(this.$data, {
    //         get: function(target, key) {
    //             return target[key];
    //         },
    //         set: function(target, key, value) {
    //             Reflect.set(target, key, value);
    //             self.rander();
    //         }
    //     })
    for (var key in obj) {
        value = obj[key];
        if (typeof value === 'object') {
            this.observer(value);
        } else {
            Object.defineProperty(obj, key, {
                get: function() {
                    // 依赖收集
                    return value;
                },
                set: function(newValue) {
                    // 触发视图更新
                    value = newValue;
                    self.rander();
                    return newValue;
                }
            })
        }
    }
}
VueS.prototype.rander = function() {
    this.virtualdom = 'this is ' + this.$data.name;
    this.el.innerHTML = this.virtualdom;
}

function instance_of(L, R) { //L 表示左表达式，R 表示右表达式
    var O = R.prototype;
    L = L.__proto__;
    while (true) {
        if (L === null)
            return false;
        if (O === L) // 这里重点：当 O 严格等于 L 时，返回 true
            return true;
        L = L.__proto__;
    }
}