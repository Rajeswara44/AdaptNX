const db = require('../config/db');

const createMedicationTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      name TEXT,
      dosage TEXT,
      frequency TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `;
  db.run(sql);
};

const createMedicationIntakeTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS medication_intake (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medicationId INTEGER,
      date TEXT,
      taken INTEGER,
      FOREIGN KEY(medicationId) REFERENCES medications(id)
    )
  `;
  db.run(sql);
};

const addMedication = (userId, name, dosage, frequency, callback) => {
  const sql = 'INSERT INTO medications (userId, name, dosage, frequency) VALUES (?, ?, ?, ?)';
  db.run(sql, [userId, name, dosage, frequency], function(err) {
    callback(err, this ? this.lastID : null);
  });
};

const getMedicationsByUser = (userId, callback) => {
  const sql = 'SELECT * FROM medications WHERE userId = ?';
  db.all(sql, [userId], (err, rows) => {
    callback(err, rows);
  });
};

const markMedicationTaken = (medicationId, date, taken, callback) => {
  const sqlCheck = 'SELECT * FROM medication_intake WHERE medicationId = ? AND date = ?';
  db.get(sqlCheck, [medicationId, date], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (row) {
      const sqlUpdate = 'UPDATE medication_intake SET taken = ? WHERE id = ?';
      db.run(sqlUpdate, [taken, row.id], function(err) {
        callback(err);
      });
    } else {
      const sqlInsert = 'INSERT INTO medication_intake (medicationId, date, taken) VALUES (?, ?, ?)';
      db.run(sqlInsert, [medicationId, date, taken], function(err) {
        callback(err);
      });
    }
  });
};

const getMedicationIntake = (medicationId, callback) => {
  const sql = 'SELECT * FROM medication_intake WHERE medicationId = ?';
  db.all(sql, [medicationId], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = {
  createMedicationTable,
  createMedicationIntakeTable,
  addMedication,
  getMedicationsByUser,
  markMedicationTaken,
  getMedicationIntake
};
