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
