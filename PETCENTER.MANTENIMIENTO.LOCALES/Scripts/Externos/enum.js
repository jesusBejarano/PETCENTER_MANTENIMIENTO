(function(){
	angular.module('api')
		.factory('Enum', [function EnumFactory(){
			return{
				LOADING:false,
				READY:true,
			}

		}]);

})();

