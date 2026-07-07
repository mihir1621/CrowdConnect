import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Campaign from './models/Campaign.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crowdconnect';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing campaigns and mock users
        await Campaign.deleteMany({});
        console.log('Cleared existing campaigns.');

        // Find or create a mock organization user
        let mockOrg = await User.findOne({ email: 'org@crowdconnect.com' });
        if (!mockOrg) {
            mockOrg = new User({
                firebaseUid: 'mock-org-uid-123',
                email: 'org@crowdconnect.com',
                name: 'Hope Foundation',
                role: 'Organization',
                profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
            });
            await mockOrg.save();
            console.log('Created mock organization user.');
        }

        const campaigns = [
            {
                title: 'Emergency Heart Surgery for 5-Year-Old Aarav',
                description: 'Aarav was diagnosed with a congenital heart defect and needs immediate open-heart surgery. His family is unable to afford the medical expenses. Your contribution can save a young life.',
                goalAmount: 500000,
                raisedAmount: 150000,
                image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
                category: 'Medical',
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                organization: mockOrg._id,
                status: 'Active'
            },
            {
                title: 'Sponsor Education for Underprivileged Children',
                description: 'Help us provide books, uniforms, and tuition fees for 100 children in rural communities. Education is the key to breaking the cycle of poverty.',
                goalAmount: 300000,
                raisedAmount: 95000,
                image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
                category: 'Education',
                endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
                organization: mockOrg._id,
                status: 'Active'
            },
            {
                title: 'Reforestation Drive: Plant 10,000 Trees',
                description: 'Join our mission to restore local biodiversity and combat climate change by planting native trees in deforested areas. Every tree planted helps secure a greener future.',
                goalAmount: 200000,
                raisedAmount: 45000,
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
                category: 'Environment',
                endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
                organization: mockOrg._id,
                status: 'Active'
            },
            {
                title: 'Community Kitchen: Feeding Homeless Families',
                description: 'We run a daily community kitchen providing hot, nutritious meals to homeless individuals and families in the city. Support us to keep our kitchen running.',
                goalAmount: 150000,
                raisedAmount: 120000,
                image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
                category: 'Community',
                endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
                organization: mockOrg._id,
                status: 'Active'
            },
            {
                title: 'Shelter and Medical Care for Abandoned Animals',
                description: 'Our animal shelter provides rescue, medical treatment, and rehabilitation for injured and abandoned street animals. Help us buy food and medical supplies.',
                goalAmount: 250000,
                raisedAmount: 80000,
                image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
                category: 'Animals',
                endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), // 40 days from now
                organization: mockOrg._id,
                status: 'Active'
            }
        ];

        await Campaign.insertMany(campaigns);
        console.log('Successfully seeded mock campaigns!');

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
