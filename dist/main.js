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
(function() {

    angular.module('markdownWiki')
        .controller('markedownController', ['$scope', function($scope) {



        }]);

    angular.module('markdownWiki')
        .controller('listController', ['$scope', function($scope) {


        }]);

    angular.module('markdownWiki')
        .controller('viewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

            $scope.init = function() {
                if (angular.isDefined($routeParams.pagename)) {

                    $scope.pagename = $routeParams.pagename;
                    $http.get('http://localhost:3000/wiki/'+$scope.pagename).then(function(response) {
                        $scope.pagecontent = marked(response.data[response.data.length-1].data);
                        $scope.tags = response.data[response.data.length-1].tags;

                    });
                }
            }

        }]);
    angular.module('markdownWiki')
        .controller('editController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

            $scope.view = { show_preview: false };


            $scope.init = function() {
                if (angular.isDefined($routeParams.pagename)) {

                    $scope.pagename = $routeParams.pagename;
                    $http.get('http://localhost:3000/wiki/'+$scope.pagename).then(function(response) {
                        $scope.pageeditcontent = response.data[response.data.length-1].data;
                        $scope.tags = response.data[response.data.length-1].tags;
                    });
                }
            }

            $scope.savePage = function(){
                $http.post('http://localhost:3000/wiki/'+$scope.pagename,{name:$scope.pagename,data:$scope.pageeditcontent,tags:$scope.tags}).then(function(response){
                    
                });
            }


            $scope.codemirrorLoaded = function(_editor) {

                var _doc = _editor.getDoc();
                _editor.focus();

                _editor.setOption('firstLineNumber', 1);
                _doc.markClean()

                _editor.on("beforeChange", function() {

                });
                _editor.on("change", function() {
                    
                    $scope.outputText = marked(_doc.getValue());
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                });
            };

        }]);
})();

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

(function(){
	angular.module("markdownWiki").directive("wkClass", function(){
		function link(scope,elm,attrs){
			var classes = attrs.wkClass.split('-');

			if(classes[0] == 'all'){
				angular.element(elm).addClass('col-xs-'+classes[1]);
				angular.element(elm).addClass('col-sm-'+classes[1]);
				angular.element(elm).addClass('col-md-'+classes[1]);
				angular.element(elm).addClass('col-lg-'+classes[1]);			
			}
			else{
				angular.element(elm).addClass('col-xs-'+classes[0]);
				angular.element(elm).addClass('col-sm-'+classes[1]);
				angular.element(elm).addClass('col-md-'+classes[2]);
				angular.element(elm).addClass('col-lg-'+classes[3]);			
			}
		}
		return {
			restrict: "A",
			link : link
		}
	});

	angular.module("markdownWiki").directive("wkOffset", function(){
		function link(scope,elm,attrs){
			var classes = attrs.wkOffset.split('-');

			if(classes[0] == 'all'){
				angular.element(elm).addClass('col-xs-offset-'+classes[1]);
				angular.element(elm).addClass('col-sm-offset-'+classes[1]);
				angular.element(elm).addClass('col-md-offset-'+classes[1]);
				angular.element(elm).addClass('col-lg-offset-'+classes[1]);			
			}
			else{
				angular.element(elm).addClass('col-xs-offset-'+classes[0]);
				angular.element(elm).addClass('col-sm-offset-'+classes[1]);
				angular.element(elm).addClass('col-md-offset-'+classes[2]);
				angular.element(elm).addClass('col-lg-offset-'+classes[3]);				
			}
		}
		return {
			restrict: "A",
			link : link
		}
	});
})();

(function(){


/**
 * @ngdoc directive
 * @name a
 
 * @function
 *
 * @description
 * This directive will create a link replacing href attributes with javascript:void() function to prevent page/url redirection.
 *
 * **Note:** ie<9 needs polyfill for window.getComputedStyle
 *
 * @example
   <example module="rfx">
     <file name="index.html">
            <a href="/activation">
            </a>
     </file>
   </example>
 */

angular.module("markdownWiki").directive("a", function(){
	return {
		restrict: "E",
        link : function(scope,elm,attrs){

        	if (!angular.isDefined(attrs.href)){
                /* jshint ignore:start */
        		angular.element(elm).attr("href","javascript:void(0);");
                /* jshint ignore:end */
        	}
		}
	}
});
})();
