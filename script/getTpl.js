(function($) {
    $.when($.localStorageTpl.apply(this, $.tpl_list.index))
    .then(function(tpl) {
        console.log(tpl);
    }, function(error) {
        console.log(error);
    });

    $.when($.localStorageTpl.apply(this, $.tpl_list.login))
    .then(function(tpl) {
        console.log(tpl);
    }, function(error) {
        console.log(error);
    });
})(jQuery);