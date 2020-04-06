class Stack {
    constructor() {
        this.items = [];
    }
    enter(value) {
        this.items.push(value);
    }
    leave() {
        return this.items.pop();
    }
    size() {
        return this.items.length
    }
    values() {
        return this.items.slice(0);
    }
}
// 十进制转换为2进制
Number.prototype.decimal2binary = function decimal2binary() {
    let stack = new Stack();
    decimalNum = this.valueOf();
    if (decimalNum === 0) {
        return '0';
    }
    while(decimalNum > 0) {
        stack.enter(decimalNum % 2);
        decimalNum = Math.floor(decimalNum / 2);
    }
    return stack.values().reverse().join('');
}
// 十进制转换为任意进制
Number.prototype.baseConverter = function baseConverter(base = 2) {
    let stack = new Stack(),
        decimalNum = this.valueOf(),
        baseStr = '',
        digits = '0123456789ABCDEF';
    while(decimalNum > 0) {
        stack.enter(decimalNum % base);
        decimalNum = Math.floor(decimalNum / base);
    }
    while(stack.size()) {
        baseStr += digits[stack.leave()];
    }
    return baseStr.split('').reverse().join('');
}


console.log((12131).baseConverter(16));
// console.log((10).toString(2));