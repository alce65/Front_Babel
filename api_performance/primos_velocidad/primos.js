(function () {
	// Buscar número primos
	postMessage('primosSTART');
	var n = 1;
	postMessage(n);
	seguirBuscando: while (n < 100000) {
		n += 1;
		var max = Math.sqrt(n)
		for (var i = 2; i <= max; i += 1) {
			if (n % i == 0) {
				continue seguirBuscando;
			}
		}
		postMessage(n);
	}
	postMessage('primosEND');
}())