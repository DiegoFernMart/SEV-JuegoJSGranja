class Cultivo extends Modelo {

    constructor(x, y) {
        super(imagenes.cultivo_vacio, x, y);
        this.vx = 0;
        this.vy = 0;
        this.estado=estadosCultivos.vacio;
        this.dias=0;
    }

    actualizar (){

    }

    plantar(){
        //vacio -> plantado
        this.estado=estadosCultivos.plantado;
        this.imagen.src=imagenes.cultivo_plantado;
    }

    crecer(){
        if(this.estado!=estadosCultivos.crecido) {
            //plantado -> creciendo1
            if (this.estado == estadosCultivos.plantado && this.dias >= 0) {
                this.estado=estadosCultivos.creciendo1;
                this.imagen.src=imagenes.cultivo_creciendo1;
            }
            //creciendo1 -> creciendo2
            if (this.estado == estadosCultivos.creciendo1 && this.dias >= 3) {
                this.estado=estadosCultivos.creciendo2;
                this.imagen.src=imagenes.cultivo_creciendo2;
            }
            //Creciendo2 -> crecido
            if (this.estado == estadosCultivos.creciendo2 && this.dias >= 5) {
                this.estado=estadosCultivos.crecido;
                this.imagen.src=imagenes.cultivo_crecido;
            }
        }
        this.dias=this.dias+1;
    }

    recoger(){
        this.dias=0;
        this.estado=estadosCultivos.vacio;
        this.imagen.src=imagenes.cultivo_vacio;
    }


}