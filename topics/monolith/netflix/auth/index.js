const Session = require("./session.js");
const db = require("./db.js");
const user = require("../user/index.js");

exports.init = () => {};

// check mail and password and create a session
exports.login = (mail, password) => {
  console.log("trace auth.login");

  // check password
  const validUser = user.checkPassword(mail, password);
  if (!validUser) {
    return false;
  }

  // create session
  const session = new Session(validUser);
  db.addSession(session);

  return session;
};

// find a user by session id
exports.checkSession = (sessionId) => {
  console.log("trace auth.checkSession");

  // check session
  const validSession = db.findSessionById(sessionId);
  if (!validSession) {
    return false;
  }

  // find user
  const validUser = user.find(validSession.userId);
  if (!validUser) {
    return false;
  }

  return validUser;
};
