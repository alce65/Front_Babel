(function() {
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
    
    // bucle sin fin calculando números primos
    
    let i = 1;
    postMessage('primosStert');
    while (true) {
        i++
        if (esPrimo(i)) {
            postMessage(i);
            // Con cada número primo encontrado, el worker envía un mensaje,
            // con su número identidicador y el número primo encontrado
            console.log(i)
        }
    }; // Fin del bucle
    postMessage('primosEnd');
})()


