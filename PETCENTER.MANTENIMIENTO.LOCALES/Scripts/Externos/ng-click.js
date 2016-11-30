(function(){
  angular.module('api')
		.directive('button', ['$parse',function($parse){

          	return {
                  restrict: 'E',
                  link: function(scope, elem, attrs) {
                     if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                        elem.on('click', function(e){
                            e.preventDefault();
                          	e.stopPropagation();
                          return false;
                        });
                    }
      
                  }
              };


		}]).directive('input', ['$parse',function($parse){

          	return {
                  restrict: 'E',
                  link: function(scope, elem, attrs) {
                     if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                        elem.on('click', function(e){
                            e.preventDefault();
                          	e.stopPropagation();
                          return false;
                        });
                    }
      
                  }
              };


		}]);

})();
