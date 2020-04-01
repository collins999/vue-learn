Function.prototype.myCall = function(context, ...args) {
    if (null === context || undefined === context) {
        context = window;
    } else {
        // 对于基础引用类型进行一层转换
        context = Object(context);
    }
    let result;
    let symbol = Symbol();
    context[symbol] = this;
    let result = context[symbol](...args)
}

Function.prototype.myApply = function(context, args) {
    if (null === context || undefined === context) {
        context = window;
    } else {
        // 对于基础引用类型进行一层转换
        context = Object(context);
    }
    let result;
    let symbol = Symbol();
    context[symbol] = this;
    if (Array.isArray(args) || isLikeArray(args)) {
        args = Array.from(args);
        result = context[symbol](...args);
    } else {
        result = context[symbol]();
    }
    return result;
}

function isLikeArray(array) {
    if (array && typeof array === 'object' && isFinite(array.length) && array.length < Math(2, 32) - 1) {
        return true;
    } else {
        return false;
    }
}

Function.prototype.myBind = function(objThis, ...args) {
    let thisFn = this;
    let func = function(...params) {
        const isNew = this instanceof func;
        const context = isNew ? this : Object(objThis);
        return thisFn.call(context, ...args, ...params);
    }
    if (thisFn.prototype) {
        func.prototype = Object.create(this.prototype);
    }
    return func;
}