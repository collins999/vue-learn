function _new(Func, ...args) {
    let obj = {};
    obj.__proto__ = Func.prototype;
    // let obj = Object.create(Func.prototype);
    let result = Func.call(obj, ...args);
    if ((result !== null && typeof result === 'object') || (typeof result === 'function')) {
        return result;
    }
    return obj;
}