$.lsTplList = {};
$.lsTplPending = {};

$.localStorageTpl = $.lsTpl = function(name, url) {
    var _this = this;
    var deferred = $.Deferred();
    var tpl;
    if(!name || !url) {
        deferred.reject();
    }
    name = 'lsT_' + name;
    if($.lsTplList[name]) {
        tpl = $.lsTplList[name];
    }
    if(!tpl && _this.support && localStorage.getItem(name)) {
        var tpl_tmp;
        try {
            tpl_tmp = JSON.parse(localStorage.getItem(name));
            if(url == tpl_tmp.url) {
                tpl = tpl_tmp.source;
                $.lsTplList[name] = tpl;
            }
        } catch(e) {

        }
    }

    if(tpl) {
        deferred.resolve(tpl);
    }

    if(!tpl && $.lsTplPending[name]) {
        $.lsTplPending[name].push(deferred);
    }

    if(!tpl && !$.lsTplPending[name]) {
        $.lsTplPending[name] = [];
        $.lsTplPending[name].push(deferred);
        $.ajax({
            url: url,
            dataType: 'html',
            success: function(html) {
                if(html) {
                    tpl = html;
                    if(_this.support) {
                        var data_tmp = {
                            url: url,
                            source: tpl
                        };
                        localStorage.setItem(name, JSON.stringify(data_tmp));
                    }
                    $.lsTplList[name] = tpl;
                    for(var i=0;i<$.lsTplPending[name].length;i++) {
                        $.lsTplPending[name][i].resolve(tpl);
                    }
                    delete $.lsTplPending[name];
                }
            },
            error: function() {
                for(var i=0;i<$.lsTplPending[name].length;i++) {
                    $.lsTplPending[name][i].reject();
                }
            }
        });
    }
    return deferred.promise();
};

$.lsTpl.prototype.support = !!window.localStorage;