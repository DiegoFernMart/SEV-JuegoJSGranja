class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);
        this.scrollX = 0;
        this.scrollY = 320;

        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);
        this.inventario= new Fondo(imagenes.inventario,480*0.075,320*0.12);
        this.numDinero= new Texto(0,480*0.09,320*0.051);
        this.numPiedra= new Texto(0,480*0.09,320*0.11);
        this.numMadera= new Texto(0,480*0.09,320*0.16);
        this.numGallinas= new Texto(3,480*0.09,320*0.22);
        this.herramientas= new Fondo(imagenes.barra_herramientas,480*0.5,320*0.95);
        this.selector= new Fondo(imagenes.selector,480*0.5,320*0.95);
        this.numSemillas= new Texto(5,480*0.58,320*0.99);

        this.contador = 0;
        this.transicion=false;
        this.fondoNegro = new Fondo(imagenes.fondoNegro2,480*0.5,320*0.5);

        this.bloques = [];
        this.tierraValida=[];
        this.recolectables=[];
        this.cultivos = [];
        this.gallinas = [];

        this.accionJugador=null;

        this.casa=null;
        this.caja=null;
        this.vendedora=null;

        this.cargarMapa("res/"+nivelActual+".txt");
        //cargar tierra valia
        for (var i=0; i < this.bloques.length; i++){
            if(this.bloques[i].cultivable)
                this.tierraValida.push(this.bloques[i]);
        }
    }

    actualizar (){

        if(!this.transicion) {

            this.espacio.actualizar();

            this.jugador.actualizar();

            for (var i = 0; i < this.cultivos.length; i++) {
                this.cultivos[i].actualizar();
            }

            //Pasar de día
            if (this.jugador.colisiona(this.casa)) {
                this.pasarDia();
            }

            //Vender
            if(this.jugador.colisiona(this.caja)){
                this.vender();
            }

            //Comprar
            if(this.jugador.colisiona(this.vendedora) && this.jugador.y>this.vendedora.y){
                this.comprar();
            }

            //Acciones del jugador
            if (this.accionJugador != null) {
                //MAZO
                if (this.accionJugador.herramienta == herramientas.mazo) {
                    for (var i = 0; i < this.recolectables.length; i++) {
                        if (this.accionJugador && this.recolectables[i].colisiona(this.accionJugador)) {
                            //Destruir
                            if(this.recolectables[i].roca)
                                this.jugador.inventario.piedras+=1;
                            else
                                this.jugador.inventario.madera+=1;
                            this.espacio.eliminarCuerpoEstatico(this.recolectables[i]);
                            this.recolectables.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    for (var i = 0; i < this.gallinas.length; i++) {
                        if (this.accionJugador && this.gallinas[i].colisiona(this.accionJugador)) {
                            //Destruir
                            this.gallinas[i].huir(this.jugador.orientacion);
                            this.accionJugador=null;
                            var gallina = new Gallina(this.gallinas[i].x,this.gallinas[i].y);
                            this.espacio.agregarCuerpoDinamico(gallina);
                            this.gallinas.push(gallina);
                        }
                    }
                }
                //AZADA
                else if (this.accionJugador.herramienta == herramientas.azada) {
                    //Si es azada recoger
                    for (var i = 0; i < this.cultivos.length; i++) {
                     if (this.accionJugador.colisiona(this.cultivos[i])
                        && this.cultivos[i].estado == estadosCultivos.crecido) {
                         this.cultivos[i].recoger();
                         this.jugador.inventario.cultivos = this.jugador.inventario.cultivos + 1;
                         this.accionJugador = null;
                     }
                    }
                    if(this.accionJugador){
                    for (var i = 0; i < this.tierraValida.length; i++) {
                        if (this.accionJugador && this.tierraValida[i].colisiona(this.accionJugador)) {
                            //Crear cultivo nuevo
                            var cultivo = new Cultivo(this.tierraValida[i].x, this.tierraValida[i].y);
                            this.cultivos.push(cultivo);
                            this.accionJugador = null;
                        }
                    }}
                }
                //SEMILLAS
                else if (this.accionJugador.herramienta == herramientas.semilla) {
                    for (var i = 0; i < this.cultivos.length; i++) {
                        //Si es semillas plantar
                        if (this.accionJugador &&this.accionJugador.colisiona(this.cultivos[i])
                            && this.cultivos[i].estado == estadosCultivos.vacio
                            && this.jugador.inventario.semillas > 0) {
                            this.cultivos[i].plantar();
                            this.accionJugador = null;
                            this.jugador.inventario.semillas = this.jugador.inventario.semillas - 1;
                        }
                    }
                }
            }

            for(var i=0; i<this.gallinas.length;i++){
                this.gallinas[i].actualizar();
            }

        }else{
            //Transiccion
            this.contador++;
            if(this.contador>=0 && this.contador<25){
                //ifunidado 1
                this.fondoNegro.imagen.src=imagenes.fondoNegro2;
            }
            if(this.contador>=25 && this.contador<50){
                //negro
                this.fondoNegro.imagen.src=imagenes.fondoNegro;
            }
            if(this.contador>=50 && this.contador<75){
                //difuminado
                this.fondoNegro.imagen.src=imagenes.fondoNegro2;
            }
            if(this.contador>=75){
                this.transicion=false;
                this.contador=0;
            }
        }

        this.numGallinas.valor=this.gallinas.length;
        this.numPiedra.valor=this.jugador.inventario.piedras;
        this.numMadera.valor=this.jugador.inventario.madera;
        this.numDinero.valor=this.jugador.inventario.dinero;
    }

    comprar(){
        if(this.jugador.inventario.dinero>=5){
            this.jugador.inventario.semillas+=1;
            this.jugador.inventario.dinero-=5;
            this.jugador.y+=16;
        }
    }

    vender(){
        if(this.jugador.inventario.cultivos >0){
            this.jugador.inventario.ganancias=this.jugador.inventario.cultivos * 10;
            this.jugador.inventario.cultivos=0;
        }
    }

    pasarDia(){
        this.transicion = true;
        this.jugador.y+= 16;
        this.jugador.inventario.dinero+=this.jugador.inventario.ganancias;
        this.jugador.inventario.ganancias=0;
        //eliminar cultivos vacios y crecer plantados
        for (var i=0; i < this.cultivos.length; i++){
            if(this.cultivos[i].estado==estadosCultivos.vacio){
                this.cultivos.splice(i, 1);
                i = i-1;
            }else{
                this.cultivos[i].crecer();
            }
        }
        //generar recolectables
        for(var i=0; i<7;i++) {
            var generado = true;
            while(generado) {
                var r = Math.random() * (this.tierraValida.length - 0);
                var r2 = Math.random() * (2 - 0);
                r=r.toFixed(0);
                r2=r2.toFixed(0);
                if(r2==1)
                    var recolectable = new Roca(this.tierraValida[r].x,this.tierraValida[r].y);
                else
                    var recolectable = new Tronco(this.tierraValida[r].x,this.tierraValida[r].y);
                for (var j=0; j < this.cultivos.length; j++){
                    if(!(this.cultivos[j].colisiona(recolectable))){
                        generado=false;
                        this.recolectables.push(recolectable);
                        this.espacio.agregarCuerpoEstatico(recolectable);
                        break;
                    }
                }
                if(this.cultivos.length<=0){
                    generado=false;
                    this.recolectables.push(recolectable);
                    this.espacio.agregarCuerpoEstatico(recolectable);
                }

            }
        }

    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

        this.scrollY = this.jugador.y - 320 * 0.7;
    }

    dibujar (){
        this.calcularScroll();
        this.fondo.dibujar();

        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX,this.scrollY);
        }
        for (var i=0; i < this.cultivos.length; i++){
            this.cultivos[i].dibujar(this.scrollX,this.scrollY);
        }
        for (var i=0; i < this.recolectables.length; i++){
            this.recolectables[i].dibujar(this.scrollX,this.scrollY);
        }
        for(var i=0; i<this.gallinas.length;i++){
            this.gallinas[i].dibujar(this.scrollX,this.scrollY);
        }
        this.jugador.dibujar(this.scrollX,this.scrollY);

        //this.casa.dibujar(this.scrollX,this.scrollY);

        //HUD
        this.herramientas.dibujar();
        this.inventario.dibujar();
        this.selector.dibujar();
        this.numSemillas.valor=this.jugador.inventario.semillas;
        this.numSemillas.dibujar();
        this.numDinero.dibujar();
        this.numGallinas.dibujar();
        this.numMadera.dibujar();
        this.numPiedra.dibujar();

        if(this.transicion){
            this.fondoNegro.dibujar();
        }
    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            this.altoMapa =0;
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                this.anchoMapa = (lineas[0].length-1) * 40;
                for (var j = 0; j < linea.length; j++){
                    this.altoMapa = this.altoMapa++;
                    var simbolo = linea[j];
                    var x = 32/2 + j * 32; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }
    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "G":
                var gallina = new Gallina(x, y);
                gallina.y = gallina.y - gallina.alto/2;
                this.gallinas.push(gallina);
                this.espacio.agregarCuerpoDinamico(gallina);
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_invisible, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "+":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.cultivable=true;
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case ".":
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case ",":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case "S":
                var bloque = new Bloque(imagenes.bloque_arena, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case "W":
                var bloque = new Bloque(imagenes.bloque_agua, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case "-":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //Suelo
                var bloque = new Bloque(imagenes.bloque_tierra, x+32,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //Muro
                var bloque = new Bloque(imagenes.muro_arriba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);

                break;
            case "F":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_tierra, x+32,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.muro_arribaIzquierda, x+16,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "T":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.muro_arribaDerecha, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "\\":
                //suelo
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.muro_derecha, x+16,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "/":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.muro_izquierda, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "A":
                var bloque = new Bloque(imagenes.playa, x,y+32);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "E":
                var bloque = new Bloque(imagenes.estanque, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "B":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //c aja
                var bloque = new Bloque(imagenes.caja, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                this.caja=bloque;
                break;
            case "V":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //c aja
                var bloque = new Bloque(imagenes.vendedora, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                this.vendedora=bloque;
                break;

            case "C":
                //Suelo
                var bloque = new Bloque(imagenes.bloque_hierba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //Suelo
                var bloque = new Bloque(imagenes.bloque_hierba, x+32,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                //Suelo
                var bloque = new Bloque(imagenes.bloque_hierba, x+64,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                var bloque = new Bloque(imagenes.casa, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                //Entrada
                var bloque = new Bloque(imagenes.test, x+16,y+5);
                bloque.y = bloque.y - bloque.alto/2;
                this.casa=bloque;
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    procesarControles( ){
        //herramienta
        if(controles.herramienta!=0){
            switch (controles.herramienta) {
                case herramientas.mazo:
                    this.selector.x=480*0.43;
                    this.jugador.herramienta=herramientas.mazo;
                    break;
                case herramientas.azada:
                    this.selector.x=480*0.5;
                    this.jugador.herramienta=herramientas.azada;
                    break;
                case herramientas.semilla:
                    this.selector.x=480*0.57;
                    this.jugador.herramienta=herramientas.semilla;
                    break;
            }
        }
        //accion
        if (  controles.accion ){
            var nuevaAccion = this.jugador.accion();
            if ( nuevaAccion != null ) {
                this.accionJugador = nuevaAccion;
            }
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        }else if ( controles.moverY < 0){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }


}
