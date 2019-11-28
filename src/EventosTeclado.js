var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 32:
                controles.accion = true;
                controles.continuar = true;
                break;
            case 87:
                controles.moverY = 1;
                break;
            case 83:
                controles.moverY = -1;
                break;
            case 68:
                controles.moverX = 1;
                break;
            case 65:
                controles.moverX = -1;
                break;
            case 49:
                controles.herramienta = herramientas.mazo;
                break;
            case 50:
                controles.herramienta = herramientas.azada;
                break;
            case 51:
                controles.herramienta = herramientas.semilla;
                break;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 32:
            controles.accion = false;
            controles.continuar = false;
            break;
        case 87:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 83:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 68:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 65:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case 49:
            if(controles.herramienta == herramientas.mazo)
                controles.herramienta=0;
            break;
        case 50:
            if(controles.herramienta == herramientas.azada)
                controles.herramienta=0;
            break;
        case 51:
            if(controles.herramienta == herramientas.semilla)
                controles.herramienta=0;
            break;
    }

}
