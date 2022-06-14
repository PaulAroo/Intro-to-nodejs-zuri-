const http = require("http")
const url = require("url")
const fs = require("fs")

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url, true)
  const filename = `.${pathname}.html`

  if (pathname === '/') {
    fs.readFile('./home.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      return res.end()
    })
  }
  else if(pathname === '/home') {
    res.writeHead(302, {
      location: "http://localhost:3030/",
    });
    return res.end()
  }
  else {
    fs.readFile(filename, (err, data) => {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write("<h2>404, Page not found</h2>")
        return res.end()
      }
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      return res.end()
    })
  }
})

server.listen(3030, (err) => {
  if(err) console.error(err)
  else console.log("server has started on port 3030")
})