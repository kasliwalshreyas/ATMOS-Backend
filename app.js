require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/user', require('./routes/user-routes'));

app.listen(port, () => {
    console.log(`ATMOS Backend server started on port ${port}`);
});
