class HistoryRoute {
    constructor() {
        this.current = null;
    }
}
class VueRouter {
    constructor(options) {
        this.mode = this.options.mode || 'hash';
        this.history = new HistoryRoute();
        this.routerMap = this.createRouterMap(options.routers);
        this.init();
    }
    init() {
        if ('hash' === this.mode) {
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1);
            });
        } else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', () => {
                this.history.current = location.pathname;
            });
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname;
            });
        }
    }
    createRouterMap(routers) {
        return routers.reduce((previousVlaue, currentValue) => {
            previousVlaue[currentValue.path] = currentValue.component;
        }, {});
    }
}
VueRouter.install = function(Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.options.router) {
                this._root = this;
                this._router = this.options.router;
                Vue.util.defineReactive(this, 'current', this._router.history);
            } else {
                this._router = this.$parent._root;
            }
            Object.defineProperty(this, '$route', {
                get() {
                    return this._root._router;
                }
            });
        },
    });
    Vue.component('router-view', {
        render(h) {
            // 如何更加当前的current，获取对于的组件
            const current = this._root._router.history.current;
            const routerMap = this._root._router.routerMap;
            return h(routerMap[current]);
        }
    });
}
export default VueRouter;