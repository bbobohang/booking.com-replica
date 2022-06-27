const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', (req, res) => {
	res.send('auth endpoint');
});

//Registering the user
router.post('/register', async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});

		await newUser.save();
		res.status(200).send('User has been created');
	} catch (err) {
		next(err);
	}
});

//Logging in the user
router.get('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return next(createError(404, 'User not found'));

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect) return next(createError(400, 'Wrong credentials'));

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			config.get('JWT')
		);

		const { password, isAdmin, ...others } = user._doc;
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ ...others });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
