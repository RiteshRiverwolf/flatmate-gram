const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Ensure likeUser is included in the line below
const { updateProfile, getMe, getAllUsers, likeUser, getMatches } = require('../controllers/userController');

// All these routes require a valid token
router.get('/me', auth, getMe);
router.put('/update', auth, updateProfile);
router.get('/all', auth, getAllUsers);
router.post('/like/:id', auth, likeUser); // Now likeUser will be defined
router.get('/matches', auth, getMatches);

module.exports = router;