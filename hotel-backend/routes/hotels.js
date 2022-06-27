const express = require('express');
const Hotels = require('../models/Hotels');
const createError = require('../utils/error');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//Create
router.post('/', verifyAdmin, async (req, res, next) => {
	const newHotel = new Hotels(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
});

//Update
router.put('/find/:id', verifyAdmin, async (req, res, next) => {
	try {
		const updateHotel = await Hotels.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(200).json(updateHotel);
	} catch (err) {
		next(err);
	}
});

//Delete
router.delete('/find/:id', verifyAdmin, async (req, res, next) => {
	try {
		await Hotels.findByIdAndDelete(req.params.id);

		res.status(200).json('Hotel has been deleted');
	} catch (err) {
		next(err);
	}
});

//GET
router.get('/find/:id', verifyUser, async (req, res, next) => {
	try {
		const hotel = await Hotels.findById(req.params.id);

		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
});

//GET ALL
router.get('/', verifyUser, async (req, res, next) => {
	try {
		const hotels = await Hotels.find();

		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
});

router.get('/countByCity', async (req, res, next) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotels.countDocuments({ city: city });
			})
		);
		const cityObj = {};
		cities.forEach((city, index) => {
			cityObj[city] = list[index];
		});

		res.status(200).json(cityObj);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
