const net = require("net");
const readline = require("readline");

// create new server
const server = net.createServer();

// log errors
server.on("error", (err) => {
  console.error(err);
});

const keyValueStore = {}
// handle new connections from clients
server.on("connection", (client) => {
  console.log("client connected", client.address());

  // handle each line of data coming in
  let rl = readline.createInterface(client, client);
  rl.on("line", (data) => {
    try {
      let message = JSON.parse(data);

      if (message["action"] === "get") {
        let storeVal = keyValueStore[message["key"]] ?? null;
        client.write(JSON.stringify({"action": "get", "value": storeVal }) + "\n");

      } else if (message["action"] === "set") {
        keyValueStore[message["key"]] = message["value"];
        client.write(JSON.stringify({ "action": "set", "key": message["key"], "value": message["value"] }) + "\n");
      }
    } catch (e) {
      console.error("Error parsing message: ", e.message);
      client.write(JSON.stringify({ "error": "invalid message encoding" }) + "\n");
    }
  });
});

// listen on port 3333
server.listen({ host: "0.0.0.0", port: 3333 }, () => {
  console.log("server listening on 0.0.0.0:3333");
});
