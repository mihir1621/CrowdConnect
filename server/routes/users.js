import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';
import Donation from '../models/Donation.js';

const router = express.Router();

// Get current user profile and stats
router.get('/me', verifyToken, async (req, res) => {
    try {
        // Find user by firebaseUid
        let user = await User.findOne({ firebaseUid: req.user.uid });

        // If user doesn't exist in MongoDB yet, create them
        if (!user) {
            user = new User({
                firebaseUid: req.user.uid,
                email: req.user.email,
                name: req.user.name || req.user.email.split('@')[0],
                role: 'Visitor'
            });
            await user.save();
        }

        // Fetch user donations
        const donations = await Donation.find({ user: user._id }).populate('campaign', 'title image');

        const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
        const campaignsSupported = new Set(donations.map(d => d.campaign._id.toString())).size;

        res.json({
            user,
            stats: {
                totalDonated,
                campaignsSupported,
                impactScore: campaignsSupported * 15 + Math.floor(totalDonated / 100)
            },
            recentDonations: donations.slice(0, 5)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
