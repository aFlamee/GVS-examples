const auth = require("./auth/index.js");
const user = require("./user/index.js");
const feed = require("./feed/index.js");
const friend = require("./friend/index.js");
const post = require("./post/index.js");

module.exports = class App {
  constructor() {
    // list of modules
    this.modules = {
      auth: auth,
      user: user,
      feed: feed,
      friend: friend,
      post: post,
    };

    // init all modules
    this.init();
  }

  init() {
    console.log("modules:");
    for (const name in this.modules) {
      const module = this.modules[name];
      this[name] = module;
      console.log("-", name);
      module.init();
    }
    console.log("ready");
  }
};
