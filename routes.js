var fs = require('fs');

exports.handler = function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Messsage</title></head>');
    res.write(
      `<body>
        <form action="/message" method="POST">
            <input type="text" name="message"/>
            <button type="submit">Submit</button>
        </form>
      </body>`
    );
    res.write('</html>');
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    var body = [];
    req.on('data', function getChuck(chuck) {
      console.log(chuck);
      body.push(chuck);
    });
    req.on('end', function parsedBody() {
      var parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      var message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('Hello World!');
    res.end();
  }
};
