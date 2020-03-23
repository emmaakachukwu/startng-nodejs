const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body;
        req.on('data', data => {
            body = parse((data).toString());
        });
        req.on('end', () => {
            fs.writeFile('message.txt', body.message, function(error){
                error ? res.end(error) : res.end('Your file has been created');
            })
        });
    }
    else {
      res.end(`
        <!doctype html>
        <html>
        <body>
            <form action="/message" method="post">
                <input type="text" placeholder="Enter a message" name="message" required>
                <br>
                <button>Submit</button>
            </form>
        </body>
        </html>
      `);
    }
});
server.listen(8080);