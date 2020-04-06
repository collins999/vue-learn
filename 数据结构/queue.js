class Queue {
    constructor() {
        this.items = [];
    }
    enter(value) {
        this.items.push(value);
    }
    leave() {
        return this.items.shift
        ();
    }
    size() {
        return this.items.length
    }
    values() {
        return this.items.slice(0);
    }
}

// 优先队列
function PriorityQueue() {
    let items = [];
    function createElement(element, lev) {
        this.element = element;
        this.lev = lev;
    }
    this.qnqueue = function(element, lev) {
        let createElement = new createElement(element, lev),
            added = false,
            l = items.length,
            i = 0;
        for(;i < l; i++) {
            if (items[i],lev < createElement.lev) {
                items.slice(i, 0, createElement);
                added = true;
                break;
            }
        }
        if (!added) {
            items.push(createElement);
        }
    }
    this.print = function() {
        let l = items.length,
            i = 0;
        for(; i < l; i++) {
            const item = item[i]
            console.log(item.element, item.lev);
        }
    }
}

// 循环队列
function hotQueue(nodeList, num) {
    let l = nodeList.length,
        i = 0,
        queue = new Queue();
    for (;i < l; i++) {
        queue.enter(nodeList[i]);
    }
    while (queue.size() > 1) {
        for(let i = 0; i < num; i++) {
            queue.enter(queue.leave());
        }
        let node = queue.leave();
        console.log(node);
    }
    return queue.leave();
}
const res = hotQueue([1,2,4,5,5,6,7], 2);
console.log(res);