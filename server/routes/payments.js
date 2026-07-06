import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Mock Razorpay instance if keys are missing
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

// Create order
router.post('/create-order', verifyToken, async (req, res) => {
    try {
        const { amount, campaignId } = req.body;

        if (!razorpay) {
            // Mock response for development
            return res.json({
                id: `order_mock_${Date.now()}`,
                amount: amount * 100,
                currency: 'INR',
            });
        }

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify payment
router.post('/verify-payment', verifyToken, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, campaignId } = req.body;

        const user = await User.findOne({ firebaseUid: req.user.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        let isVerified = false;

        if (!razorpay) {
            // Mock verification for development
            isVerified = true;
        } else {
            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

            isVerified = (razorpay_signature === expectedSign);
        }

        if (isVerified) {
            // Create Donation Record
            const donation = new Donation({
                user: user._id,
                campaign: campaignId,
                amount: amount,
                razorpayPaymentId: razorpay_payment_id || `mock_payment_${Date.now()}`,
                razorpayOrderId: razorpay_order_id || `mock_order_${Date.now()}`,
                razorpaySignature: razorpay_signature || `mock_signature_${Date.now()}`,
                status: 'Successful'
            });
            await donation.save();

            // Update Campaign raisedAmount
            await Campaign.findByIdAndUpdate(campaignId, {
                $inc: { raisedAmount: amount }
            });

            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
