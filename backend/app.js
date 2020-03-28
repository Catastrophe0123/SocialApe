const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./dbConnect');

app.use(express.json());

app.use(expressSanitizer());

connectDB();
const PORT = process.env.PORT || 4000;

// 14:44

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH'
	);
	res.setHeader(
		'Access-Control-Allow-headers',
		'Authorization, Content-Type'
	);
	next();
});

app.use('/api/screams', require('./routes/api/screams'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));

app.listen(PORT, () => {
	console.log('server started');
});
