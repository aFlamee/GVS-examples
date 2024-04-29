const crypto = require("crypto");

module.exports = class Post {
  constructor(userId, text, image) {
    this.id = crypto.randomUUID();
    this.createdAt = Date.now();
    this.userId = userId;
    this.text = text;
    this.image = image;
  }
};
