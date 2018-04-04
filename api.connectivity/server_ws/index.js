var WebSocketServer = require( 'ws' ).Server;
var wss = new WebSocketServer({port: 8085});
wss.on('connection', function(ws) {
    ws.on('message', (message) => {
        console.log(' received: %s ', message) ;
        setTimeout(() => {
            console.log(' resending: %s ', message) 
            ws.send(`Hola ${message}`)
        }, 500);
    });
	ws.send('something') ;
});

