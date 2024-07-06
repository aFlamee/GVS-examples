const net = require("net");
const readline = require("readline");

// create new server
const server = net.createServer();

// log errors
server.on("error", (err) => {
  console.error(err);
});

let clients = [];
//New Client connected. Now add him to the list and listen to a message event.
server.on("connection", (client) => {
  console.log("client connected", client.address());
  clients.push(client);
  
  //A new message was sent by a user. Print the final string here!
  let rl = readline.createInterface(client, client);
  rl.on("line", (data) => {
    try {
      let message = JSON.parse(data);

      //Send the final string to all users in list.
      clients.forEach(element => {
        let allmessage = { "finalMessage": ""+message["sent"] + " " + message["name"] +": " + message["message"] };
        element.write(JSON.stringify(allmessage) + "\n");
      });

    } catch (e) {
      console.log("invalid message encoding");
    }
  });
});

// listen on port 3333
server.listen({ host: "0.0.0.0", port: 3333 }, () => {
  console.log("server listening on 0.0.0.0:3333");
});
