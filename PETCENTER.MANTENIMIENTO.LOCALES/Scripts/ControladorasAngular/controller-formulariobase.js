(function () {
    angular.module('api')       
		.controller('FormularioBaseController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector) {
			   
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
                    ponerFechas();
                  	PonerFocoInicio();
                  	$("input[type=text]").on("keyup",function(e)
                                             {
                                             	var keyespecial = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                                               if(keyespecial==13)
                                               {
                                               		$("img[alt=Buscar]").parent().parent().click();
                                               }
                                             });
			    });
                var indiceParam = window.location.hash.replace("#!","").replace('-','_').replace('-','_').replace('-','_').replace('-','_').replace('-','_').indexOf("?");
                if(indiceParam != -1)
                {
              	var hashPagina = window.location.hash.replace("#!","").replace('-','_').replace('-','_').replace('-','_').replace('-','_').replace('-','_').substring(indiceParam,0);
               }
               else{
                var hashPagina = window.location.hash.replace("#!","").replace('-','_').replace('-','_').replace('-','_').replace('-','_').replace('-','_');
               }
              	if(hashPagina.length>0)
                {
                  if(hashPagina[hashPagina.length-1]=='/')
                  {
              		hashPagina=hashPagina.substr(0,hashPagina.length-1);
                  }
                }
              	var valido=true;
              	if($rootScope.Formulario!=undefined)
                {
                	if($rootScope.Formulario.hash==hashPagina&& $rootScope.Formulario.tipo=="pagina")
                    {
                    	valido=false;
                    }
                    else
                    {
                      	if($rootScope.OtrosFormularios!=undefined)
                        {
                          for(var x=0;x<$rootScope.OtrosFormularios.length;x++)
                          {
                          	if($rootScope.OtrosFormularios[x].hash==hashPagina && $rootScope.OtrosFormularios[x].tipo=="pagina")
                            {
                                valido=false;
                              	break;
                            }
                          }
                        }
                    }
                }
              
              	if(valido==true)
                {
                
            	  }
              
              
              	
			}]);


})();