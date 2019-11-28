class Tronco extends Modelo {

    constructor(x, y) {
        super(imagenes.tronco, x, y);
        this.vx = 0;
        this.vy = 0;
        this.estado = estadosCultivos.vacio;
        this.dias = 0;
    }

    actualizar() {

    }
}