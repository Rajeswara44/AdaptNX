const db = require('../config/db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createUserTable = () => {
  const sql = "CREATE TABLE IF NOT EXISTS users (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "username TEXT UNIQUE," +
    "password TEXT," +
    "role TEXT" +
  ")";
  db.run(sql);
};

const createUser = (username, password, role, callback) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return callback(err);
    }
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.run(sql, [username, hash, role], function(err) {
      callback(err, this ? this.lastID : null);
    });
  });
};

const findUserByUsername = (username, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  createUserTable,
  createUser,
  findUserByUsername
};
