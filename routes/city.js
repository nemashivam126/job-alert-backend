const express = require('express');
const router = express.Router();
const City = require('../models/city');

router.get('/city-names', async (req, res) => {
    try {
        const cities = await City.find({}, 'city_name');
        const cityNames = cities.map(city => city.city_name);
        res.json(cityNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add-city', async (req, res) => {
    try {
        const newCity = new City({
            id: req.body.id,
            city_name: req.body.city_name,
            state_id: req.body.state_id
        });
        const savedCity = await newCity.save();
        res.status(201).json(savedCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function getCity(req, res, next) {
  try {
        const city = await City.findById(req.params.id);
        if (city == null) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.city = city;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

router.get('/cities/:id', getCity, (req, res) => {
    res.json(res.city);
});

router.put('/cities/:id', getCity, async (req, res) => {
    try {
        if (req.body.id !== undefined) {
            res.city.id = req.body.id;
        }
        if (req.body.city_name !== undefined) {
            res.city.city_name = req.body.city_name;
        }
        if (req.body.state_id !== undefined) {
            res.city.state_id = req.body.state_id;
        }
        const updatedCity = await res.city.save();
        res.json(updatedCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/cities/:id', getCity, async (req, res) => {
    try {
        await res.city.remove();
        res.json({ message: 'City deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/cities/state/:state_id', async (req, res) => {
    try {
        const stateId = req.params.state_id;
        const cities = await City.find({ state_id: stateId });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;