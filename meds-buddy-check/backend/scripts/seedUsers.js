const db = require('../config/db');
const bcrypt = require('bcrypt');

const users = [
  { username: 'patient1', password: 'patientpass', role: 'patient' },
  { username: 'caretaker1', password: 'caretakerpass', role: 'caretaker' },
];

const saltRounds = 10;

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `;
  db.run(sql);
};

const insertUser = (user) => {
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password for user', user.username, err);
      return;
    }
    const sql = 'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)';
    db.run(sql, [user.username, hash, user.role], (err) => {
      if (err) {
        console.error('Error inserting user', user.username, err);
      } else {
        console.log('Inserted user', user.username);
      }
    });
  });
};

const seedUsers = () => {
  createUsersTable();
  users.forEach(insertUser);
};

seedUsers();
