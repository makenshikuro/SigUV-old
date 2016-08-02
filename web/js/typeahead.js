/* global Bloodhound, Handlebars, _serverDB */
    profes ='';
    subjects ='';
    places ='';
$.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/profesores/',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    profes = response;
                }
        },
        async: false
    });
    $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/asignaturas/',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    subjects = response;
                }
        },
        async: false
    });
    $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/espacios/',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    places = response;
                }
        },
        async: false
    });
function typeahead() {
    
    var profesores = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: profes
    });
    var asignaturas = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: subjects
    });
    var espacios = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombre'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: places
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
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-profesores">{{nombre}} &#45; <span class="label label-primary">Dept. {{{trimString departamento}}}</span></div>')
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
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-espacios">{{nombre}} &#45; <span class="label label-primary">{{idedificio.idedificio}}</span></div>')
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
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-profesores">{{nombre}} &#45; <span class="label label-primary">Dept. {{{trimString departamento}}}</span></div>')
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
                    suggestion: Handlebars.compile('<div class="typeahead-resultados-espacios">{{nombre}} &#45; <span class="label label-primary">{{idedificio.idedificio}}</span></div>')
                }
            });

    //update al seleccionar profesor
    $('#busqueda-tab-profesor .typeahead').on('typeahead:selected', function (evt, item) {
<<<<<<< HEAD
        console.log((item));
=======
        //console.log(item);
>>>>>>> origin/master
        $('#localizar-profesor').attr('onclick', '').attr('onclick', 'LocalizarProfesor(' + item.idprofesor + ');');
    });

    //update al seleccionar asignatura
    $('#busqueda-tab-asignatura .typeahead').on('typeahead:selected', function (evt, item) {

        $('#listaDocentes').empty();
        var profesores = ListarDocentesAsignatura(item.idasignatura);
        
        var i;
        var html = '<div class="table-responsive">';
        html += '<table class="table table-hover">';
        html += '<thead><tr><th>Nombre</th><th>Facultad</th><th>Departamento</th></tr></thead>';
        html += '<tbody>';
        for (i = 0; i < profesores.length; i++) {
            html += '<tr ';
            
            var dep = profesores[i].departamento.split(',');
            if (profesores[i].visibilidad === '0') {
                html += 'class ="danger"';
            }
            html += 'onclick="LocalizarProfesor(' + profesores[i].idprofesor + ');">';
            html += '<td>' + profesores[i].nombre + '</td>';
            html += '<td>Dept. '+ dep[0]+' , '+profesores[i].idespacio.idedificio.idedificio+'</td>';
            html += '<td>' + profesores[i].correo + '</td>';
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        $('#listaDocentes').append(html);
    });
    //update al seleccionar espacio
    $('#busqueda-tab-espacio .typeahead').on('typeahead:selected', function (evt, item) {
        
        $('#localizar-espacio').attr('onclick', '').attr('onclick', 'LocalizarEspacio("' + item.idespacio + '");');
    });

    //update al seleccionar todo
    $('#busqueda-tab-todo .typeahead').on('typeahead:selected.espacios', function (evt, item) {
        //console.log(item);
        if (item.departamento) {

            $('#localizar-all').show();
            $('#listaDocentes').empty();
            $('#listaTodo').empty();
            $('#localizar-all').attr('onclick', '').attr('onclick', 'LocalizarProfesor(' + item.idprofesor + ');');
        }
        if (item.idasignatura) {

            
            $('#localizar-all').hide();
            $('#listaTodo').empty();
            var profesores = ListarDocentesAsignatura(item.idasignatura);
        
        var i;
        var html = '<div class="table-responsive">';
        html += '<table class="table table-hover">';
        html += '<thead><tr><th>Nombre</th><th>Facultad</th><th>Departamento</th></tr></thead>';
        html += '<tbody>';
        for (i = 0; i < profesores.length; i++) {
            html += '<tr ';
            
            var dep = profesores[i].departamento.split(',');
            if (profesores[i].visibilidad === '0') {
                html += 'class ="danger"';
            }
            html += 'onclick="LocalizarProfesor(' + profesores[i].idprofesor + ');">';
            html += '<td>' + profesores[i].nombre + '</td>';
            html += '<td>Dept. '+ dep[0]+' , '+profesores[i].idespacio.idedificio.idedificio+'</td>';
            html += '<td>' + profesores[i].correo + '</td>';
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
            $('#listaTodo').append(html);
        }
        if (item.bloque) {

            $('#localizar-all').show();
            $('#listaDocentes').empty();
            $('#listaTodo').empty();
            $('#localizar-all').attr('onclick', '').attr('onclick', 'LocalizarEspacio("' + item.idespacio + '");');
        }

    });

    /*
     * Funcion de Handlebars para crear subcadenas de texto
     * @param String cadena
     * @return String
     */
    Handlebars.registerHelper('trimString', function (string) {
        var cadena;
        cadena = string + '';
        //console.log(cadena);
        if (cadena !== 'undefined') {
            var theString = cadena.split(',');
            //console.log(theString);
            cadena = new Handlebars.SafeString(theString[0]);
        } else {
            cadena = '';
        }
        return cadena;
    });
    // Completar base de datos...

}

function Buscador() {

    var html = '<div class="modal-header">';

    html += '   <h4 class="modal-title">Buscador</h4>';
    html += '            </div>';
    html += '           <div class="modal-body">';
    html += '              <p> Buscador que nos permite localizar cualquier estancia de la ETSE, desde el punto de vista de las personas, las estancias, las denominaciones de espacios, o las aulas .</p>';
    html += '              <ul class="nav nav-tabs">';
    html += '     <li class="active"><a data-toggle="tab" href="#busqueda-tab-todo"><span class="fa fa-search"></span><span class="modal-tab-text">Todo</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-profesor"><span class="fa fa-users"></span><span class="modal-tab-text">Profesor</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-asignatura"><span class="fa fa-graduation-cap"></span><span class="modal-tab-text">Asignatura</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-espacio"><span class="fa fa-sitemap"></span><span class="modal-tab-text">Espacio</span></a></li>';
    html += ' </ul>';

    html += ' <div class="tab-content">';
    html += '     <div id="busqueda-tab-todo" class="tab-pane fade in active">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <div id="listaTodo">';

    html += '         </div>';
    html += '         <button id="localizar-all" type="button" class="btn btn-default" >Localizar</button>';
    html += '     </div>';

    html += '     <div id="busqueda-tab-profesor" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <input type="hidden" id="todo">';
    html += '         <div id = "resultados-profesor"></div>';
    html += '         <button id="localizar-profesor" type="button" class="btn btn-default"  >Localizar</button>';

    html += '     </div>';
    html += '     <div id="busqueda-tab-asignatura" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '<p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';

    html += '         <div id="listaDocentes">';

    html += '         </div>';
    html += '     </div>';
    html += '     <div id="busqueda-tab-espacio" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <button id="localizar-espacio" type="button" class="btn btn-default">Localizar</button>';

    html += '     </div>';
    html += '  </div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '      <button type="button" class="btn btn-default" onclick="ModalClose();">Close</button>';
    html += '     </div>';


    map.fire('modal', {content: html, MODAL_CONTENT_CLS: 'modal-content search'});
    typeahead();
    $('.search').css('margin-top', 100);
}