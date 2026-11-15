require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const driveRoutes = require('./routes/drives');
const registrationRoutes = require('./routes/registrations');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Campus Placement API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));