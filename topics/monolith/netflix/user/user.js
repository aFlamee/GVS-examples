module.exports = class User {
  constructor(id, name, mail, password) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.password = password;
  }

  checkPassword(givenPassword) {
    return this.password == givenPassword;
  }
};
