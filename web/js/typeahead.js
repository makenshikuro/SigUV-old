/* global Bloodhound, Handlebars */
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
   
   
    var profesores = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: "http://147.156.82.219:8080/siguvServer/webresources/profesores"
    });
    var asignaturas = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: "http://147.156.82.219:8080/siguvServer/webresources/asignaturas"
    });

    $('#busqueda-tab-profesor .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        classNames: {
            input: 'Typeahead-input',
            hint: 'Typeahead-hint',
            selectable: 'Typeahead-selectable',
            menu: 'Typeahead-menu',
            dataset: 'Typeahead-dataset',
            suggestion: 'Typeahead-suggestion',
            empty: 'Typeahead-empty',
            open: 'Typeahead-open',
            cursor: 'Typeahead-cursor'
                   
  }
    },
            {
                name: 'profesores',
                displayKey: 'nombre',
                source: profesores,
                templates: {
                    
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-profesores">{{nombre}} &#45; <span class="label label-primary">{{idespacio.idespacio}}</span></div>')
                }
                
                
            });

    
    
    $('#busqueda-tab-asignatura .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        classNames: {
            input: 'Typeahead-input',
            hint: 'Typeahead-hint',
            selectable: 'Typeahead-selectable',
            menu: 'Typeahead-menu',
            dataset: 'Typeahead-dataset',
            suggestion: 'Typeahead-suggestion',
            empty: 'Typeahead-empty',
            open: 'Typeahead-open',
            cursor: 'Typeahead-cursor'

        }
    },
            {
                name: 'asignaturas',
                displayKey: 'nombre',
                source: asignaturas,
                templates: {
                    
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-asignaturas">{{nombre}} </div>')
                }
            });
            
    $('#busqueda-tab-todo .typeahead').typeahead({
        highlight: true,
        hint: true,
        minLength: 1,
        classNames: {
            input: 'Typeahead-input',
            hint: 'Typeahead-hint',
            selectable: 'Typeahead-selectable',
            menu: 'Typeahead-menu',
            dataset: 'Typeahead-dataset',
            suggestion: 'Typeahead-suggestion',
            empty: 'Typeahead-empty',
            open: 'Typeahead-open',
            cursor: 'Typeahead-cursor'

        }
    },
            {
                name: 'profesores',
                display: 'nombre',
                source: profesores,
                templates: {
                    header: '<div class="typeahead-header-resultados"><span class="fa fa-users"></span>Profesores</h3>',
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-profesores">{{nombre}} &#45; <span class="label label-primary">{{idespacio.idespacio}}</span></div>')
                }
            },
            {
                name: 'asignaturas',
                display: 'nombre',
                source: asignaturas,
                templates: {
                    header: '<div class="typeahead-header-resultados"><span class="fa fa-graduation-cap"></span>Asignaturas</h3>',
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-asignaturas">{{nombre}} </div>')
                }
            });

    //update al seleccionar profesor
    $('#busqueda-tab-profesor .typeahead').on('typeahead:selected', function (evt, item) {
        //var idEspacio = item.idespacio.idespacio;
        //$('#busqueda-tab-profesor .typeahead').typeahead('val', idEspacio);
        $('#localizar-profesor').attr('onclick', '').attr('onclick','LocalizarProfesor('+item.idprofesor+')').attr('data-dismiss','modal');
        
    });
    //update al seleccionar asignatura
    $('#busqueda-tab-asignatura .typeahead').on('typeahead:selected', function (evt, item) {
        //var idEspacio = item.idespacio.idespacio;
        //$('#busqueda-tab-profesor .typeahead').typeahead('val', idEspacio);
        $('#localizar-asignatura').attr('onclick', '').attr('onclick','ListarDocentesAsignatura('+item.idasignatura+')').attr('data-dismiss','modal');
        
    });
    //update al seleccionar profesor
    $('#busqueda-tab-todo .typeahead').on('typeahead:selected', function (evt, item) {
        if ( typeof(item.idprofesor) !== 'undefined'){
        //var idEspacio = item.idespacio.idespacio;
        /*console.log(evt);
        console.log(item);*/
        /*$('#busqueda-tab-todo .typeahead').typeahead('val', idEspacio );*/
        $('#localizar-all').attr('onclick', '').attr('onclick','LocalizarProfesor('+item.idprofesor+')').attr('data-dismiss','modal');
    }
    else{
        //var asignatura = item.nombre;
        /*$('#busqueda-tab-todo .typeahead').typeahead('val', asig);*/
        //console.log(item);
        $('#localizar-all').attr('onclick', '').attr('onclick','ListarDocentesAsignatura('+item.idasignatura+')');
    }
        
    });
    

});