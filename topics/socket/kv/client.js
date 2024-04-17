const net = require("net");
const readline = require("readline");

// create new connection
const client = net.createConnection({
  host: "127.0.0.1",
  port: 3333,
});

// log errors
client.on("error", (err) => {
  console.error(err);
});

// handle new connections from clients
client.on("connect", () => {
  console.log("client connected");
  console.log("Do you want to set or get values?")
  console.log("Please write without space. Split the Commands with a comma")

  let stdin = process.openStdin();

  stdin.addListener("data", function(line) {
    let splitedString = line.toString().trim().split(",")

    let getKeyValue = { 
      "action" : splitedString[0],
      "key" : splitedString[1],
      "value" : splitedString[2]
    };

    client.write(JSON.stringify(getKeyValue) + "\n");
  });

  let rl = readline.createInterface(client, client);
  rl.on("line", (data) => {
    try {
      let message = JSON.parse(data);
      console.log(message);
    } catch (e) {
      console.log("invalid message encoding");
    }
  });
});
