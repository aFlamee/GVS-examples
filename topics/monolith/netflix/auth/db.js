// indexes
const sessionById = {};

exports.addSession = (session) => {
  sessionById[session.id] = session;
};

exports.findSessionById = (id) => {
  return sessionById[id];
};
