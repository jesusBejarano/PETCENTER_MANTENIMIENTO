(function(){
	angular.module('api')
		.factory('Helpers', [
			function HelpersFactory(){
					return{						
						Alert:function(msg){
							MiAlert(msg);
						},
						Confirm:function(msg){
							return MiConfirm(msg);
						},
                        GenerarId:function(listaObjeto, NameIdObjeto)
                        {
                        	var objMinId = $from(listaObjeto).min("parseInt($"+NameIdObjeto+")");
                            var	nuevoId=-1;
                            if(objMinId!=undefined)
                              nuevoId=objMinId[NameIdObjeto]-1;
                      		return nuevoId;
                        },
                        GenerarContador:function(listaObjeto, NameIdObjeto)
                        {
                        	var objMinId = $from(listaObjeto).max("parseInt($"+NameIdObjeto+")");
                            var	nuevoId=0;
                            if(objMinId!=undefined)
                              nuevoId=objMinId[NameIdObjeto]+1;
                      		return nuevoId;
                        },
					}
			}
		]);

})();

