const express = require('express');
const router = express.Router()
const State = require('../models/state');

router.get('/states', async (req, res) => {
    try {
        const states = await State.find({}, 'state_name');
        const stateNames = states.map(state => state.state_name);
        res.json(stateNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/all-states', async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add-state', async(req, res) => {
    try {
        const newState = new State({
            id: req.body.id,
            state_name: req.body.state_name
        })
        const savedState = await newState.save();
        res.status(201).json(savedState);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;