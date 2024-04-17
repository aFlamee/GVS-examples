const net = require("net");
const { userInfo } = require("os");
const readline = require("readline");

// create new connection
const client = net.createConnection({
  host: "127.0.0.1",
  port: 3333,
});

const username = process.argv[2];
const crypto = require("crypto");

if (!username) {
  console.error('Please provide a username. Usage: node client.js <username>');
  process.exit(1);
}

// log errors
client.on("error", (err) => {
  console.error(err);
});

// handle new connections from clients
client.on("connect", () => {
  console.log(`Starting client for user: ${username}`);

  var stdin = process.openStdin();

  //Read terminal line from user and send it to server
  stdin.addListener("data", function(line) {
    //Create new id for each new Client.
    const id = crypto.randomBytes(8).toString("hex");
    let getMessage = { 
      "name" : username,
      "sent" : id,
      "message": line.toString().trim()
    };

    client.write(JSON.stringify(getMessage) + "\n");
  });

  //If a message was sent by the server. print it here!
  let rl = readline.createInterface(client, client);
  rl.on("line", (data) => {
    try {
      let message = JSON.parse(data);
      console.log(message["finalMessage"])
    } catch (e) {
      console.log("invalid message encoding");
    }
  });

});
