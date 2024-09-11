const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors()); // Add this line to enable CORS


app.use(express.json());
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// MongoDB connection setup
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

// Define a schema and model for the Api_data collection
const ApiDataSchema = new mongoose.Schema({
    city_name: String,
    avg_age: Number,
    gender_ratio: Number,
    avg_income: Number,
    employment_rate: Number,
    farming_cycle: Number
});

const ApiData = mongoose.model('data', ApiDataSchema);

app.get("/result", (req, res) => {
    res.render("Api");
});

app.post('/predict', async (req, res) => {
    const { city_name } = req.body;

    try {
        // Find data from MongoDB based on city_name
        const requestData = await ApiData.findOne({ city_name });

        if (!requestData) {
            return res.status(404).json({ error: 'City data not found' });
        }

        // Make a POST request to the external API
        const response = await axios.post('https://model3-9aqk.onrender.com/predict', requestData);

        // Send the response data back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error making request:', error);
        res.status(500).json({ error: 'Error making request' });
    }
    
});


// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});







