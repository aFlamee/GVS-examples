const User = require("./user.js");
const db = require("./db.js");

// seed some users to begin with
exports.init = () => {
  db.addUser(new User("alice", "Alice", "alice@mail.com", "secret"));
  db.addUser(new User("bob", "Bob", "bob@mail.com", "geheim"));
  db.addUser(new User("eve", "Eve", "eve@mail.com", "supersecret"));
};

// check mail and password and create a session
exports.checkPassword = (mail, password) => {
  console.log("trace user.checkPassword");

  // find user
  const user = db.findUserByMail(mail);
  if (!user) {
    return false;
  }

  // check password
  const valid = user.checkPassword(password);
  if (!valid) {
    return false;
  }

  return user;
};

// find user by user id
exports.find = (userId) => {
  console.log("trace user.find");

  // find user
  const user = db.findUserById(userId);
  if (!user) {
    return false;
  }

  return user;
};

// find users by user ids
exports.findMany = (userIds) => {
  console.log("trace user.findMany");

  return userIds.map((id) => {
    return exports.find(id);
  });
};
