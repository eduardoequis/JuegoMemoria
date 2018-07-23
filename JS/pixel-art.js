let $tablero = $("#tablero");

let Carta = function (nombre, imagen, id) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.id = id;
}



Carta.prototype.constructor = Carta;

let todasLasCartas = [
new Carta ("uno", "1", "uno"),
new Carta ("dos", "2", "dos"),
new Carta ("tres", "3", "tres"),
],


/*
function duplicarCartas (AAAA) {

    let cartasEnJuego = [],
    for (i = 0; i >= 2; i++){

    }
}



function mezclarCartas (todasLasCartas) {

    function mezclarCartas(arrayCartas) {
        for (i = arrayCartas.length - 1; i > 0; i--) {
            nuevaPosicion = Math.floor(Math.random() * (i + 1));
            valorActual = arrayCartas[i];
            arrayCartas[i] = arrayCartas[nuevaPosicion];
            arrayCartas[nuevaPosicion] = valorActual ;
        }
        return arrayCartas;
    }

}
*/
