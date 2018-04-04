function main() {
    let oProceso;
    let i
    let aDomBotons = document.querySelectorAll("button");
    for (i = 0; i < aDomBotons.length; i++) {
        aDomBotons[i].addEventListener("click", primos, false);
    }
    aDomBotons[1].disabled = true;

    function primos(oEvent) {
        if (oEvent.target.id == "btn1") {
            oProceso = new Worker("worker.js")
            oProceso.postMessage(i)
            var domNumeros = document.querySelector("article p span");
            oProceso.addEventListener('message', oEvent => domNumeros.innerHTML = oEvent.data, false )
            /* oProceso.onmessage = function (oEvent) {
                domNumeros.innerHTML = oEvent.data;
            } */
            aDomBotons[0].disabled = true;
            aDomBotons[1].disabled = false;
        } else {
            if (oProceso) {
                oProceso.terminate();
                aDomBotons[0].disabled = false;
                aDomBotons[1].disabled = true;

            }
        };
    }; // Fin de primos()

}; // Fin de main()

document.addEventListener("DOMContentLoaded", main, false);
