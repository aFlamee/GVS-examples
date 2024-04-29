// indexes
const postById = {};
const postsByUserId = {};

exports.addPost = (post) => {
  postById[post.id] = post;

  if (!postsByUserId[post.userId]) {
    postsByUserId[post.userId] = [];
  }
  postsByUserId[post.userId].push(post);
};

exports.findPostById = (id) => {
  return postById[id];
};

exports.findLatestPostByUserId = (userId) => {
  const posts = postsByUserId[userId];
  if (!posts) {
    return false;
  }
  return posts[posts.length - 1];
};
