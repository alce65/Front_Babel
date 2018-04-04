(function(){

    var logElement = document.getElementById('log');
    window.addEventListener("message", function(event) {
        var logEntry = document.createElement('p');
        logEntry.innerHTML = event.data.message + ' [from: ' + event.origin + "]";
        logElement.appendChild ( logEntry) ;
    }, false) ;
})()



