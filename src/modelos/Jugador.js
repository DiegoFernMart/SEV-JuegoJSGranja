class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y);
        this.estado = estados.moviendo;
        this.orientacion = orientaciones.abajo;
        this.herramienta = herramientas.azada;
        this.inventario={};
            this.inventario.dinero=0;
            this.inventario.cultivos=0;
            this.inventario.semillas=5;
            this.inventario.piedras=0;
            this.inventario.madera=0;
            this.inventario.ganancias=0;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones

        //IDLE
        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 6, 1);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 6, 1);
        this.aIdleAbajo = new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 6, 1);
        this.aIdleArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 6, 1);

        //CORRER
        this.aCorriendoDerecha =
            new Animacion(imagenes.jugador_corriendo_derecha,
                this.ancho, this.alto, 6, 4,null);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda,
            this.ancho, this.alto, 6, 4, null);
        this.aCorriendoAbajo =
            new Animacion(imagenes.jugador_corriendo_abajo,
                this.ancho, this.alto, 6, 4,null);
        this.aCorriendoArriba = new Animacion(imagenes.jugador_corriendo_arriba,
            this.ancho, this.alto, 6, 4, null);

        //ACCIONES
        this.aAzadaDerecha =
            new Animacion(imagenes.jugador_azada_derecha,
                this.ancho, this.alto, 6, 4, this.finAnimacionAccion.bind(this));
        this.aAzadaIzquierda = new Animacion(imagenes.jugador_azada_izquierda,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aAzadaAbajo =
            new Animacion(imagenes.jugador_azada_abajo,
                this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aAzadaArriba = new Animacion(imagenes.jugador_azada_arriba,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));

        this.aMartilloDerecha =
            new Animacion(imagenes.jugador_mazo_derecha,
                this.ancho, this.alto, 6, 4, this.finAnimacionAccion.bind(this));
        this.aMartilloIzquierda = new Animacion(imagenes.jugador_mazo_izquierda,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aMartilloAbajo =
            new Animacion(imagenes.jugador_mazo_abajo,
                this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aMartilloArriba = new Animacion(imagenes.jugador_mazo_arriba,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));

        this.aSemillasDerecha =
            new Animacion(imagenes.jugador_semillas_derecha,
                this.ancho, this.alto, 6, 4, this.finAnimacionAccion.bind(this));
        this.aSemillasIzquierda = new Animacion(imagenes.jugador_semillas_izquierda,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aSemillasAbajo =
            new Animacion(imagenes.jugador_semillas_abajo,
                this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));
        this.aSemillasArriba = new Animacion(imagenes.jugador_semillas_arriba,
            this.ancho, this.alto, 6, 4,this.finAnimacionAccion.bind(this));


        this.animacion = this.aIdleAbajo;


        //Accion CD
        this.tiempoAccion =10;

    }

    actualizar(){
        //this.estado = estados.moviendo;
        this.animacion.actualizar();


        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }
        if ( this.vy > 0 ){
            this.orientacion = orientaciones.abajo;
        }
        if ( this.vy < 0 ){
            this.orientacion = orientaciones.arriba;
        }

        // Selección de animación
        switch (this.estado){
            case estados.moviendo:
                if ( this.vx != 0 ) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if ( this.vx == 0){
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aIdleDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aIdleIzquierda;
                    }
                }
                if ( this.vy == 0){
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aIdleArriba;
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aIdleAbajo;
                    }
                }
                if ( this.vy != 0){
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aCorriendoArriba;
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aCorriendoAbajo;
                    }
                }
                break;
            case estados.accion:
                if (this.orientacion == orientaciones.derecha) {
                    if(this.herramienta==herramientas.mazo)
                        this.animacion = this.aMartilloDerecha;
                    if(this.herramienta==herramientas.azada)
                        this.animacion = this.aAzadaDerecha;
                    if(this.herramienta==herramientas.semilla)
                        this.animacion = this.aSemillasDerecha;
                }
                if (this.orientacion == orientaciones.izquierda) {
                    if(this.herramienta==herramientas.mazo)
                        this.animacion = this.aMartilloIzquierda;
                    if(this.herramienta==herramientas.azada)
                        this.animacion = this.aAzadaIzquierda;
                    if(this.herramienta==herramientas.semilla)
                        this.animacion = this.aSemillasIzquierda;
                }
                if (this.orientacion == orientaciones.abajo) {
                    if(this.herramienta==herramientas.mazo)
                        this.animacion = this.aMartilloAbajo;
                    if(this.herramienta==herramientas.azada)
                        this.animacion = this.aAzadaAbajo;
                    if(this.herramienta==herramientas.semilla)
                        this.animacion = this.aSemillasAbajo;
                }
                if (this.orientacion == orientaciones.arriba) {
                    if(this.herramienta==herramientas.mazo)
                        this.animacion = this.aMartilloArriba;
                    if(this.herramienta==herramientas.azada)
                        this.animacion = this.aAzadaArriba;
                    if(this.herramienta==herramientas.semilla)
                        this.animacion = this.aSemillasArriba;
                }
                break;
        }


        // Tiempo Accion
        if ( this.tiempoAccion > 0 ) {
            this.tiempoAccion--;
        }
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }

    moverX (direccion){
        this.vx = direccion * 3;
        if(this.estado==estados.accion){
            this.vx=0;
        }
    }

    moverY (direccion){
        this.vy = direccion * 3;
        if(this.estado==estados.accion){
            this.vy=0;
        }
    }
    accion(){
        if(this.tiempoAccion <=0) {
            this.estado = estados.accion;
            this.tiempoAccion=10;
            switch(this.orientacion){
                case orientaciones.arriba:
                    return new Accion(this.x,this.y-16,this.herramienta);
                case orientaciones.abajo:
                    return new Accion(this.x,this.y+16,this.herramienta);
                case orientaciones.izquierda:
                    return new Accion(this.x-16,this.y,this.herramienta);
                case orientaciones.derecha:
                    return new Accion(this.x+16,this.y,this.herramienta);

            }

        }
        return null;
    }

    vender(){
        this.
        this.cultivos=0;
    }
    finAnimacionAccion(){
        this.estado = estados.moviendo;
    }
}
