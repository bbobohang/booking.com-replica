const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('room endpoint');
});

module.exports = router;