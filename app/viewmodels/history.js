define(['knockout', 'http'], function (ko, http) {


    var viewModel = function () {
        var self = this;

        this.title = "历史记录";
        this.content = ko.observable("Your browsing history will display here.");
        this.total_count = ko.observable("");
        this.active = function () {

            http.get("https://api.github.com/search/repositories?q=javascript&sort=stars").then(function (data) {
                console.log(data.total_count);
                self.total_count(data.total_count);
            });

        }
    };

    return new viewModel();
});