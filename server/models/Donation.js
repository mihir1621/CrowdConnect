import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Razorpay', 'Crypto'],
        default: 'Razorpay',
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpayOrderId: {
        type: String,
    },
    razorpaySignature: {
        type: String,
    },
    cryptoTxHash: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Successful', 'Failed'],
        default: 'Pending',
    },
    message: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
