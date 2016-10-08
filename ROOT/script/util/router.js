define(['jquery', 'knockout', 'page', 'http'], function ($, ko, page, http) {


    $.getHtml = function (url, callback) {
        return jQuery.get(url, undefined, callback, "html");
    };
    //page.base('/ecaray');   设置产品线的名称
    /*设置路由信息*/
    page('*', showActiveLink);
    page('/', showHistory);
    page('/extensions', showExtensions);
    page('/settings', showSettings);
    page('*', notfound);
    page();


    /*设置路由相对应的动作*/
    function showActiveLink(ctx, next) {
        deactiveate();
        a(ctx.path).parentNode.classList.add('active');
        next();
    }


    function showHistory(ctx) {

        http.get("/app/views/history.html?_version=").then(function (view) {
            render(view);
            $.getScript("/app/viewmodels/history.js", function () {
                var koNode = document.getElementById('history');
                ko.applyBindings(historyViewModel, koNode);
            })
        });

    }


    function showExtensions(ctx) {

        http.get("/app/views/extensions.html").then(function (view) {
            render(view);
            $.getScript("/app/viewmodels/extensions.js", function () {
                var koNode = document.getElementById('extensions');
                ko.applyBindings(extensionsViewModel, koNode);
            })
        });
    }

    function showSettings(ctx) {
        http.get("/app/views/settings.html").then(function (view) {
            render(view);
            $.getScript("/app/viewmodels/settings.js", function () {
                var koNode = document.getElementById('settings');
                ko.applyBindings(settingsViewModel, koNode);
            })
        });
    }

    function notfound(ctx) {
        render(template('not-found'), !ctx.init);
    }

    function render(html) {
        var el = document.getElementById('content');
        el.innerHTML = html;
    }

    function deactiveate() {
        var el = document.querySelector('.active');
        if (el) el.classList.remove('active');
    }

    function a(href) {
        return document.querySelector('[href=".' + href + '"]');
    }

});


