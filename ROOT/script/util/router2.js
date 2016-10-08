define(['jquery', 'knockout', 'page', 'http'], function ($, ko, page, http) {

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

    var historyViewModel = {
        title: "History",
        content: "Your browsing history will display here."
    };



    function showHistory(ctx) {

        // !ctx.init tells render() not to
        // add the .hide class so that the
        // transition animation is ignored
        // for the initial page
        /*http.get("/app/views/history.html").then(function (view) {
            render(view, !ctx.init);
            var koNode = document.getElementById('history');
            ko.applyBindings(historyViewModel, koNode);
        });*/

        render(template('history'), !ctx.init);
        var koNode = document.getElementById('content');
        ko.cleanNode(koNode);
        ko.applyBindings(historyViewModel,koNode);
    }



    function showExtensions(ctx) {
        render(template('extensions'), !ctx.init);
    }

    function showSettings(ctx) {
        render(template('settings'), !ctx.init);
    }

    function notfound(ctx) {
        render(template('not-found'), !ctx.init);
    }

    function render(html, hide) {
        var el = document.getElementById('content');
        if (hide) {
            el.classList.add('hide');
            setTimeout(function () {
                el.innerHTML = html;
                el.classList.remove('hide');
            }, 300);
        } else {
            el.innerHTML = html;
        }
    }

    function deactiveate() {
        var el = document.querySelector('.active');
        if (el) el.classList.remove('active');
    }

    function a(href) {
        return document.querySelector('[href=".' + href + '"]');
    }

    function template(name) {
        return document
            .getElementById(name + '-template')
            .innerHTML;
    }

});


