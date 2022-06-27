const express = require('express');
const app = express();
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const hotels = require('./routes/hotels');
const rooms = require('./routes/rooms');
const users = require('./routes/users');
const cookieParser = require('cookie-parser');

//Routing middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', auth);
app.use('/api/hotels', hotels);
app.use('/api/rooms', rooms);
app.use('/api/users', users);

//Error handling
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
	connectDB();
	console.log(`Connected to backend on port ${PORT}`);
});
