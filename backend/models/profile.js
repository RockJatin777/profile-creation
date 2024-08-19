const mongoose = require('mongoose'); // Import mongoose, a MongoDB object modeling tool

// Define a schema for the Profile model using mongoose
const profileSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name field, must be a string and is required
    age: { type: Number, required: true },  // Age field, must be a number and is required
    location: { type: String, required: true }, // Location field, must be a string and is required
    profession: { type: String, required: true }, // Profession field, must be a string and is required
});

// Export the Profile model based on the defined schema
module.exports = mongoose.model('Profile', profileSchema);


