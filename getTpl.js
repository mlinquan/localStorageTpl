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