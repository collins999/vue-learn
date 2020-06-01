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


async function async1() {
    console.log('1');
    console.log(await async2());
    console.log('2');
}
async function async2() {
    console.log('3');
    return '0';
}
setTimeout(function() {
    console.log('4');
    new Promise(function(resolve) {
        console.log('5');
        resolve();
    }).then(function() { console.log('6') })
});
async1();
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() { console.log('8'); });
console.log('9');

Promise.resolve(3).then(() => {
    console.log('a');
    throw new Error('b');
}).then(() => {
    console.log('c');
}, (err) => {
    console.log(err.message);
    return 'd';
}).then((d) => console.log('d'), (e) => { console.log('e') })