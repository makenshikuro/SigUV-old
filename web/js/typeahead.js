/* global Bloodhound */
$(document).ready(function () {
    
  /*  var engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: "http://localhost:8080/siguvServer/webresources/profesores"
            
            
        }
    });
    
    var engine2 = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: "http://localhost:8080/siguvServer/webresources/asignaturas"
            
            
        }
    });

// initialize the bloodhound suggestion engine
    engine.initialize();
    engine2.initialize();

// instantiate the typeahead UI para profesor
    $('#busqueda-tab-profesor .typeahead').typeahead({
        hint: true,
        valueKey: 'nombre',
        matcher: function () { return true; },
        highlight: true,
        minLength: 1
    }, {
        name: 'profesores',
        displayKey: 'nombre',
        source: engine.ttAdapter()
        
    });
    
    // instantiate the typeahead UI para profesor
    $('#busqueda-tab-asignatura .typeahead').typeahead({
        hint: true,
        highlight: true,
        matcher: true,
        minLength: 1
        
    }, {
        name: 'asignatura',
        displayKey: 'nombre',
        source: engine2.ttAdapter()
    });
    */
   var states = [{"correo":"inmaculada.coma@uv.es","idespacio":{
               "bloque":"1","descripcion":"Sala ReuniÃ³n IEEE","idcoordenada":{
                   "descripcion":"1.0.2A","idcoordenada":"ETSE102A","latitud":"39.51255","longitud":"-0.42416"},
               "idedificio":{"chano":"siguv/recursos/chanos/etse.svg","direccion":"Avinguda de la Universitat s/n\n46100 Burjassot, ValÃ¨ncia (SPAIN)","enlace":"http://www.uv.es/etse","idcoordenada":{"descripcion":"escuela IngenierÃ­a","idcoordenada":"ETSE","latitud":"39.512877","longitud":"-0.423967"},"idedificio":"ETSE","nombre":"Escola TÃ¨cnica Superior d'Enginyeria","telefono":"963543210"},"idespacio":"ETSE01PB102A","nombre":"1.0.2A","piso":"0","tipo":"Asociacion","visibilidad":"1"},"idprofesor":"4","nombre":"Inmaculada Coma Tatay","visibilidad":"1"},{"correo":"antonio.boluda@uv.es","idespacio":{"bloque":"1","descripcion":"Sede IEEE","idcoordenada":{"descripcion":"1.0.2B","idcoordenada":"ETSE102B","latitud":"39.51252","longitud":"-0.42412"},"idedificio":{"chano":"siguv/recursos/chanos/etse.svg","direccion":"Avinguda de la Universitat s/n\n46100 Burjassot, ValÃ¨ncia (SPAIN)","enlace":"http://www.uv.es/etse","idcoordenada":{"descripcion":"escuela IngenierÃ­a","idcoordenada":"ETSE","latitud":"39.512877","longitud":"-0.423967"},"idedificio":"ETSE","nombre":"Escola TÃ¨cnica Superior d'Enginyeria","telefono":"963543210"},"idespacio":"ETSE01PB102B","nombre":"1.0.2B","piso":"0","tipo":"Asociacion","visibilidad":"1"},"idprofesor":"5","nombre":"Jose Antonio Boluda","visibilidad":"1"}];
   
   
    var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: states
});

$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  displayKey: 'nombre',
  source: states
});
    

});