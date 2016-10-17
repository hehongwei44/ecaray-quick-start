define(['jquery', 'knockout', 'page'], function ($, ko, page) {

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

        require(["text!view/history.html", "viewModel/history"], function (view, viewModel) {
            render(view);
            viewModel.active();
            viewModel.total_count("");
            ko.applyBindings(viewModel, document.getElementById('history'));
        })

    }


    function showExtensions(ctx) {
        require(["text!view/extensions.html", "viewModel/extensions"], function (view, viewModel) {
            render(view);
            var koNode = document.getElementById('extensions');
            ko.applyBindings(new viewModel(), koNode);
        });
    }

    function showSettings(ctx) {

        require(["text!view/settings.html", 'viewModel/settings'], function (view, viewModel) {
            render(view);
            var koNode = document.getElementById('settings');
            ko.applyBindings(new viewModel(["Alpha", "Beta", "Gamma"]), koNode);
        });
    }

    function notfound(ctx) {
        render(template('not-found'), !ctx.init);
    }

    function render(html) {
        $("#content").empty().html(html)
    }

    function deactiveate() {
        var el = document.querySelector('.active');
        if (el) el.classList.remove('active');
    }

    function a(href) {
        return document.querySelector('[href=".' + href + '"]');
    }

});


