const express = require('express');
const router = express.Router()
const Job = require('../models/job');

router.get('/jobs', async(req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/add-job', async(req, res) => {
    try {
        const newJob = new Job({
            job_title: req.body.job_title,
            experience_range: req.body.experience_range,
            salary_range: req.body.salary_range,
            job_priority: req.body.job_priority,
            // posted_on: new Date(),
            status: req.body.status,
            state_id: req.body.state_id,
            city_id: req.body.city_id
        })

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

async function getJob(req, res, next) {
    try {
        const job = await Job.findById(req.params.id);
        if (job == null) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.job = job;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
 
router.put('/edit-job/:id', getJob, async (req, res) => {
    try {
        res.job.job_title = req.body.job_title;
        res.job.experience_range = req.body.experience_range;
        res.job.salary_range = req.body.salary_range;
        res.job.job_priority = req.body.job_priority;
        res.job.posted_on = new Date();
        res.job.status = req.body.status;
        res.job.state_id = req.body.state_id;
        res.job.city_id = req.body.city_id;

        const updatedJob = await res.job.save();
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/delete-job/:id', getJob, async (req, res) => {
    try {
        await res.job.remove();
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/job/:id', getJob, (req, res) => {
    res.json(res.job);
});

module.exports = router;