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

        await Campaign.deleteMany({});
        console.log('Cleared existing campaigns.');

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
                title: 'Birds Welfare Fund',
                description: 'A Birds Welfare Fund supports initiatives that protect and care for birds, promoting their well-being and conservation. It focuses on providing shelter, rescue services, and conservation efforts to safeguard bird habitats and populations, ultimately making a positive impact on bird welfare and ecosystems.',
                goalAmount: 690000,
                raisedAmount: 0,
                image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80',
                category: 'Animals',
                endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Tree Plantation Fund',
                description: 'A Tree Plantation Fund supports environmental sustainability by financing initiatives that plant and maintain trees. These funds promote reforestation, urban forestry, and sustainable land management, helping to combat climate change, preserve biodiversity, and enhance ecosystem services. Contributions to such funds can make a positive impact on the environment and support local communities.',
                goalAmount: 1650000,
                raisedAmount: 54000,
                image: '/campaigns/tree_plantation.jpg',
                category: 'Environment',
                endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Cancer Relief Fund',
                description: 'The Cancer Relief Fund is essential in supporting patients and families impacted by cancer by providing financial assistance to help cover medical bills, transportation, and other treatment-related expenses. Additionally, it offers vital support services, such as emotional counseling and wellness programs, to help navigate the challenges of a cancer diagnosis. The fund actively engages in awareness and education initiatives to promote understanding of cancer and the importance of early detection.',
                goalAmount: 59970,
                raisedAmount: 0,
                image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
                category: 'Medical',
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Flood Relief',
                description: 'Flood relief efforts in response to heavy rain involve immediate assistance like providing shelter, food, and water, as well as long-term measures like flood control infrastructure and community preparedness. This includes both emergency response and preventative strategies to mitigate future flood damage. Your contribution directly reaches displaced families.',
                goalAmount: 60000,
                raisedAmount: 18500,
                image: '/campaigns/flood_relief.jpg',
                category: 'Community',
                endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Earthquake Relief Fund',
                description: 'An Earthquake Relief Fund refers to a fund established to provide relief and support to individuals and communities affected by earthquakes. These funds are typically set up by organizations or governments to collect donations and allocate them to various relief efforts, such as providing shelter, food, water, and medical assistance to survivors.',
                goalAmount: 150000,
                raisedAmount: 47000,
                image: '/campaigns/earthquake_relief.jpg',
                category: 'Community',
                endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Old Age Home Care Fund',
                description: 'The Old Age Home Care Fund provides financial support and resources to ensure the well-being and dignity of elderly individuals in need. Your contribution can make a significant difference in their lives, enabling access to quality care, nutrition, and companionship. Every donation helps our elderly citizens live their golden years with comfort and respect.',
                goalAmount: 150000,
                raisedAmount: 0,
                image: '/campaigns/old_age_home.jpg',
                category: 'Community',
                endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Emergency Heart Surgery for 5-Year-Old Aarav',
                description: 'Aarav was diagnosed with a congenital heart defect and needs immediate open-heart surgery. His family is unable to afford the ₹5 lakh medical expenses. The surgery is scheduled but will not proceed without the required funding. Every rupee counts — your contribution can save a young life and give his parents hope.',
                goalAmount: 500000,
                raisedAmount: 187500,
                image: '/campaigns/heart_surgery.jpg',
                category: 'Medical',
                endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Sponsor Education for 100 Underprivileged Children',
                description: 'Help us provide books, uniforms, school fees, and tuition support for 100 children in rural Maharashtra. Many of these children walk kilometers to reach school each day. Education is the most powerful weapon we can give them to break the cycle of poverty. Join us in lighting the path to a brighter future.',
                goalAmount: 300000,
                raisedAmount: 112000,
                image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
                category: 'Education',
                endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Clean Drinking Water for Rural Villages in Rajasthan',
                description: 'Over 3,000 villagers in remote Rajasthan walk 5+ kilometers daily to fetch contaminated water. We are installing solar-powered water purification units across 8 villages, providing safe drinking water 24/7. This project will eliminate waterborne diseases like cholera and typhoid that affect hundreds of children every year.',
                goalAmount: 420000,
                raisedAmount: 210000,
                image: '/campaigns/clean_water.jpg',
                category: 'Community',
                endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            },
            {
                title: 'Community Kitchen: Feeding Homeless Families Daily',
                description: 'We run a daily community kitchen providing hot, nutritious meals to 200+ homeless individuals and families across Mumbai. Fueled entirely by volunteers and donations, our kitchen has served over 50,000 meals. Help us keep the kitchen running and expand to two new locations — because no one should sleep hungry.',
                goalAmount: 150000,
                raisedAmount: 128000,
                image: '/campaigns/community_kitchen.jpg',
                category: 'Community',
                endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                organization: mockOrg._id,
                status: 'Active',
                walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
            }
        ];

        await Campaign.insertMany(campaigns);
        console.log(`Successfully seeded ${campaigns.length} campaigns with real photography!`);

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
