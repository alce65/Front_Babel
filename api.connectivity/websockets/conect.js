let socket = new WebSocket('ws://localhost:8085')
socket.onopen = function(){
    alert("Socket has been opened!");
}