// indexes
const friendsByUserId = {};

exports.addFriend = (userId, friendId) => {
  if (!friendsByUserId[userId]) {
    friendsByUserId[userId] = new Set();
  }
  friendsByUserId[userId].add(friendId);
};

exports.findFriends = (userId) => {
  if (!friendsByUserId[userId]) {
    return [];
  }
  return Array.from(friendsByUserId[userId]);
};
