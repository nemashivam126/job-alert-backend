const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    job_title: String,
    experience_range: String,
    salary_range: String,
    job_priority: String,
    posted_on: { type: Date, default: Date.now },
    status: String,
    state_id: { type: Number, ref: 'State', field: 'id' },
    city_id: { type: Number, ref: 'City', field: 'id' }
});

module.exports = mongoose.model('Job', jobSchema);