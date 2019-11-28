

var entradas = {}; // tipos
entradas.teclado = 2;
var entrada = entradas.teclado;


var nivelActual = 0;
var nivelMaximo = 1;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.accion = 3;

var herramientas = {};
herramientas.mazo=1;
herramientas.azada=2;
herramientas.semilla=3;

var estadosCultivos = {};
estadosCultivos.vacio=1;
estadosCultivos.plantado=2;
estadosCultivos.creciendo1=3;
estadosCultivos.creciendo2=4;
estadosCultivos.crecido=5;


var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
orientaciones.arriba = 4;
orientaciones.abajo = 5;
