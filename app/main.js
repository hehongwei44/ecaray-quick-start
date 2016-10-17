requirejs.config({

    paths: {
        'jquery': '../script/lib/jquery/jquery-1.12.4',
        'knockout': '../script/lib/knockout/knockout-3.4.0.debug',
        'page': '../script/lib/router/page',
        'router': '../script/util/router',
        'http': '../script/util/http',
        'text':"../script/lib/requirejs/text",
        'viewModel': "./viewmodels",
        "view":"./views"
    }
});

require(['router'], function () {
    console.log("APP Start");
});