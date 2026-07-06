import express from 'express';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('organization', 'name profilePicture');
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single campaign
router.get('/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate('organization', 'name profilePicture');
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create campaign (Organization only)
router.post('/', verifyToken, checkRole(['Organization', 'Admin']), async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found in database' });
        }

        const campaign = new Campaign({
            ...req.body,
            organization: user._id
        });

        const savedCampaign = await campaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
