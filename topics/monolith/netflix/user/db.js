// indexes
const userById = {};
const userByMail = {};

exports.addUser = (user) => {
  userById[user.id] = user;
  userByMail[user.mail] = user;
};

exports.findUserByMail = (mail) => {
  return userByMail[mail];
};

exports.findUserById = (id) => {
  return userById[id];
};
