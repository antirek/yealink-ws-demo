const WebSocket = require('ws');

const wss_phone = new WebSocket.Server({ port: 3007 });

let phone, browser;


wss_phone.on('connection', function connection(ws) {
  phone = ws;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    browser.send(message)
  });
  
  ws.send('phone connection');
});


const wss = new WebSocket.Server({ port: 3006 });

wss.on('connection', function connection(ws) {
  browser = ws;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    phone.send(message);
  });

  ws.send('browser connection');
});