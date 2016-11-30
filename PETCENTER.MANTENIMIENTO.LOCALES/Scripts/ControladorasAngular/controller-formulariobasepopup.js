(function () {
    angular.module('api')       
		.controller('FormularioBasePopupController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$attrs',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$attrs) {
			   
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
                  	ponerFechas($attrs.id);
                  	PonerFocoInicio($attrs.id);
                  	
                  	$scope.ModoPagina=$attrs.modopagina;
                  	$("input[type=text]").on("keyup",function(e)
                                             {
                                             	var keyespecial = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                                               if(keyespecial==13)
                                               {
                                               		$("img[alt=Buscar]").parent().parent().click();
                                               }
                                             });
                  
                  	
			    });
              
              	$scope.SalirPopup_Click=function()
                {
                	//$("#"+$attrs.id).dialog("close");
                  	$("#"+$attrs.id).modal("hide");
                }
              	var hashPagina = $rootScope.hashPopup;
              	hashPagina=hashPagina.replace("es-PE","");
              	hashPagina=hashPagina.replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_");
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
                	if($rootScope.Formulario.hash==hashPagina&& $rootScope.Formulario.tipo=="popup")
                    {
                    	valido=false;
                    }
                    else
                    {
                      	if($rootScope.OtrosFormularios!=undefined)
                        {
                          for(var x=0;x<$rootScope.OtrosFormularios.length;x++)
                          {
                          	if($rootScope.OtrosFormularios[x].hash==hashPagina && $rootScope.OtrosFormularios[x].tipo=="popup")
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