const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    id: Number,
    state_name: String,
});

module.exports = mongoose.model('State', stateSchema);