var count = 0;
var fibnacci = i => {
    count++;
    return i < 2 ? i : fibnacci(i - 1) + fibnacci(i - 2);
};

// var memo = function(func, hasher) {
//     var memo = function(key) {
//         var cache = memo.cache;
//         var address = "" + (hasher ? hasher.apply(this, arguments) : key);
//         if (!cache[address]) {
//             cache[address] = func.apply(this.arguments);
//         }
//         return cache[address];
//     };
//     memo.cache = {};
//     return memo;
// }
var memo = function(func, hasher) {
    var memo = function(key) {
        var cache = memo.cache;
        var address = "" + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);
        }
        return cache[address];
    };
    memo.cache = {};
    return memo;
}
fibnacci = memo(fibnacci);
for (var i = 0; i < 10; i++) {
    fibnacci(i);
}
console.log(count);