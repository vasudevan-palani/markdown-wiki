(function() {
    angular.module('markdownWiki', ['ngRoute','ui.codemirror', 'ngSanitize']);

    var renderer = new marked.Renderer();
    renderer.code = function(code, language) {
        return '<pre class="my-wiki"><code class="hljs ' + language + '">' +
            hljs.highlight(language, code).value +
            '</code></pre>';
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    (function() {

    //Configure the http provider to support CORS
    //
    angular.module('markdownWiki').config(['$httpProvider','$locationProvider',
        function($httpProvider,$locationProvider) {
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        }
    ]);
})();

})();