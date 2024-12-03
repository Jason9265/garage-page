// Required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const ContactInfo = require('./models/ContactInfo');
const Service = require('./models/Service');
const Review = require('./models/Review');
const Booking = require('./models/Booking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
        await mongoose.connect(dbURI, {
            // Connection options can be omitted if using Mongoose 6+
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Connect to database
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// Contact Info APIs
app.get('/api/contact_info', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.find();
        res.json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/contact_info', async (req, res) => {
    try {
        const newContactInfo = new ContactInfo(req.body);
        const savedContactInfo = await newContactInfo.save();
        res.status(201).json(savedContactInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/contact_info/:contact_id', async (req, res) => {
    try {
        const updatedContactInfo = await ContactInfo.findByIdAndUpdate(
            req.params.contact_id,
            req.body,
            { new: true }
        );
        res.json(updatedContactInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/contact_info/:contact_id', async (req, res) => {
    try {
        await ContactInfo.findByIdAndDelete(req.params.contact_id);
        res.json({ message: 'Contact info deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Services APIs
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/services/:service_id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.service_id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/services', async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/services/:service_id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.service_id,
            req.body,
            { new: true }
        );
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/services/:service_id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.service_id);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Reviews APIs
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('serviceId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/reviews/:review_id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.review_id).populate('serviceId');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/reviews/:review_id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.review_id,
            req.body,
            { new: true }
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/reviews/:review_id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.review_id);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Bookings APIs
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('serviceId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/bookings/:booking_id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.booking_id).populate('serviceId');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/bookings/:booking_id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.booking_id,
            req.body,
            { new: true }
        );
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/bookings/:booking_id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.booking_id);
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
