const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');

//app.get('/', (req, res) => res.send('Hello World!'))

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3007/');

ws.on('open', function () {
  ws.send('something');
});

ws.on('message', function (data) {
  console.log(data);

  let number = data;
  let url = 'http://admin:admin@192.168.241.41/servlet?number=' + number + '&outgoing_uri=2';
  axios.get(url)
      .then((response) => {
          console.log(response)
      });
});

app.get('/event/:id', (req, res) => {
    res.send('OK');
    console.log('get', req.query);
    console.log('param', req.params.id);
    
    ws.send(JSON.stringify({event: req.params.id, data: req.query}));
})

app.post('/event', (req, res) => {
    res.send('OK');
    console.log('post', req.body);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
})
