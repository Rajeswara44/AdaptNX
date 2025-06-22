const {
  createMedicationTable,
  createMedicationIntakeTable,
  addMedication,
  getMedicationsByUser,
  markMedicationTaken,
  getMedicationIntake
} = require('../models/medicationModel');

// Initialize tables
createMedicationTable();
createMedicationIntakeTable();

const addNewMedication = (req, res) => {
  const { userId, name, dosage, frequency } = req.body;
  if (!userId || !name || !dosage || !frequency) {
    return res.status(400).json({ message: 'All medication details are required' });
  }
  addMedication(userId, name, dosage, frequency, (err, medicationId) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to add medication' });
    }
    res.status(201).json({ message: 'Medication added', medicationId });
  });
};

const getMedications = (req, res) => {
  const userId = req.params.userId;
  getMedicationsByUser(userId, (err, medications) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch medications' });
    }
    res.json(medications);
  });
};

const markTaken = (req, res) => {
  const { medicationId, date, taken } = req.body;
  if (!medicationId || !date || typeof taken !== 'number') {
    return res.status(400).json({ message: 'medicationId, date and taken status are required' });
  }
  markMedicationTaken(medicationId, date, taken, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to update medication intake' });
    }
    res.json({ message: 'Medication intake updated' });
  });
};

module.exports = {
  addNewMedication,
  getMedications,
  markTaken
};
