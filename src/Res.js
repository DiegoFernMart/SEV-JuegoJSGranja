// Lista re recursos a precargar
var imagenes = {
    //HUD
    fondo : "res/UI/fondo.png",
    fondoNegro: "res/UI/fondoNegro.png",
    fondoNegro2: "res/UI/fondoNegroTrans.png",
    inventario: "res/UI/Inventario.png",
    barra_herramientas: "res/UI/BarraHerramientasLlena.png",
    selector: "res/UI/Selector.png",
    accion : "res/UI/Accion.png",

    //JUGADOR
    jugador : "res/Jugador/Jugador.png",
    jugador_idle_derecha : "res/Jugador/Jugador_ID.png",
    jugador_idle_izquierda : "res/Jugador/Jugador_II.png",
    jugador_idle_arriba : "res/Jugador/Jugador_IU.png",
    jugador_idle_abajo : "res/Jugador/Jugador_IA.png",

    jugador_corriendo_derecha : "res/Jugador/Jugador_CD.png",
    jugador_corriendo_izquierda : "res/Jugador/Jugador_CI.png",
    jugador_corriendo_arriba : "res/Jugador/Jugador_CU.png",
    jugador_corriendo_abajo : "res/Jugador/Jugador_CA.png",

    jugador_azada_derecha : "res/Jugador/Jugador_AD.png",
    jugador_azada_izquierda : "res/Jugador/Jugador_AI.png",
    jugador_azada_arriba : "res/Jugador/Jugador_AU.png",
    jugador_azada_abajo : "res/Jugador/Jugador_AA.png",

    jugador_mazo_derecha : "res/Jugador/Jugador_MD.png",
    jugador_mazo_izquierda : "res/Jugador/Jugador_MI.png",
    jugador_mazo_arriba : "res/Jugador/Jugador_MU.png",
    jugador_mazo_abajo : "res/Jugador/Jugador_MA.png",

    jugador_semillas_derecha : "res/Jugador/Jugador_SD.png",
    jugador_semillas_izquierda : "res/Jugador/Jugador_SI.png",
    jugador_semillas_arriba : "res/Jugador/Jugador_SU.png",
    jugador_semillas_abajo : "res/Jugador/Jugador_SA.png",

    cultivo_vacio: "res/Ambiente/Cultivo_vacio.png",
    cultivo_plantado: "res/Ambiente/Cultivo_plantado.png",
    cultivo_creciendo1: "res/Ambiente/Cultivo_creciendo1.png",
    cultivo_creciendo2: "res/Ambiente/Cultivo_creciendo2.png",
    cultivo_crecido: "res/Ambiente/Cultivo_crecido.png",

    roca: "res/Ambiente/Roca.png",
    tronco: "res/Ambiente/Tronco.png",

    bloque_invisible: "res/Ambiente/Transparente.png",
    bloque_hierba : "res/Ambiente/Bloque_Hierba.png",
    bloque_tierra : "res/Ambiente/Bloque_Tierra.png",
    bloque_arena : "res/Ambiente/Bloque_Arena.png",
    bloque_agua : "res/Ambiente/Bloque_Agua.png",
    muro_arriba : "res/Ambiente/Muro_U.png",
    muro_arribaIzquierda : "res/Ambiente/Muro_UI.png",
    muro_arribaDerecha : "res/Ambiente/Muro_UD.png",
    muro_izquierda : "res/Ambiente/Muro_I.png",
    muro_derecha : "res/Ambiente/Muro_D.png",
    playa : "res/Ambiente/Playa.png",
    estanque: "res/Ambiente/Estanque.png",

    casa: "res/Ambiente/Casa.png",
    caja: "res/Ambiente/Caja.png",

    vendedora: "res/NPC/Vendedora.png",

    gallina: "res/NPC/Gallina.png",
    gallina_idle_derecha : "res/NPC/Gallina_ID.png",
    gallina_idle_izquierda : "res/NPC/Gallina_II.png",
    gallina_corriendo_derecha : "res/NPC/Gallina_CD.png",
    gallina_corriendo_izquierda : "res/NPC/Gallina_CI.png",

    test:"res/Ambiente/Test.png",

};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
