const express = require('express');
const Hotels = require('../models/Hotels');
const createError = require('../utils/error');

const router = express.Router();

//Create
router.post('/', async (req, res) => {
	const newHotel = new Hotels(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Update
router.put('/:id', async (req, res) => {
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
		res.status(500).json(err);
	}
});

//Delete
router.delete('/:id', async (req, res) => {
	try {
		await Hotels.findByIdAndDelete(req.params.id);

		res.status(200).json('Hotel has been deleted');
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET
router.get('/:id', async (req, res) => {
	try {
		const hotel = await Hotels.findById(req.params.id);

		res.status(200).json(hotel);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL
router.get('/', async (req, res, next) => {
	try {
		const hotels = await Hotels.find();

		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
});
module.exports = router;
