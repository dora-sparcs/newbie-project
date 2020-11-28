const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const router = require('./routes/router')

const PORT = 4018;

app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('My Newbie Project!')
})

app.use('/newbie-project', router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
