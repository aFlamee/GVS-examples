const http = require('http');
const net = require('net');


let data = {
    "todos": [
        "Clean Bycicle",
        "Buy Milk"
      ],
      "created": 1676459827754


}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }); 

  
server.listen(8000);