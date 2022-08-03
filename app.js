
const cuadricula = document.querySelectorAll('.cuadricula');
const mole = document.querySelector('.mole');
const puntuacion = document.querySelector('#score');
const tiempoQueda = document.querySelector('#time-left');
const golpe = document.querySelector('.golpe');

let result = 0;
let PomPosition;
let tiempoRestante = 60;
let tiempoId = null;
let randomCuadricula

/*------------------------------------------------------------------------------------------
-----------------------** 3) DAR LAS POSICIONES RANDOM DEL TOPO ----------------------------
-------------------------------------------------------------------------------------------*/

function RandomCuadricula() {
    cuadricula.forEach(cuadra => {
        //esto es para limpiar los cuadrados en caso tenga el topo
        cuadra.classList.remove('mole');
        // clase mole es la que contiene al topo
    });
    //CUADRADO ALEATORIO 
    randomCuadricula = cuadricula[Math.floor(Math.random()* 9 )];
    // agrega el topo en ese cuadrado que dio random

    //añadimos el topo en la cuadricula ramdom
    randomCuadricula.classList.add('mole');

    ///LA POSICION ACTUAL DEL TOPO DONDE SE TIENE QUE GOLPEAR
    PomPosition = randomCuadricula.id;
}

const borrado = () => {
    cuadricula.forEach(cuadra => {
        //esto es para limpiar los cuadrados en caso tenga el topo
       
        cuadra.classList.remove('golpe');
        
        // clase mole es la que contiene al topo
    })

}

//----------------- ESCUCHAR LA ACCION DEL MOUSE -------------------------------------------
cuadricula.forEach(cuadra => {
    cuadra.addEventListener('mousedown', () => {

        //----------- PUNTUACION ------------------------------------------------------------
        if(cuadra.id == PomPosition) {
            let golpes= cuadra.id;
            result++;
            puntuacion.textContent = result;
            cuadra.classList.remove('mole');
            cuadra.classList.add('golpe');

            //HAY QUE HACER QUE LA POSICION DEL TOPO SEA NULA HASTA QUE SE GENERE OTRA POSICION ALEATORIA
            PomPosition = null;
            setInterval(borrado, 850)
        }
        
    });
})



/*------------------------------------------------------------------------------------------
-----------------------** 2) INTERVALO DE EJECUCION RANDOM CUADRICULA ----------------------
-------------------------------------------------------------------------------------------*/

function moverMole() {
    //SE VA A EJECUTAR RAMDON SQUARE EN MEDIO SEGUNDO DE INTERVALO
    tiempoId = setInterval(RandomCuadricula, 900);
}

/*------------------------------------------------------------------------------------------
-----------------------** 4) DAR LAS POSICIONES RANDOM DEL TOPO ----------------------------
-------------------------------------------------------------------------------------------*/

function tiempoRest() {
    //RESTAR EL TIEMPO DEL JUEGO 
    tiempoRestante--;
    tiempoQueda.textContent = tiempoRestante;
    //SI EL TIEMPO LLEGA A 0


    if(tiempoRestante == 0) {
        //BORRAMOS EN TIEMPO
        clearInterval(tiempoId);
        clearInterval(cuentaAtrasId);

        // PONEMOS DE NUEVO EL BOTON DE INICIO CUANDO ES TIEMPO ES 0
        document.getElementById('btnIniciar').style.display = "block";
        ///MOSTAR EN PANTALLA LA PUNTUACION 
        alert("GAME OVER! Puntuación: " + result);
        tiempoRestante = 60;
    }
}



/*------------------------------------------------------------------------------------------
----------------------------------** 1) FUNCION INICIA EL JUEGO ----------------------------
-------------------------------------------------------------------------------------------*/
let cuentaAtrasId;

function Game() {
    //INTERVALOS DE 1 SEGUNDO
    cuentaAtrasId = setInterval(tiempoRest, 1000);
    moverMole();
    //EL BOTON DESAPRECE CUANDO EMPIEZA EL JUEGO

    //añadimos el estylo de display:none
    document.getElementById('btnIniciar').style.display = "none";
}