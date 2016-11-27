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
