const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    gender: String,
    roommatePreference: String,
    location: {
        city: String,
        workLocation: String
    },
    work: {
        profession: String,
        company: String
    },
    budget: {
        min: Number,
        max: Number
    },
    moveInDate: Date,
    bio: String,
    lifestyle: {
        smoking: { type: Boolean, default: false },
        drinking: { type: Boolean, default: false },
        petsOk: { type: Boolean, default: false },
        foodHabit: String,
        workingHours: String
    },
    profileImage: { type: String, default: "https://via.placeholder.com/150" },
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);