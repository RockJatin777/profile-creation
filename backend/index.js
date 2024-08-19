require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./models/profile.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

// Insert dummy data into the database (can be done in a script or via API calls)
// dummyProfiles.forEach(async (profile) => {
//     const newProfile = new Profile(profile);
//     await newProfile.save();
// });


const PORT = process.env.PORT || 8000;

app.post('/api/profiles', async (req, res) => {
    const { name, age, location, profession } = req.body;
    try {
        const profile = new Profile({ name, age, location, profession });
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/profiles', async (req, res) => {
    const profiles = await Profile.find().sort({ location: 1 });
    res.json(profiles);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
