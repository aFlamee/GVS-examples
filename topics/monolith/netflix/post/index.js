const Post = require("./post.js");
const db = require("./db.js");

// seed some users to begin with
exports.init = () => {
  db.addPost(new Post("bob", "This is my first post", "http://image.png"));
  db.addPost(new Post("bob", "This is my second post", "http://image.png"));
  db.addPost(new Post("eve", "Hello World", "http://image.png"));
  db.addPost(new Post("alice", "Nice Food", "http://image.png"));
};

// check mail and password and create a session
exports.latestForUsers = (users) => {
  console.log("trace post.latestForUsers");

  return users.map((user) => {
    let post = db.findLatestPostByUserId(user.id);
    post.user = user;
    return post;
  });
};
