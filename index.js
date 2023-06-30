const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001
const store = {
  1: {
    test: 'test'
  }
}
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/stub/:id', (req, res) => {
    res.send(store[req.params.id])
  })

  .post('/stub/', (req, res) => {
    const id = Math.floor((Math.random() * 1000000000) + 1)
    store[id] = req.params
    res.send({
      id: id
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
