(function(root) {
    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     */
    function makeMap(
        str,
        expectsLowerCase
    ) {
        var map = Object.create(null);
        var list = str.split(',');
        for (var i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase ?

            function(val) { return map[val.toLowerCase()]; } :
            function(val) { return map[val]; }
    }


    // Regular Expressions for parsing tags and attributes
    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
    var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
    var startTagOpen = new RegExp(("^<" + qnameCapture));
    var startTagClose = /^\s*(\/?)>/;
    var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
    var doctype = /^<!DOCTYPE [^>]+>/i;
    // #7298: escape - to avoid being passed as HTML comment when inlined in page
    var comment = /^<!\--/;
    var conditionalComment = /^<!\[/;

    // Special Elements (can contain anything)
    var isPlainTextElement = makeMap('script,style,textarea', true);

    function parse(template, options) {
        // 1、解析模板，提取信息（只能提取单个），生成初步的AST对象
        // 2、调用钩子函数，生成最终的AST，构建模板和AST对应的关系
        parseHTML(template, {
            start: function() {},
            end: function() {},
            chars: function() {},
            comment: function() {},
        })
    }

    function parseHTML(html, options) {
        var stack = []; // 解析开始标签，判断是否是一个结束标签
        var expectHTML = options.expectHTML;
        var isUnaryTag$$1 = options.isUnaryTag || no;
        var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
        var index = 0;
        var last, lastTag; // last还未编译的字符串
    }
    root.parse = parse;
    return root;
})(this || window);