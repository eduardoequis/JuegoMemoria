let $tablero = $("#tablero");
let $cartas = $("#cartas");
let cartasEnJuego = [];
let turno = 0;
let paresDescubiertos = 0;
let $primeraCartaAbierta = " "
let $segundaCartaAbierta = " "
let dificultad = 0; // La dificultad determina la cantidad de PARES de cartas.
let $contador = $("#contador")
let conteoJugadas = 0;

let Carta = function(nombre, imagen, descripcion) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.descripcion = descripcion;
}

Carta.prototype.constructor = Carta;

let todasLasCartas = [
    new Carta("LET y CONST", "img/let.png", "Al declarar una variable hay que usar siempre LET y CONST. ¡Nunca VAR!"),
    new Carta("IGUAL", "img/igual.png", " '===' compara si ambos elementos son estrictamente iguales, tanto su valor como su tipo."),
    new Carta("COMPARACIÓN ESTRICTA", "img/compara1.png", " '&&' compara dos condiciones y regresa 'true' sólo si ambos son verdaderos."),
    new Carta("COMPARACIÓN", "img/compara2.png", "|| regresa 'true' si cualquier condición es verdadera; pero si ambas son falsas regresa 'false'"),
    new Carta("READY", "img/ready.png", "Con jQuery siempre evaluar la carga del documentousando '$( document ).ready()'"),
    new Carta("$", "img/jquery.png", "El nombre de una variable con elementos jQuery debe comenzar con $. Por ejemplo: $Variable."),
    new Carta("LÍNEA", "img/call.png", "La llamada a una librería jQuery debe estar antes que cualquier otra llamada de script."),
    new Carta("MEDIDAS RESPONSIVE", "img/responsive.png", "En diseño responsive conviene usar medidas relativas: '%' para contenedores, 'em' para textos. "),
]

// Duplica las cartas que se usarán el juego. 
// A futuro: Agregar dificultad.
function duplicarCartas(cartas) {

    for (j = 0; j < 2; j++) {
        for (i = 0; i < dificultad; i++) { // CAMBIE CARTAS.LENGTH x DIFICULTAD
            cartasEnJuego.push(cartas[i])
        }
    }
    return cartasEnJuego
}

// Mezcla el total de cartas que se usarán en juego
// Shuffle function from http://stackoverflow.com/a/2450976
function mezclarCartas(arrayCartas) {
    for (i = 0; i < arrayCartas.length; i++) {
        nuevaPosicion = Math.floor(Math.random() * (i + 1));
        valorActual = arrayCartas[i];
        arrayCartas[i] = arrayCartas[nuevaPosicion];
        arrayCartas[nuevaPosicion] = valorActual;
    }
    return arrayCartas
}

function colocarCartas(cartas) {

    for (i = 0; i < dificultad * 2; i++) {
        let $nuevaCarta
        $nuevaCarta = $("<div class='espacio_carta'> <div class='carta'> <div class='lado cerrado'> </div> <div class='lado abierto'><img src=" + cartas[i].imagen + "><p>" + cartas[i].descripcion + "</p> </div></div></div>")
        $tablero.append($nuevaCarta);
    }


    $cartas = $(".carta")

    $cartas.click(function() {
        if ($(this).hasClass("carta girada") === false) {
            //La carta está cerrada y se abre. 
            abrirCarta(this)
        } else {
            // La carta está abierta.
        }
    })
}



function abrirCarta(carta) {

    if (turno === 1) {
        $segundaCartaAbierta = $(carta);
        $(carta).addClass("girada")
        turno++
        conteoJugadas++
        $contador = $contador.text('Turnos: ' + conteoJugadas);
        compararCartas($primeraCartaAbierta, $segundaCartaAbierta)
    } else if (turno === 0) {
        $primeraCartaAbierta = $(carta);
        $(carta).addClass("girada")
        turno++
    }
    console.log(turno)

}

function compararCartas(carta1, carta2) {
    if (turno === 2) {
        if ($(carta1).find("img").attr("src") === $(carta2).find("img").attr("src")) {
            console.log("IGUALES")
            $(carta1).find(".abierto").css('background-color', '#DAC4F7')
            $(carta2).find(".abierto").css('background-color', '#DAC4F7')
            carta1 = " ";
            carta2 = " ";
            turno = 0;
            paresDescubiertos++
            revisarQueGano()
        } else {
            console.log("ERROR")
            setTimeout(
                function() {
                    $(carta1).removeClass("girada")
                    $(carta2).removeClass("girada")
                    carta1 = " ";
                    carta2 = " ";
                    turno = 0;
                }, 2000)


        }
    }
}


function revisarQueGano() {
    if (paresDescubiertos === dificultad) {
        setTimeout(
            function() {
                alert("¡Ganaste!")
            }, 1500)
    }
}

// Selección de Dificultad e Inicio del Juego.

$dificultad = $("#dificultad")
$comenzar = $("#comenzar")

$comenzar.click(function() {
    dificultad = parseInt($("#dificultad option:selected").val())
    if (dificultad !== 0) {
        mezclarCartas(duplicarCartas(todasLasCartas))
        colocarCartas(cartasEnJuego)
        $comenzar.hide()
        $dificultad.hide()
        $contador.show()
    } else {
        alert("¡Selecciona primero una dificultad!")
    }
})

/*
<div class='espacio_carta'>
                <div class='carta'>
                    <div class='lado cerrado'>
                            <p>CERRADA</p>
                    </div>
                    <div class='lado abierto'>
                            <p>ABIERTA</p>
                    </div>
                </div>
            </div>
*/