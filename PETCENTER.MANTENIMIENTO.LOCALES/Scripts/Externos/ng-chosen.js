(function(){
  angular.module('api')
		.directive('chosen', ['$window','$timeout','$compile','$http', function($window,$timeout,$compile,$http){

          	 return {
                      restrict: 'A',
                      replace: true,
                      scope: {
                          	config: '=',
                          	modeldata: '=',
                        	valuemember: '=',
                          	insert: '=?',
                      },
                      link: function (scope, element, attrs) {
                        
                        if(attrs.chosenurl==undefined || attrs.chosenurl==null)
                          return;
                        
                        
                        
                        scope.modeldata=[];
                        
                        scope.modeldata=function()
                        {
                        };
                        
                        scope.getUrl=function(url, valuemember, valorvaluemember)
                        {
                        	url=url.replace("|%usuario|","grupocogesa\\arojasmu");
                        
                            var partesurl=url.split('|')
                            var i=0;
                            var arrayDatos=new Array();
                            for(i=0;i<partesurl.length;i++)
                            {
                              	//obtener datos del root
                                var p1=partesurl[i];
                              	
                                if(p1.split('$').length>1)
                                {
                                  	p1=p1.replace("$","");
                               		arrayDatos.push(p1);
                                  
                                  	//verificando si es la constante
                              		if("$root.item."+p1 == valuemember)
                                    {
                                    	url=url.replace("|$"+p1+"|",valorvaluemember);
                                    }
                                  
                                  
                                    var val="";
                                    
                                    if(scope.$root.item!=null)
                                    {
                                      try
                                      {
                                        val=scope.$root.item[p1];                                    
                                      }catch(everything)
                                      {}
                                    }
                                    
                                    if(val==undefined||val==null)
                                      val="";
                                  
                                    url=url.replace("|$"+p1+"|",val);    
                                  	
                                }
                            }
                            var rspt= new Array();
                            rspt.url=url;
                            rspt.arrayDatos=arrayDatos;
                          	return rspt;
                        
                        }
                        
                        
                        
                        
                        var datosurl= scope.getUrl(attrs.chosenurl,attrs.valuemember);  
                        
                        var esautobusqueda=false;
                        for(i=0;i<datosurl.arrayDatos.length;i++)
                        {
                          var val1 = "$root.item."+datosurl.arrayDatos[i];
                          if(val1==attrs.valuemember)
                          {
                            esautobusqueda=true;
                          }
                        }
                        //scope.$watch(scope.$root.item, function (value) 
                        //{
                          
                          $timeout(function() {
                       
                                //si un argumento de entrada es el mismo campo que depende para el filtro entonces se habilitará busqueda sensitive.
                                
                                if(esautobusqueda==false)
                                {
                                    for(i=0;i<datosurl.arrayDatos.length;i++)
                                    {
                                        var dato="$root.item."+datosurl.arrayDatos[i];
                                        scope.$watch(dato,
                                                  function(newValue, oldValue) {
                                                        if(newValue!==oldValue)
                                                        {
                                                            var datosurl=scope.getUrl(attrs.chosenurl);
                                                            try
                                                            {
                                                              $http.get(datosurl.url).then(function(result){
                                                                scope.modeldata=result.data;
                                                                
                                                                var existemd=false;
                                                                for(i=0;i<result.data.length;i++)
                                                                {
                                                                  if(result.data[i]==scope.valuemember)
                                                                  {
                                                                  existemd=true;
                                                                    break;
                                                                  }
                                                                }
                                                                if(existemd==false)
                                                                {
                                                                    scope.valuemember="";
                                                                }
                                                              });
                                                            }
                                                            catch(everything)
                                                            {
                                                            }
                                                        }
                                                        
                                                  },true
                                                 );
                                    }
                                  
                                    try
                                    {
                                      if(!(scope.valuemember==null || scope.valuemember==undefined|| scope.valuemember==''))
                                      {
                                        $http.get(datosurl.url).then(function(result){
                                              if(scope.valuemember==null || scope.valuemember==undefined|| scope.valuemember=='')
                                                      return;
                                              scope.modeldata=result.data;
                                          });
                                      }
                                    }
                                    catch(everything)
                                    {
                                    }
                                    
                                }
                                
                                var chosendatamodel=attrs.modeldata;
                                  scope.$watch(chosendatamodel, function (value) 
                                  {
                                    
                                    $timeout(function() {
                                        
                                          element.trigger('chosen:updated');
                                          element.val(scope.valuemember);
                                        
                                    }, 0, false);
                                        
                                        //$(attrs.id).
                                        //element.chosen();
        
                                  });
                            
                            }, 0, false);
                        //});
                       
                       	$timeout(function() {
                              //$compile(element.contents())(scope);
                              element.chosen(
                                {
                                  //disable_search_threshold: 10,
                                  no_results_text: "No se encontraron resultados!",
                                  //width: "95%"
                                }
                         );
                         
                         
                          if(esautobusqueda==true)
                          {
                              $('#'+element[0].id+'_chosen input').autocomplete({
                               source: function(request,response) {
                                 	
                                 	var palabrabuscar=request.term;
                                 	var datosurl= scope.getUrl(attrs.chosenurl,attrs.valuemember,palabrabuscar);
                                 	
                                 	$.ajax({
                                      url: datosurl.url,//"/ModuloAPIRansa/ObtenerCecoPorSociedad?idSociedad=fe660721-8bab-41e2-bf29-e9a1c4790da5&loginNameCoordinador=grupocogesa\\arojasmu&refreshcache=1",
                                      dataType: "json",
                                      success: function(data) {
                                        
                                        
                                        
                                        scope.$apply(function() {                                          
                                          	var obj=jQuery.parseJSON(data);
                                          	//ope.details = scope.gPlace.getPlace();
                                          	//scope.$root.item[element[0].id]=obj;
                                          	scope.modeldata=obj;
                                        });

                                        
                                        // $(obj).each(function(x){
                                           //$('#'+element[0].id+'_chosen ul.chosen-results').append('<li class="active-result">' + obj[x].name + '</li>');
                                           //$('#'+element[0].id).append('<option class="ng-scope" value='+obj[x].id+'>' + obj[x].name + '</option>');	
                                          //})
                                      }
                                   });
                                   }
                                });
                          }
                           
                        }, 0, false);
                      }
                   };
		}]);

})();