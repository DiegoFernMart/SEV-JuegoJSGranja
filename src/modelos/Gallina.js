class Gallina extends Modelo {

    constructor(x, y) {
        super(imagenes.gallina, x, y);

        this.orientacion=orientaciones.izquierda;

        this.vy = 0;
        this.vx = 0;

        this.cont=5;
        this.cd=true;
        this.huyendo=false;

        this.aIdleDerecha = new Animacion(imagenes.gallina_idle_derecha,
            this.ancho, this.alto, 6, 4);
        this.aIdleIzquierda = new Animacion(imagenes.gallina_idle_izquierda,
            this.ancho, this.alto, 6, 4);

        this.aCorriendoDerecha =
            new Animacion(imagenes.gallina_corriendo_derecha,
                this.ancho, this.alto, 6, 4,null);
        this.aCorriendoIzquierda = new Animacion(imagenes.gallina_corriendo_izquierda,
            this.ancho, this.alto, 6, 4, null);

        this.animacion=this.aIdleIzquierda;
    }

    actualizar (){

        this.cont--;
        if(this.huyendo){
            if(this.cont==0){
                this.huyendo=false;
                this.cont=10;
            }
        }else{
        if(this.cont==0){
            if(this.cd) {
                var dir = Math.random() * (5);
                dir = dir.toFixed(0);
                if (dir == 1) {
                    if(this.orientacion==orientaciones.izquierda){
                        this.animacion=this.aCorriendoIzquierda;
                    }else{
                        this.animacion=this.aCorriendoDerecha;
                    }
                    this.vy -= 1;
                    this.cont = 20;
                }
                if (dir == 2) {
                    this.orientacion=orientaciones.derecha;
                    this.animacion=this.aCorriendoDerecha;
                    this.vx += 1
                    this.cont = 20;
                }
                if (dir == 3) {
                    if(this.orientacion==orientaciones.izquierda){
                        this.animacion=this.aCorriendoIzquierda;
                    }else{
                        this.animacion=this.aCorriendoDerecha;
                    }
                    this.vy += 1;
                    this.cont = 20;
                }
                if (dir == 4) {
                    this.orientacion=orientaciones.izquierda;
                    this.animacion=this.aCorriendoIzquierda;
                    this.vx -= 1;
                    this.cont = 20;
                }
                if (dir == 5) {
                    if(this.orientacion==orientaciones.izquierda){
                        this.animacion=this.aIdleIzquierda;
                        this.cont=60;

                    }else{
                        this.animacion=this.aIdleDerecha;
                        this.cont=60;
                    }
                }else{
                    this.cont=20;
                }
                this.cd = false;
            }else{
                this.vx=0;
                this.vy=0;
                this.cd=true;
                this.cont=20;
            }
        }
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

    }

    huir(direccion){
        this.huyendo=true;
        this.cont=20;
        this.vx=0;
        this.vy=0;
        if(direccion==orientaciones.arriba){
            if(this.orientacion==orientaciones.izquierda){
                this.animacion=this.aCorriendoIzquierda;
            }else{
                this.animacion=this.aCorriendoDerecha;
            }
            this.vy-=1;
        }if(direccion==orientaciones.abajo){
            if(this.orientacion==orientaciones.izquierda){
                this.animacion=this.aCorriendoIzquierda;
            }else{
                this.animacion=this.aCorriendoDerecha;
            }
            this.vy+=1;
        }if(direccion==orientaciones.izquierda){
            this.animacion=this.aCorriendoIzquierda
            this.orientacion=orientaciones.izquierda;
            this.vx-=1;
        }if(direccion==orientaciones.derecha){
            this.animacion=this.aCorriendoDerecha;
            this.orientacion=orientaciones.derecha;
            this.vx+=1;
        }
        this.animacion.actualizar();
    }
    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }
}
