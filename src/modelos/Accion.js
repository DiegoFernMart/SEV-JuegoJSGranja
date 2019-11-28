class Accion extends Modelo {

    constructor(x, y,herramienta) {
        super(imagenes.accion, x, y);
        this.herramienta = herramienta;
        this.vx = 0;
        this.vy = 0;
    }

    actualizar (){

    }

}
