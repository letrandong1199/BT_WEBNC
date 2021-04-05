const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors')


app.use(cors());


const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/actors', require('./routes/actor.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/cities', require('./routes/city.route'));
app.use('/api/countries', require('./routes/country.route'));


app.get('/', (req, res) => {
    res.send("Hello Sakila...........")
})

app.get('/err', function (req, res) {
    throw new Error('Error!!!');
})
app.use(function (req, res, next) {
    res.status(404).json({
        error_message: "Endpoint not found"
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke !!!!!'
    })
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})