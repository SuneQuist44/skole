const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json()); // Conevert data into JSON

mongoose.connect(process.env.HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error occured while connecting to MongoDB:", err.message));

// Router Connections
const User = require('./src/Router/User');
const Basket = require('./src/Router/Basket');

// Routers
app.use(User);
app.use(Basket);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Connected to port", PORT));