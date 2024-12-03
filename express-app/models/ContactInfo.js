const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    email: {
        primary: { type: String, required: true },
        support: { type: String }
    },
    phone: {
        primary: { type: String, required: true },
        secondary: { type: String }
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        youtube: { type: String }
    },
    businessHours: [{
        day: { type: String },
        hours: { type: String }
    }],
    latitude: { type: Number },
    longitude: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);