const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Dish = require('./Dish'); 
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb://localhost:27017/Dishes';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    
app.get('/api/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/dishes/toggle/:dishId', async (req, res) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.dishId });
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        dish.isPublished = !dish.isPublished;
        await dish.save();
        console.log("Emitting dishUpdated:", dish);
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
