require('dotenv').config(); // Load environment variables from a .env file into process.env
const express = require('express'); // Import Express, a web framework for Node.js
const mongoose = require('mongoose'); // Import Mongoose, an ODM (Object Data Modeling) library for MongoDB
const cors = require('cors'); // Import CORS middleware to enable Cross-Origin Resource Sharing
const Profile = require('./models/profile.js'); // Import the Profile model

const app = express(); // Initialize an Express application
app.use(express.json()); // Middleware to parse incoming requests with JSON payloads
app.use(cors()); // Middleware to allow cross-origin requests

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.URI, {
    useNewUrlParser: true, // Use the new URL string parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

// Example of dummy profile data (commented out)
// This can be used for seeding the database with initial data
// const dummyProfiles = [
//     { name: 'Aarav Gupta', age: 28, location: 'Delhi', profession: 'Software Engineer' },
//     { name: 'Riya Sharma', age: 25, location: 'Mumbai', profession: 'Marketing Specialist' },
//     { name: 'Vihaan Singh', age: 30, location: 'Bangalore', profession: 'Data Scientist' },
//     { name: 'Aanya Patel', age: 27, location: 'Hyderabad', profession: 'UX Designer' },
//     { name: 'Aditya Kumar', age: 32, location: 'Chennai', profession: 'Product Manager' },
//     { name: 'Isha Verma', age: 24, location: 'Kolkata', profession: 'Graphic Designer' },
//     { name: 'Kabir Reddy', age: 29, location: 'Pune', profession: 'Business Analyst' },
//     { name: 'Diya Joshi', age: 26, location: 'Ahmedabad', profession: 'Content Writer' },
//     { name: 'Arjun Desai', age: 31, location: 'Jaipur', profession: 'Full Stack Developer' },
//     { name: 'Nidhi Chauhan', age: 28, location: 'Lucknow', profession: 'DevOps Engineer' },
// ];

// Code to insert dummy data into the database (commented out)
// This can be done in a script or through API calls
// dummyProfiles.forEach(async (profile) => {
//     const newProfile = new Profile(profile);
//     await newProfile.save();
// });

const PORT = process.env.PORT || 8000; // Define the port for the server to listen on

// API endpoint to create a new profile
app.post('/api/profiles', async (req, res) => {
    const { name, age, location, profession } = req.body; // Destructure profile data from the request body
    try {
        const profile = new Profile({ name, age, location, profession }); // Create a new Profile instance with the provided data
        await profile.save(); // Save the profile to the database
        res.status(201).json(profile); // Respond with the created profile and a 201 status code
    } catch (error) {
        res.status(400).json({ error: error.message }); // Respond with an error message if the operation fails
    }
});

// API endpoint to get all profiles
app.get('/api/profiles', async (req, res) => {
    const profiles = await Profile.find().sort({ location: 1 }); // Fetch all profiles from the database, sorted by location
    res.json(profiles); // Respond with the profiles in JSON format
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log a message when the server starts successfully
});
