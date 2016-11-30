(function(){
  angular.module('api')
		.directive('ngLoad', ['$parse',function($parse){

          	return {
                  restrict: 'A',
                  compile: function($element, attr) {
                      var fn = $parse(attr['ngLoad']);
      				  
                    return {
                        pre:function(scope, element, attr) {
                          	fn(scope, {$event:event});
                            element.on('load', function(event) {
                                scope.$apply(function() {
                                    fn(scope, {$event:event});
                                });
                            });
                        }
                      };
      
                  }
              };


		}]);

})();