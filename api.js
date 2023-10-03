require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectToDatabase = require('./database/database')
const Job = require('./models/job')
const State = require('./models/state')
const City = require('./models/city')
const User = require('./models/user')

const jobRoutes = require('./routes/job');
const stateRoutes = require('./routes/state');
const cityRoutes = require('./routes/city');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 5000;

connectToDatabase();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/', jobRoutes);
app.use('/', stateRoutes);
app.use('/', cityRoutes);
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`${PORT} connected...!`);
});