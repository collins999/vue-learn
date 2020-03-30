/**
 * 回文数，例如：121 -> true
 */
var num = 12345654321;

function playNum(num) {
    if (num < 0) {
        return false;
    }
    var str = '';
    num = num + '';
    str = num.split().reverse().join();
    return str === num;
}
// console.log(playNum(num));

// 如果不利用字符串怎么操作
function playNum1(num) {
    if (num < 0) {
        return false;
    }
    let s = 0;
    let x = num;
    while (x > 0) {
        s = s * 10 + x % 10;
        x = parseInt(x / 10);
        // console.log(s, x);
    }
    return s == num;
}
// console.log(playNum1(num));

/**
 * 两数之和， nums = [1, 2, 7, 11, 15], target = 9  -> [1, 2];
 */
var nums = [1, 2, 7, 11, 15],
    target = 9;

function getNums(nums, target) {
    for (let i = 0, l = nums.length; i < l; i++) {
        let num = target - nums[i],
            res = nums.indexOf(num);
        console.log(num, res);
        if (res > -1) {
            return [i, res]
        }
    }
}

function getNums1(nums, target) {
    let map = new Map();
    for (let i = 0, l = nums.length; i < l; i++) {
        var key = target - nums[i];
        if (map.has(key)) {
            return [map.get(key), i];
        }
        map.set(nums[i], i);
    }
}
console.log(getNums1(nums, target));