(function() {

    angular.module('markdownWiki').config(['$routeProvider', function($routeProvider) {

        $routeProvider.
        when('/edit/:pagename', {
            templateUrl: 'src/view/edit.html',
            controller: 'editController'
        }).
        when('/view/:pagename', {
            templateUrl: 'src/view/page.html',
            controller: 'viewController'
        }).
        when('/list', {
            templateUrl: 'src/view/list.html',
            controller: 'listController'
        }).
        otherwise({redirectTo:'/list'});

    }]);
})();
