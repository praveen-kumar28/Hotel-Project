const mongoose = require('mongoose');
const Dish = require('./Dish');
const dishes = require('./Data/dish-assignment.json');

const mongoURI = 'mongodb://localhost:27017/Dishes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        await Dish.deleteMany({});
        await Dish.insertMany(dishes);
        console.log('Data has been inserted');
        mongoose.disconnect();
    })
    .catch(err => console.log(err));
