import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    goalAmount: {
        type: Number,
        required: true,
    },
    raisedAmount: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        default: 'Other'
    },
    endDate: {
        type: Date,
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default: 'Active',
    },
    walletAddress: {
        type: String,
        default: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
