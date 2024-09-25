const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      fs.readFile('./dialogo.txt', 'utf-8', (err, data) => {
        if (err) {
          res.statusCode = 500
          res.end('<h2>No se pudo encontrar los recurso correspondientes</h2>')
        } else {
          res.end(`<h2>${data}</h2>`)
        }
      })
      break
    case 'POST': {
      res.statusCode = 200
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      req.on('end', () => {
        fs.writeFile('./dialogo.json', body, err => {
          if (err) {
            res.statusCode = 500
            res.end('<h2>No se pudo guardar el recurso correspondiente</h2>')
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json;charset=utf-8' })
            res.end('<h2>Recurso guardado correctamente</h2>')
          }
        }
        )
      })

      break
    }
    default:
      res.statusCode = 404
      res.setHeader('Content-type', 'text/html; charset=utf-8')
      res.end('<h1>Not Found</h1>')
  }
})

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en http://localhost:${desiredPort}`)
})
