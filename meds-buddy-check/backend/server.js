const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
