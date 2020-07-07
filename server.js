const express = require('express');
const app = express();
const connectDB = require('./config/db');


//connect Database
connectDB();

//Init middleware

app.use(express.json({
    extended: false
}));


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/user', require('./routes/user'));

app.use('/auth', require('./routes/auth'));

app.use('/vendor', require('./routes/vendor'));

app.listen(PORT, () => {
    console.log(`Server started succesfully at ${PORT}`);
});