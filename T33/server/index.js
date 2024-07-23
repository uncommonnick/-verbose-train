const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require('./routes/inventory');

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/inventory', inventoryRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
