const http = require('node:http')
const { puertoDisponible } = require('./freePort')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Nueva conexión')
  res.end('Hola Mundo')
})

puertoDisponible(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto localhost://${port}`)
  })
})
