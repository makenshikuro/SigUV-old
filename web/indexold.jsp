<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>        
        <title>SigUV</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Favicons -->
        <!-- <link rel="apple-touch-icon" sizes="57x57" href="/css/favicon/apple-icon-57x57.png">
         <link rel="apple-touch-icon" sizes="60x60" href="/css/favicon/apple-icon-60x60.png">
         <link rel="apple-touch-icon" sizes="72x72" href="/css/favicon/apple-icon-72x72.png">
         <link rel="apple-touch-icon" sizes="76x76" href="/css/favicon/apple-icon-76x76.png">
         <link rel="apple-touch-icon" sizes="114x114" href="/css/favicon/apple-icon-114x114.png">
         <link rel="apple-touch-icon" sizes="120x120" href="/css/favicon/apple-icon-120x120.png">
         <link rel="apple-touch-icon" sizes="144x144" href="/css/favicon/apple-icon-144x144.png">
         <link rel="apple-touch-icon" sizes="152x152" href="/css/favicon/apple-icon-152x152.png">
         <link rel="apple-touch-icon" sizes="180x180" href="/css/favicon/apple-icon-180x180.png">
         <link rel="icon" type="image/png" sizes="192x192"  href="/css/favicon/android-icon-192x192.png">
         <link rel="icon" type="image/png" sizes="32x32" href="/css/favicon/favicon-32x32.png">
         <link rel="icon" type="image/png" sizes="96x96" href="/css/favicon/favicon-96x96.png">
         <link rel="icon" type="image/png" sizes="16x16" href="/css/favicon/favicon-16x16.png">
         <link rel="manifest" href="/css/favicon/manifest.json">
         <meta name="msapplication-TileColor" content="#ffffff">
         <meta name="msapplication-TileImage" content="/css/favicon/ms-icon-144x144.png">
         <meta name="theme-color" content="#ffffff">-->

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>    

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <!-- Estilos  -->
        <link rel="stylesheet" href="css/estilos.css" />
        <link rel="stylesheet" href="css/L.Control.Sidebar.css" />

        <!-- Lealflet  -->
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
        <link rel="stylesheet" href="css/leaflet.awesome-markers.css">


        <!-- Mapbox  -->
        <script src='https://api.mapbox.com/mapbox.js/v2.2.4/mapbox.js'></script>
        <!-- <link href='https://api.mapbox.com/mapbox.js/v2.2.4/mapbox.css' rel='stylesheet' />-->

        <!-- Javascript  -->

        <!--<script async defer src="http://maps.google.com/maps/api/js?v=3"></script>-->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCABPLRF1cCUlr2pOSHHa8iYl_gqYvnKFI"
        async defer></script>
        <!--<script src="http://matchingnotes.com/javascripts/leaflet-google.js"></script>-->
        <script src="js/Google.js"></script>
        <script src="js/L.Control.Sidebar.js"></script>
        <script src="js/raphael-min.js"></script>
        <script src="js/rlayer.js"></script>
        <script src="js/leaflet.awesome-markers.min.js"></script>
        <script src="js/poi.js"></script>
        <script src="js/mapas.js"></script>
        <script src="js/webservice.js"></script>



    </head>

    <body onload="init()">

        <div role="navigation" class="navbar navbar-inverse">
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><div class="logoUV"></div></a>
            </div>

            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li><a onclick="closeAllSidebars();" data-toggle="modal" data-target="#myModal" href="#"><span class="fa fa-search"></span><span class="navbar-header-text">Buscador</span></a></li>
                    <li><a onclick="openSidebarLayers();" href="#"><span class="fa fa-list-ul"></span></span><span class="navbar-header-text">Capas</span></a></li>
                    <li><a onclick="openSidebarFacultades();"  href="#"><span class="fa fa-university"></span><span class="navbar-header-text">Facultades</span></a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <span class="fa fa-cog"></span></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#"><span class="fa fa-location-arrow"></span><span class="navbar-header-text"></span>GPS</a></li>
                            <li><a href="#"><span class="fa fa-info-circle"></span><span class="navbar-header-text"></span>Leyenda</a></li>
                            <li><a href="#"><span class="fa fa-life-saver"></span><span class="navbar-header-text"></span>Ayuda</a></li> 
                        </ul>
                    </li>
                </ul>
                <div id="nivel" class="btn-group level" data-toggle="buttons">
                    <label class="btn btn-primary active">
                        <input type="radio" name="nivel" value="0" autocomplete="off" checked> PB
                    </label>
                    <label class="btn btn-primary">
                        <input type="radio" name="nivel" value="1" autocomplete="off"> P1
                    </label>
                    <label class="btn btn-primary">
                        <input type="radio" name="nivel" value="2" autocomplete="off"> P2
                    </label>             
                    <label class="btn btn-primary">
                        <input type="radio" name="nivel" value="3" autocomplete="off"> P3
                    </label>
                </div>





            </div>
        </div>

        <div id="map" ></div>


        <!-- Sidebar de Capas -->
        <div id="sidebarLayers">
            <div class="sidebar-header">
                <div class="sidebar-header-img"><img src="images/layers-icon.png" alt="Icono Capas"/></div>

                <div class="sidebar-header-text" >Capas</div>
            </div>
            <div class="clearM2"></div>
            <div class="sidebar-toggle-group">
                <div class="sidebar-toggle-text" >Fondo</div>
                <div class="btn-group" data-toggle="buttons"> 
                    <label class="btn btn-primary large active" id="fondoON">
                        <input type="radio" name="fondo" value="plano" checked > <div><div><img src="images/mapbox.png"></div><div>Plano</div></div>
                    </label>

                    <label class="btn btn-primary large" id="fondoOFF">
                        <input type="radio" name="fondo" value="sat"  > <div><div><img src="images/google.png"></div><div> Sat&eacute;lite</div></div>
                    </label>
                </div>

            </div>
            <div class="clearM2"></div>
            <div class="sidebar-toggle-group">
                <div class="sidebar-toggle-text" >Tema</div>
                <div class="btn-group" data-toggle="buttons"> 
                    <label class="btn btn-primary large active" id="temaON">
                       <input type="radio" name="tema" value="c"  checked > <div><div><img src="images/cd.png"></div><div> Categor&iacute;a</div></div>
                       
                    </label>

                    <label class="btn btn-primary large" id="temaOFF">
                       <input type="radio" name="tema" value="b"  > <div><div><img src="images/bd.png"></div><div> B&aacute;sico</div></div>
                       
                    </label>
                </div>

            </div>
        <div class="clearM2"></div>
        <div class="sidebar-toggle-group">
            <div class="sidebar-toggle-text" >Denominacion</div>
            <div class="btn-group" data-toggle="buttons"> 
                <label class="btn btn-primary large active" id="temaON">
                    <input type="radio" name="denominacion" value="d" checked > <div><div><img src="images/bd.png"></div><div> Descripci&oacute;n</div></div>
                </label>

                <label class="btn btn-primary large" id="temaOFF">
                    <input type="radio" name="denominacion" value="c"> <div><div><img src="images/bc.png"></div><div> C&oacute;digo</div></div> 
                </label>
            </div>

        </div>
        <div class="clearM2"></div>
        <div class="sidebar-toggle-group">
            <div class="sidebar-toggle-text" >Iconos</div>
            <div class="btn-group" data-toggle="buttons"> 
                <label class="btn btn-primary ON active" id="iconsON">
                    <input type="radio" name="icons" value="on" checked > I
                </label>

                <label class="btn btn-primary OFF" id="iconsOFF">
                    <input type="radio" name="icons" value="off"> O
                </label>
            </div>

        </div>
        <div class="clearM2"></div>
    </div>

    <!-- Sidebar de Facultades -->
    <div id="sidebarFacultades">
        <div class="sidebar-header">
            <div class="sidebar-header-icon"><span class="fa fa-university"></span></div>
            <div class="sidebar-header-text">Facultades</div>
        </div>
        <div class="clearM1"></div>

        <table class="table table-hover">

            <tbody>
                <%
                    jqxhr
                %>
                
                <tr>
                    <td>Escola T&eacute;cnica Superior d&OpenCurlyQuote;Enginyeria</td>

                </tr>
                <tr>
                    <td>Facultat de Matem&agrave;tiques</td>

                </tr>
                <tr>
                    <td>Facultat de Ci&eacute;ncies Biol&ograve;giques</td>

                </tr>
            </tbody>
        </table>
    </div>


    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <p>Some text in the modal.</p>
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#busqueda-tab-todo"><span class="fa fa-search"></span><span class="modal-tab-text">Todo</span></a></li>
                        <li><a data-toggle="tab" href="#busqueda-tab-profesor"><span class="fa fa-users"></span><span class="modal-tab-text">Profesor</span></a></li>
                        <li><a data-toggle="tab" href="#busqueda-tab-asignatura"><span class="fa fa-graduation-cap"></span><span class="modal-tab-text">Asignatura</span></a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="busqueda-tab-todo" class="tab-pane fade in active">
                            <div class='clearM1'></div>
                            <p><input type="text" class="form-control" placeholder="Campo de texto"></p>
                        </div>
                        <div id="busqueda-tab-profesor" class="tab-pane fade">
                            <div class='clearM1'></div>
                            <p><input type="text" class="form-control" placeholder="Campo de texto"></p>
                        </div>
                        <div id="busqueda-tab-asignatura" class="tab-pane fade">
                            <div class='clearM1'></div>
                            <p><input type="text" class="form-control" placeholder="Campo de texto"></p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script>
    </script>

</body>
</html>