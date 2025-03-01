// Create web server that can accept a POST request and save the comment to a file
// The file should be named comments.txt and each new comment should be added to a new line
// The server should respond with the updated list of comments

const http = require('http')
const fs = require('fs')

const commentsFile = 'comments.txt'

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/comments') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      fs.appendFile(commentsFile, body + '\n', (err) => {
        if (err) {
          res.statusCode = 500
          res.end('Error saving comment')
          return
        }
        fs.readFile(commentsFile, 'utf8', (err, data) => {
          if (err) {
            res.statusCode = 500
            res.end('Error reading comments')
            return
          }
          res.end(data)
        })
      })
    })
  } else {
    res.statusCode = 404
    res.end('Not found')
  }
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})