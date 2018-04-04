function main() {
    // array para los workers
    var aProcesos = [];
    // Nodos de los controles de formulario 
    var aDomBotons = document.querySelectorAll("button");
    var domWorkers = document.querySelector("#workers")
    // Lineas HTML para cada worker (inicialmente 2)
    var aDomNumeros;
    var nWorkers = 2
    preparaRespuestas(nWorkers);

    //manejadores de eventos para los botones
    for (var i = 0; i < aDomBotons.length; i++) {
        aDomBotons[i].addEventListener("click", primos, false);
    };
    aDomBotons[1].disabled = true;

    //manejador de ventos para el range
    domWorkers.addEventListener("change", function () {
        nWorkers = domWorkers.value;
        preparaRespuestas(nWorkers);
    }, false)

    // Fin del código de main() ************************************** 

    function preparaRespuestas(n) {
        var domRespuestas = document.querySelector("article div");
        domRespuestas.innerHTML = "";
        for (i = 0; i < n; i++) {
            domRespuestas.innerHTML +=
            "<p>Números primos calculados hasta <span></span></p>";
        }
        aDomNumeros = document.querySelectorAll("article div p span");
    }

    function primos(oEvent) {
        if (oEvent.target.id == "btn1") {
            for (var i = 0 ; i < nWorkers; i++) { 
                aProcesos[i] = new Worker("worker_s.js")
                aProcesos[i].postMessage(i);
                aProcesos[i].onmessage = function (oEvent) {
                   aDomNumeros[oEvent.data[0]].innerHTML = oEvent.data[1];
                };
            };
            aDomBotons[0].disabled = true;
            aDomBotons[1].disabled = false;
            domWorkers.disabled = true;
        } else {
            for (var i = 0 ; i < nWorkers; i++) {
                aProcesos[i].terminate();
            };
            aDomBotons[0].disabled = false;
            aDomBotons[1].disabled = true;
            domWorkers.disabled = false;
        };
    }; // Fin de primos()

}; // Fin de main()

document.addEventListener("DOMContentLoaded", main, false);
