const express = require('express')
const app = express()
const port = 3010

const keys = require('./action_uri')


app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {title: 'Hello World!', keys});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})