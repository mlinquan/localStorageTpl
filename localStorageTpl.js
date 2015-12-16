/**
 * localStorageJS
 * https://github.com/mlinquan/localStorageTpl
 *
 * @version
 * 0.0.1
 *
 * @copyright
 * Copyright (C) 2015 LinQuan.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery"], factory );
    } else {
        factory( jQuery );
    }
}(function($) {
    $.lsTpl = {
        tpl: {},
        list: {},
        pending: {},
        init: function(tplObj) {
            for(var name in tplObj) {
                $.lsTpl.tpl[name] = tplObj[name];
            }
        },
        load: function(name) {
            var support = !!window.localStorage,
            deferred = $.Deferred(),
            tpl,
            url;

            if($.lsTpl.tpl[name]) {
                url = $.lsTpl.tpl[name];
            }

            if(!name || !url) {
                deferred.reject();
            }

            name = 'lsT_' + name;

            if($.lsTpl.list[name]) {
                tpl = $.lsTpl.list[name];
            }

            if(!tpl && support && localStorage.getItem(name)) {
                var tpl_tmp;
                try {
                    tpl_tmp = JSON.parse(localStorage.getItem(name));
                    if(url == tpl_tmp.url) {
                        tpl = tpl_tmp.source;
                        $.lsTpl.list[name] = tpl;
                    }
                } catch(e) {

                }
            }

            if(tpl) {
                deferred.resolve(tpl);
            }

            if(!tpl && $.lsTpl.pending[name]) {
                $.lsTpl.pending[name].push(deferred);
            }

            if(!tpl && !$.lsTpl.pending[name]) {
                $.lsTpl.pending[name] = [];
                $.lsTpl.pending[name].push(deferred);
                $.ajax({
                    url: url,
                    dataType: 'html',
                    success: function(html) {
                        if(html) {
                            tpl = html;
                            if(support) {
                                var data_tmp = {
                                    url: url,
                                    source: tpl
                                };
                                localStorage.setItem(name, JSON.stringify(data_tmp));
                            }
                            $.lsTpl.list[name] = tpl;
                            for(var i=0;i<$.lsTpl.pending[name].length;i++) {
                                $.lsTpl.pending[name][i].resolve(tpl);
                            }
                            delete $.lsTpl.pending[name];
                        }
                    },
                    error: function() {
                        for(var i=0;i<$.lsTpl.pending[name].length;i++) {
                            $.lsTpl.pending[name][i].reject();
                        }
                    }
                });
            }
            return deferred.promise();
        }
    };

    $.localStorageTpl = $.lsTpl;
}));