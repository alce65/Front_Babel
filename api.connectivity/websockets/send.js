(function() {
    window.addEventListener('load', app, false)

    function app() {
        let socket = new WebSocket('ws://localhost:8085')
        let eBoton = document.querySelector('#btnSend')
        let eInput = document.querySelector('#nptName')

        eBoton.addEventListener('click', btnSend)
        connect()

        function btnSend () {
            let data = eInput.value || 'Pepe'
            socket.send(data)
        }

        function connect() {
            socket.onopen = function(){
                console.log("Socket has been opened!");
            }
        } // FIn de la función connect
    }

})()

