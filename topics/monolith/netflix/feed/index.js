const auth = require("../auth/index.js");
const friend = require("../friend/index.js");
const post = require("../post/index.js");

exports.init = () => {};

// show feed for a logged in user
exports.show = (sessionId) => {
  console.log("trace feed.show");

  // check session
  const validUser = auth.checkSession(sessionId);
  if (!validUser) {
    return false;
  }

  // friend
  const friends = friend.findAll(validUser);

  // posts
  const posts = post.latestForUsers(friends);

  return posts;
};
