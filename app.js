const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/actors', require('./routes/actor.route'));

app.get('/', (req, res) => {
    res.send("Hello Sakila...........")
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})