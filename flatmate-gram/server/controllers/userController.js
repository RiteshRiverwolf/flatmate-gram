const User = require('../models/User');

// Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        // Find user by ID (from the JWT auth middleware) and update with request body
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        ).select('-password'); // Don't return the password

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Current User Profile
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get All Users (For the Discovery/Swipe feed)
exports.getAllUsers = async (req, res) => {
    try {
        // Logic: Get users that are NOT the current user
        const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
// Like a User
exports.likeUser = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const currentUserId = req.user.id;

        // Add target user to current user's liked list
        const currentUser = await User.findByIdAndUpdate(
            currentUserId,
            { $addToSet: { likedUsers: targetUserId } },
            { new: true }
        );

        // Check if the target user has already liked the current user
        const targetUser = await User.findById(targetUserId);
        
        if (targetUser.likedUsers.includes(currentUserId)) {
            // It's a MATCH! Add to both users' matches list
            await User.findByIdAndUpdate(currentUserId, { $addToSet: { matches: targetUserId } });
            await User.findByIdAndUpdate(targetUserId, { $addToSet: { matches: currentUserId } });
            
            return res.json({ message: "It's a Match!", isMatch: true });
        }

        res.json({ message: "User liked", isMatch: false });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
// Get all mutual matches
exports.getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('matches', 'name age profileImage location work');
        res.json(user.matches);
    } catch (err) {
        res.status(500).json({ message: "Error fetching matches" });
    }
};