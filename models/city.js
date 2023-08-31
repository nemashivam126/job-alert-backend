const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: Number,
    city_name: String,
    // state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State', field: 'id' }
    state_id: { type: Number, ref: 'State', field: 'id' }
});

module.exports = mongoose.model('City', citySchema);
