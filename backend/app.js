const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./dbConnect');

app.use(express.json());
connectDB();
const PORT = process.env.PORT || 3000;

// 14:44

app.use('/api/screams', require('./routes/api/screams'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => {
    console.log('server started');
});
