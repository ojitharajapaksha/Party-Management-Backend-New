const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const individualRoutes = require('./routes/individual.routes');
const organizationRoutes = require('./routes/organization.routes');

dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/tmf-api/party/v5/individual', individualRoutes);
app.use('/tmf-api/party/v5/organization', organizationRoutes);

app.get('/', (req, res) => {
  res.send('TMF632 Party Management API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
