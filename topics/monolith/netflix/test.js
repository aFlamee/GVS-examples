const App = require("./app.js");
const app = new App();

// login a user
console.log();
console.log("login a user");
let session = app.auth.login("alice@mail.com", "secret");
console.log(session);

// display user feed
console.log();
console.log("display user feed");
let feed = app.feed.show(session.id);
console.log(feed);
