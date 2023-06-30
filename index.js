const express = require('express')
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT || 5001
const store = {
  1: {
    test: 'test'
  }
}
express()
  .use(cors({
    origin: '*'
  }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/stub/:id', (req, res) => {
    if (req.params.id) {
      res.send(store[req.params.id])
    } else {
      res.send(store)
    }
  })

  .post('/stub/', (req, res) => {
    const id = Math.floor((Math.random() * 1000000000) + 1)
    store[id] = req.body
    res.send({
      id: id,
      data: store[id],
      params: req.body
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
