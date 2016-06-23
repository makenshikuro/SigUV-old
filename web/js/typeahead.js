/* global Bloodhound, Handlebars */
function typeahead () {
       
    profesores = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: _serverDB+"/webresources/profesores"
    });
    var asignaturas = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: _serverDB+"/webresources/asignaturas"
    });
    var espacios = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: _serverDB+"/webresources/espacios"
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

    $('#busqueda-tab-espacio .typeahead').typeahead({
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
                name: 'espacios',
                displayKey: 'idespacio',
                source: espacios,
                templates: {
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-espacios">{{nombre}} - {{descripcion}} </div>')
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
            },
            {
                name: 'espacios',
                display: 'idespacio',
                source: espacios,
                templates: {
                    header: '<div class="typeahead-header-resultados"><span class="fa fa-sitemap"></span>Espacios</h3>',
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-espacios">{{descripcion}} &#45; <span class="label label-primary">{{nombre}}</span></div>')
                }
            });

    //update al seleccionar profesor
    $('#busqueda-tab-profesor .typeahead').on('typeahead:selected', function (evt, item) {
        
        $('#localizar-profesor').attr('onclick', '').attr('onclick','LocalizarProfesor('+item.idprofesor+');');
        
    });
    //update al seleccionar asignatura
    $('#busqueda-tab-asignatura .typeahead').on('typeahead:selected', function (evt, item) {
        
        $('#listaDocentes').empty();
        var profesores = ListarDocentesAsignatura(item.idasignatura);
        console.log(profesores);
        var i;
        var html = '<div class="table-responsive">';
            html += '<table class="table table-hover">';
            html += '<thead><tr><th>Nombre</th><th>Facultad</th><th>Departamento</th></tr></thead>';
            html += '<tbody>';
            for ( i=0; i < profesores.length ;i++){      
                html += '<tr ';
                if (profesores[i].visibilidad === '0'){
                    html += 'class ="danger"';
                }
                html += 'onclick="LocalizarProfesor(' + profesores[i].idprofesor +');">';
                html += '<td>'+ profesores[i].nombre +'</td>';
                html += '<td>'+ profesores[i].visibilidad +'</td>';
                html += '<td>'+ profesores[i].correo +'</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            html += '</div>';                       
        $('#listaDocentes').append(html);
    });
    //update al seleccionar espacio
    $('#busqueda-tab-espacio .typeahead').on('typeahead:selected', function (evt, item) {
        console.log(item.idespacio);
        $('#localizar-espacio').attr('onclick', '').attr('onclick','LocalizarEspacio("'+item.idespacio+'");');
        
    });
    
    //update al seleccionar profesor
    $('#busqueda-tab-todo .typeahead').on('typeahead:selected', function (evt, item) {
        if ( typeof(item.idprofesor) !== 'undefined'){
        //var idEspacio = item.idespacio.idespacio;
        /*console.log(evt);
        console.log(item);*/
        /*$('#busqueda-tab-todo .typeahead').typeahead('val', idEspacio );*/
        $('#localizar-all').attr('onclick', '').attr('onclick','LocalizarProfesor('+item.idprofesor+');');
    }
    else{
        //var asignatura = item.nombre;
        /*$('#busqueda-tab-todo .typeahead').typeahead('val', asig);*/
        //console.log(item);
        //$('#localizar-all').attr('onclick', '').attr('onclick','ListarDocentesAsignatura('+item.idasignatura+')');
    }
        
    });
    

}