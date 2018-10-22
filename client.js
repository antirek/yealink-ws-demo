const express = require('express')
const app = express()
const port = 3000


//app.get('/', (req, res) => res.send('Hello World!'))

var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
var conn;

client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    conn = connection;

    connection.on('error', (error) => {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', () => {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});
 
client.connect('ws://localhost:3005/', 'echo-protocol');

app.get('/event/:id', (req, res) => {
    res.send('OK');
    console.log('get', req.query);
    console.log('param', req.params.id);
    
    conn.sendUTF(JSON.stringify({event: req.params.id, data: req.query}));
})


app.post('/event', (req, res) => {
    res.send('OK');
    console.log('post', req.body);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
})
