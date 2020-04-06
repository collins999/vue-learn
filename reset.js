Function.prototype.myCall = function(context, ...arg) {
    if (null === context || undefined === context) {
        context = window;
    } else {
        context = Object(context);
    }
    const sym = Symbol('实例变量');
    context[sym] = this;
    const result = context[sym](...arg);
    delete context[sym];
    return result;
}

const res = Object.prototype.toString.myCall({}, 1, 1, 2);
console.log(res);


Function.prototype.myApply = function(context, arr) {
    if (null === context || undefined === context) {
        context = window;
    } else {
        context = Object(context);
    }
    let result;
    let arg = arguments[1];
    const sym = Symbol('临时变量');
    context[sym] = this;
    // JavaScript权威指南判断是否为类数组对象
    function isArrayLike(o) {
        if (o && // o不是null、undefined等
            typeof o === 'object' && // o是对象
            isFinite(o.length) && // o.length是有限数值
            o.length >= 0 && // o.length为非负值
            o.length === Math.floor(o.length) && // o.length是整数
            o.length < 4294967296) // o.length < 2^32
            return true
        else
            return false
    }
    if (arg) {
        if (Array.isArray(arg) || isArrayLike(arg)) {
            arg = Array.from(arg);
            result = context[sym](...arg);
        } else {
            throw new Error();
        }
    } else {
        result = context[sym]();
    }
    delete context[sym];
    return result;
}
const res1 = Array.prototype.push.myApply([], [2, 3, 5, 4]);
console.log(res1);


Function.prototype.bind = function(objThis, ...params) {
    const thisFn = this;
    let fToBind = function(...secondParams) {
        const isNew = this instanceof fToBind;
        const objThis = isNew ? this : Object(context);
        return thisFn.call(objThis, ...params, ...secondParams);
    }
    if (thisFn.prototype) {
        fToBind.prototype = Object.create(thisFn.prototype);
    }
    return fToBind;
}


// 防抖
function debounce(fn, wait) {
    let timer = null;
    wait = parseInt(wait);
    return function() {
        const self = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        } else {
            timer = setTimeout(() => {
                fn.call(self, ...arg);
                timer = null;
            }, wait)
        }
    }
}

// 节流
function throttle1(fn, wait) {
    let timer = null;
    wait = parseInt(wait);
    return function() {
        const self = this;
        const arg = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(self, ...arg);
                timer = null;
            }, wait);
        }
    }
}

function throttle2(fn, wait) {
    let timer = null;
    let preTime = new Date();
    wait = parseInt(wait);
    return function() {
        const self = this;
        const arg = arguments;
        let nowTime = new Date();
        if (nowTime - preTime > wait) {
            fn.call(self, ...arg);
            preTime = nowTime;
        }
    }
}