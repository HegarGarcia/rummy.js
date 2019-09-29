"use strict";

//Array para guardar cada uno de los objetos (fichas) necesarios para inicializar los juegos de todos los jugadores, y comer:
const deckFichas = [];

//Array para guardar las jugadas ya puestas en la mesa.
const deckJugadas = [];

//Variables globales de conteo.
//"i" es para la cantidad de colores de fichas, y sirve también para buscar dentro de un array que tiene strings de dichos colores.
//"j" es para repetir cada juego de trece fichas 2 veces, ya que, de cada color, existen 2 juegos de fichas.
//"k" es para el valor de cada ficha (1-13), que dobletea como valor de suma en algunos casos específicos.
var i, j, k;

//Clase para todas las fichas.
//"this.nombre" será utilizado únicamente por el comodín, y llevará ese nombre sin acento.
class Ficha {
  constructor(color, numero, nombre) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
  }
}

//Clase para el jugador.
class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.arregloFichas = deckFichas.splice(0, 14);
  }
}

/*Función para inicializar al jugador (en esto me quedé cuando lo subí Xd)
Se supone que el botón que en el HTML dice "Console.log del jugador" hará lo que se encuentra dentro de esta función.
Dicho botón debe de presionarse después de revolver y mostrar las piezas. De otra manera, no hará nada.
Básicamente lo que TIENE que hacer es:

    1)Hacer una nueva clase "jugador"
      1.1) Tendrá nombre.
      1.2) Las fichas se removerán del deck total y ahora serán propiedad del jugador.

    2)Interactuar con el resto del programa (cosa que aún no hace)
      2.1) El jugador podrá ver sus fichas, obviamente en el HTML.
*/

function inicializarJugador() {
  document.getElementById("deck").innerHTML = "";
  console.log(deckFichas);

  /*No sé exactamente cómo utilizar objetos en este caso. Es un caso diferente al del deck completo de fichas...
  Por cierto, da error en la consola. 
  De cualquier manera sé que está mal, ya que no asigna a variables dinámicas sino a una estática "jehs", lo cual ceba el multiplayer.
  Además de que hay problemas de scope que no pude resolver.*/
  var jehs = new Jugador("Jaime");

  shuffledDeckDisplay();
  playerDeckDisplay();
  console.log(jehs.arregloFichas);
  console.log(deckFichas);
}

//Función para mostrar el deck del jugador en la pantalla (aún no funciona como debe)
function playerDeckDisplay() {
  document.getElementById("deck").innerHTML += "<br>";
  for (i = 0; i < jehs.arregloFichas.length; i++) {
    if (deckFichas[i].nombre === "comodin") {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].nombre +
        '.png" style="max-width: 50px"> </img>';
    } else {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].color +
        deckFichas[i].numero +
        '.png" style="max-width: 50px"> </img>';
    }

    //Las fichas se mostrarán en múltiplos de 13.
    if ((i + 1) % 13 == 0) {
      document.getElementById("deck").innerHTML += "<br>";
    }
  }
}

//Función para inicializar el deck
function assignDeck() {
  var colores = ["negro", "azul", "amarillo", "rojo"];
  for (i = 1; i < 5; i++) {
    for (j = 1; j < 3; j++) {
      for (k = 1; k < 14; k++) {
        deckFichas.push(new Ficha(colores[i - 1], k));
      }
    }
  }
  while (i < 7) {
    deckFichas.push(new Ficha("", "", "comodin"));
    i++;
  }
}

/*Función para revolver todas las fichas.
fuente: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
function shuffle(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

//Función para mostrar todas las fichas ya revueltas en el HTML.
function shuffledDeckDisplay() {
  //Usar la siguiente línea de código para la comprobación del correcto display de los objetos:
  //console.log(deckFichas);

  //Si la ficha es un comodín, el proceso es un poco diferente ya que el objeto del comodín no comparte los mismos valores que el resto de las fichas.
  //Si la ficha es una de las otras, buscará la imagen que concuerde con los parámetros.
  for (i = 0; i < deckFichas.length; i++) {
    if (deckFichas[i].nombre === "comodin") {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].nombre +
        '.png" style="max-width: 50px"> </img>';
    } else {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].color +
        deckFichas[i].numero +
        '.png" style="max-width: 50px"> </img>';
    }

    //Las fichas se mostrarán en múltiplos de 12.
    if ((i + 1) % 13 == 0) {
      document.getElementById("deck").innerHTML += "<br>";
    }
  }
}

//Función que activará las funciones mencionadas al presionar el botón de "Revolver y mostrar" en el HTML.
function buttonPress() {
  //El siguiente console.log es solo para fines de comprobación.
  console.clear();

  //Vaciar el array para que no se agreguen objetos de más.
  deckFichas.splice(0, deckFichas.length);

  //Eliminar las fichas que estaban anteriormente en el HTML (si las había).
  document.getElementById("deck").innerHTML = "";

  //Asignar nuevamente el deck
  assignDeck();

  //Revolver el deck
  shuffle(deckFichas);

  //El siguiente console.log es solo para fines de comprobación.
  console.log(deckFichas);

  //Mostrar en el HTML todas las fichas revueltas.
  shuffledDeckDisplay();
}

/*  Función BASE para el desordenamiento de las fichas.
    Si algo sale mal, copiar este código y rehacer el desordenamiento.
    OJO: ESTE CÓDIGO NO HACE EL DESORDENAMIENTO, pero es posible usarlo como base para dicha función.
    UPDATE: Creo que ya no es necesario.

function displayAllCards() {
    document.getElementById("deck").innerHTML = "";
    var i, j, k;
    var colores = ["negro", "azul", "amarillo", "rojo"];
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 3; j++) {
            for (k = 1; k < 14; k++) {
                deckFichas.push(new Ficha(colores[i - 1], k));
                //console.log(deckFichas);
                var numeroFicha = k.toString();
                document.getElementById("deck").innerHTML +=
                    '<img src="images/' +
                    colores[i - 1] +
                    numeroFicha +
                    '.png" style="max-width: 50px"> </img>';
                if (k == 13) {
                    document.getElementById("deck").innerHTML += "<br>";
                }
            }
        }
    }
    while (i < 7) {
        deckFichas.push(new Ficha("", "", "comodin"));
        // console.log(deckFichas);
        document.getElementById("deck").innerHTML +=
            '<img src="images/comodin.png" style="max-width: 50px"> </img>';
        i++;
    }
}*/
