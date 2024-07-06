
const net = require("net");
const http = require("https");


const Request = class Request{
    constructor(socket,method,headers,body){
        this.socket= socket;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }


    createRequest(){
        let request = `${this.method} / ${this.headers} ${this.body}`;

        this.socket.write(request);
    }


}

const Response = class Response{
    constructor(socket){
        this.socket= socket;
        this.headers = {};
        this.body = "";
        this.status = "";
        this.data = "";
    }


    getResponse(){
        this.socket.on("data",(data) =>{
            this.data = data;
            this.parse()
        })

    }

    parse(){
        const lines = httpResponse.split("\r\n");
    
        
        const statusLine = lines[0].split(" ");
        if (statusLine.length >= 2) {
          this.status = statusLine[1]; 
        }
    
       
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line ==="") {
            
            break;
          }
          const headerParts = line.split(":");
          if (headerParts.length === 2) {
            const headerName = headerParts[0].trim();
            const headerValue = headerParts[1].trim();
            this.headers[headerName] = headerValue;
          }
        }
    
        
        const bodyStart = lines.indexOf("") + 1;
        
        
        this.body = lines.slice(bodyStart).join("\r\n ");


    }
}



function request(url, headers, body){

    const client = net.createConnection(url.split(":"));

    const request = new Request(client,"GET",headers,body);
    const response = new Response(client);

    client.on("connect", () => {
        request.createRequest("GET", "/", headers, body);
      });

      client.on("data", (data) => {
        response.data += data
        response.parse();
      });
  
      client.on("end", () => {
        resolve(response);
      });
  
      client.on("error", (err) => {
        reject(err);
      });
    }
  




