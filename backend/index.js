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

// Define GeoJSON data for visualization based on scheme and state
const geoData = {
    scheme1: {
        state1: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: { name: 'Region A', value: 'high' },
                    geometry: { type: 'Polygon', coordinates: [[[78.9619, 20.5937], [78.9629, 20.5937], [78.9629, 20.5947], [78.9619, 20.5947], [78.9619, 20.5937]]] }
                },
                {
                    type: 'Feature',
                    properties: { name: 'Region B', value: 'medium' },
                    geometry: { type: 'Polygon', coordinates: [[[78.9659, 20.5937], [78.9669, 20.5937], [78.9669, 20.5947], [78.9659, 20.5947], [78.9659, 20.5937]]] }
                },
            ],
        },
        state2: {
            // GeoJSON for scheme1 in state2
        },
    },
    scheme2: {
        state1: {
            // GeoJSON for scheme2 in state1
        },
        state2: {
            // GeoJSON for scheme2 in state2
        },
    },
};

// Render the result page
app.get("/result", (req, res) => {
    res.render("Api");
});

// Handle the prediction request
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

// API endpoint to get GeoJSON data based on scheme and state
app.get('/api/geojson', (req, res) => {
    const { scheme, state } = req.query;

    if (geoData[scheme] && geoData[scheme][state]) {
        res.json(geoData[scheme][state]);
    } else {
        res.status(404).json({ message: 'GeoJSON data not found' });
    }
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});

