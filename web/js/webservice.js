/* 
 * Librería dedicada a las conexiones con el servicio web en la dirección
 * http://localhost:8080/siguvServer/webresources/
 * 
 *  Los servicios implementados son:
 *  - Edificios
 *  - Espacios
 *  - Asignaturas
 *  - Profesores
 *  - Coordenadas
 *  - Panoramas
 * 
 */

$(document).ready(function () {
          /*      $("#getData").click(function(){
                    var data = $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/siguvServer/webresources/edificios",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    success: ajaxCallSucceed
                                    
                                   
                    });
                    
                    
                    
                });*/
 /*var jqxhr = $.getJSON( "http://localhost:8080/siguvServer/webresources/edificios", function(v) {
  console.log( "success"+v[0].nombre );
})  .done(function(f) {
    console.log( "second success"+f[0].nombre );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });*/
  
  jqxhr = $.getJSON( "http://localhost:8080/siguvServer/webresources/edificios", function(v) {
      
      var html = '<table class="table table-hover"><tbody>';
      $.each(v, function(i,data){
          html += '<tr onclick="setPosition('+data.idcoordenada.latitud +','+ data.idcoordenada.longitud +');"><td>'+data.nombre+'</td></tr>';
          
          //alert(data.nombre);
          
      });
      html += "</tbody></table>";
      $(html).appendTo('#facultades');
      
  //console.log( "success"+v[0].nombre );
  
});


//$("#facultades");
    
           

        
    });
    
function ajaxCallSucceed(response) {
        console.log(response[0].nombre);
        alert(response[0].nombre);
}
