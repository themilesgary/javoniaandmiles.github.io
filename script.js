// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/guests', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create a schema for the guests
const guestSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Guest = mongoose.model('Guest', guestSchema);

// Create an Express app
const app = express();

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle RSVP submissions
app.post('/rsvp', async (req, res) => {
    const { name, email, phone } = req.body;

    // Check if the guest is on the list
    const isGuest = await Guest.findOne({ name });

    if (isGuest) {
        // Update the guest's email and phone number
        await Guest.updateOne({ name }, { email, phone });
        res.send('Thank you for RSVPing!');
    } else {
        res.status(400).send('Sorry, you are not on the guest list.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
