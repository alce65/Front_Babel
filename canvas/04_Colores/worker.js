onmessage = function (oEvent) {
    // oEvent.data corresponde a "size" para los recuadros
    cuadradosAleatorios(oEvent.data);
};

function randomRGBA() {
    var r = randInt(255);
    var g = randInt(255);
    var b = randInt(255);
    var a = Math.random();
    var rgba = [r, g, b, a].join(",");
    return "rgba(" + rgba + ")";
}

function randInt(limit) {
    var x = Math.random() * limit;
    return Math.floor(x);
}


function cuadradosAleatorios(size) {
    var aDatos = []
    for (var i = 0; i < 600; i += size) {
        aDatos[i] = [];
        for (var j = 0; j < 400; j += size) {
            aDatos[i][j] = randomRGBA();            
        }
    }
    postMessage(aDatos);
}



//function cuadradosAleatorios(size) {
//    for (i = 0; i < 600; i += size) {
//        for (j = 0; j < 400; j += size) {
//            aDatos = [i, j, randomRGBA()]
//            postMessage(aDatos)
//        }
//    }
//}

