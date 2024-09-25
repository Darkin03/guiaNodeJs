const http = require('node:http')
const fs = require('node:fs')

const { puertoDisponible } = require('./freePort')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  switch (req.url) {
    case '/':
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hola mundo')
      break
    case '/saludo':
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      fs.readFile('./saludo.text', 'utf-8', (err, data) => {
        if (err) {
          res.statusCode = 500
          res.end('<h2>No se pudo encontrar los recurso correspondientes</h2>')
        } else {
          res.end(`<h2>${data}</h2>`)
        }
      })
      break
    default:
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Not Found')
      break
  }
}

const server = http.createServer(processRequest)

puertoDisponible(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
  })
})
