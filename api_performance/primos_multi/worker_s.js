function esPrimo(userNumero, aDivisores) {
    var esPrimo = true;
    for (var j = 2; j < userNumero; j++) {
        if (userNumero % j == 0) {
            esPrimo = false;
            //aDivisores[aDivisores.length] = j;
             break;
        } // Fin del if
    } // Fin del for
    return esPrimo;
} // Fin de la función

var nWorker;
onmessage = function (oEvent) {
    nWorker = Number(oEvent.data);
    // Esperamos al primer mensaje de la web
    // que inicializa un valor identificativo del worker (su número)
    // para depues iniciar un bucle sin fin
    var i = 1;
    while (true) {
        i++
        if (esPrimo(i)) {
            postMessage([nWorker, i])
            // Con cada número primo encontrado, el worker envía un mensaje,
            // con su número identidicador y el número primo encontrado
            console.log(i)
        }
    }
};
