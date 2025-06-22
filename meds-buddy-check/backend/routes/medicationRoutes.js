const express = require('express');
const router = express.Router();
const {
  addNewMedication,
  getMedications,
  markTaken
} = require('../controllers/medicationController');

router.post('/add', addNewMedication);
router.get('/:userId', getMedications);
router.post('/mark-taken', markTaken);

module.exports = router;
