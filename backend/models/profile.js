const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    profession: { type: String, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);
