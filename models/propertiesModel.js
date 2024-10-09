
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    deposit: {
        type: Number,
        required: true,
    },
    builtupArea: {
        type: Number,
        required: true,
    },
    furnishing: {
        type: String,
        required: true,
        enum: ['FullyFurnished', 'SemiFurnished', 'Unfurnished'],
    },
    apartmentType: {
        type: String,
        required: true,
        enum: ['1BHK', '2BHK', '3BHK', '4BHK'],
    },
    preferredTenants: {
        type: String,
        required: true,
        enum: ['Family', 'Bachelors', 'Both'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    collection: 'UserProperties',
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

