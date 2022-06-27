const express = require('express');
const Hotels = require('../models/Hotels');
const Rooms = require('../models/Rooms');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

//Creating new rooms and linking to the hotelid
router.post('/:hotelid', async (req, res, next) => {
	const hotelid = req.params.hotelid;
	const newRoom = new Rooms(req.body);

	try {
		const savedRoom = await newRoom.save();

		await Hotels.findByIdAndUpdate(hotelid, {
			$push: { rooms: savedRoom._id },
		});

		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
});

//Delete rooms
router.delete('/:hotelid/:id', verifyAdmin, async (req, res, next) => {
	const hotelid = req.params.hotelid;
	try {
		await Rooms.findByIdAndDelete(req.params.id);
		await Hotels.findByIdAndUpdate(hotelid, {
			$pull: { rooms: req.params.id },
		});

		res.status(200).json('Room has been deleted');
	} catch (err) {
		next(err);
	}
});

//GET by room id
router.get('/:id', verifyUser, async (req, res, next) => {
	try {
		const room = await Rooms.findById(req.params.id);

		res.status(200).json(room);
	} catch (err) {
		next(err);
	}
});

//GET ALL
router.get('/', verifyUser, async (req, res, next) => {
	try {
		const rooms = await Rooms.find();

		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
});
//Updating room
router.put('/:id', verifyAdmin, async (req, res, next) => {
	try {
		const updateRoom = await Rooms.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(200).json(updateRoom);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
