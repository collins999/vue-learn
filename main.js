function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: !!enumerable
    })
}
/**
 * Observer通过递归的方式让对象的所有属性都是可观测的
 */
class Observer {
    constructor(value) {
        this.value = value;
        // 设置__ob__表示这个数据已经是响应式了，不需要重复的操作
        // 它的值是Observer的实例
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            // 走数组的逻辑
        } else {
            this.walk(value);
        }
    }
    walk(obj) {
        // 遍历对象的key，调用绑定函数
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, key[i]);
        }
    }
}
/**
 * 
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive(obj, key, value) {
    if (arguments.length === 2) {
        value = obj[key];
    }
    if (typeof value === 'object' && !value) {
        new Observer(value);
    }
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend();
            return value;
        },
        set(newValue) {
            if (value === newValue) {
                return;
            }
            dep.notify();
            value = newValue;
        }
    });
}
/**
 * 依赖收集类
 */
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(value) {
        this.subs.push(value);
    }
    removeSub(value) {
        // 删除依赖
        remove(this.subs, value);
    }
    depend() {
        // 新增依赖
        if (window.target) {
            this.addSub(window.target);
        }
    }
    notify() {
        let array = this.subs.slice();
        for (let i, l = array.length; i < l; i++) {
            array[i].update()
        }
    }
}
/**
 * 删除一个依赖
 * @param {*} array 
 * @param {*} item 
 */
function remove(array, item) {
    if (array.length) {
        let index = array.indexof(item);
        if (index > -1) {
            return array.splice(index, 1);
        }
    }
}

// 数组的变化侦测

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const methdosToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'slice',
    'reverse'
];
methdosToPatch.forEach((method) => {
    // 缓存原生的数组方法
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function mutator(...arg) {
            const result = original.call(this, arg);
            return result;
        }
    })
});