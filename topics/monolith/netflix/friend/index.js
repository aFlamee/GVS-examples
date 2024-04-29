const db = require("./db.js");
const user = require("../user/index.js");

exports.init = () => {
  db.addFriend("alice", "bob");
  db.addFriend("alice", "eve");
};

// returns a list of friends for a user
exports.findAll = (sourceUser) => {
  console.log("trace friend.findAll");

  const ids = db.findFriends(sourceUser.id);

  return user.findMany(ids);
};
