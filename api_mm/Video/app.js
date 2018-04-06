function main () {
    const maximo = 600; // ancho total en px de la barra de progreso, definido en css 
    let oMedio = document.querySelector('#medio'); //objeto video; JQuery no soporta <vidoe> pero almacena los datos del nodo DOM como elelmento [0] del array que crea
    let oReproducir = document.querySelector('#reproducir'); //objeto boton reproducir
    let oBarra = document.querySelector('#barra'); // objeto barra de progreso
    //var oProgreso = document.querySelector('#progreso'); // objeto "progreso": el interior coloreado de la barra de progreso

    oReproducir.addEventListener('click', clicReproducir)
    oBarra.addEventListener('click', clicBarra)

    function clicReproducir () {

        if(!oMedio.paused && !oMedio.ended) {
            //paramos el vídeo
             oMedio.pause();
             oReproducir.value = 'Reproducir';
             window.clearInterval(bucle);
         }else{
             //reproducimos el video
             oMedio.play();
             oReproducir.value = 'Pausa';
             var bucle = window.setInterval(estado, 1000);
             // cada segundo ejecuto la función estado, que pintará la barra de estado
             // bucle corresponde al identificator del setInterval
         }	 
    }; // fin de la funcion clicReproducir, manejadora de click en el boton

    function clicBarra (e) {
        if(!oMedio.paused && !oMedio.ended) {
             //si el video se esta reproduciendo
             var ratonX = e.pageX - oBarra.offsetLeft;
             // valor en x de la barra: x(raton) - x(inicio barra) 
             var nuevoTiempo = ratonX * oMedio.duration/maximo;
             // valor x en segundos  x * t / x(maximo)
             oMedio.currentTime = nuevoTiempo;
             // cambio de tiempo del video
             oBarra.value = ratonX;
             // cambio de aspecto de la barra
        }
    }; // fin de la funcion clicBarra, manejadora de click en la barra

    function estado(){
        if(!oMedio.ended){
            // si continua la reproducción
            var total=parseInt(oMedio.currentTime * maximo/oMedio.duration);
            //paso el curretTime a pixels
            oBarra.value = total;
            // actualizo el aspecto de la barra
        }else{
            oBarra.value = 0;
            // actualizo el aspecto de la barra
            oReproducir.value = 'Reproducir';
            // actualizo el aspecto del boton
            window.clearInterval(bucle);
            // termino con la ejecución repetida de la función
        };
    }; // Fin de la función estado()

}; // fin de la funcion main()



window.addEventListener("load",main,false);