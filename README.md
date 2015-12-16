# localStorageTpl
A jQuery plugin, use the Promise method to get the template file based on name and url parameters.
Storage template code to localStorage and memory to be prevent repeat request.

英语超级烂，有木有？有写错的地方望指点。
根据name和url参数、使用Promise方法获取模板文件的一个jQuery插件。
## Usage

### Config
```javascript
(function($) {
    $.lsTpl.init({
        index: '/tpl/index.tpl',
        login: '/tpl/login.tpl'
    });
})(jQuery);
```

### Get Template
```javascript
(function($) {
    $.when($.lsTpl.load('index'))
    .then(function(tpl) {
        console.log(tpl);
    }, function(error) {
        console.log(error);
    });

    $.when($.lsTpl.load('login'))
    .then(function(tpl) {
        console.log(tpl);
    }, function(error) {
        console.log(error);
    });
})(jQuery);
```

### DEMO
http://mlinquan.github.io/localStorageTpl/