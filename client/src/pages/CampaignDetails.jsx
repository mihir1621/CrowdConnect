import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShare2, FiHeart, FiClock, FiShield, FiCheckCircle } from 'react-icons/fi';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CampaignDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [donationAmount, setDonationAmount] = useState('');

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await api.get(`/campaigns/${id}`);
                setCampaign(response.data);
            } catch (err) {
                console.error("Error fetching campaign:", err);
                setError('Failed to load campaign details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    const handleDonate = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const amount = Number(donationAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        navigate(`/donate/${id}?amount=${amount}`);
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-slate-500">Loading campaign...</div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-red-500">{error || 'Campaign not found.'}</div>
            </div>
        );
    }

    const raised = campaign.raisedAmount || 0;
    const goal = campaign.goalAmount || 1;
    const progress = Math.min((raised / goal) * 100, 100);

    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-64 md:h-96 w-full">
                        <img
                            src={campaign.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex items-center gap-2 text-white/90 mb-3">
                                <FiCheckCircle className="text-green-400" />
                                <span className="text-sm font-medium">Verified Organization</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
                                {campaign.title}
                            </h1>
                            <p className="text-lg text-white/80 font-medium">by {campaign.organization?.name || 'Verified Organization'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 p-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-8 border-r-0 lg:border-r border-slate-100">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">About this campaign</h2>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                                    {campaign.description}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Updates</h3>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-brand-dark/10 rounded-full flex items-center justify-center text-brand-dark font-bold">
                                            {campaign.organization?.name ? campaign.organization.name.substring(0, 2).toUpperCase() : 'VO'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{campaign.organization?.name || 'Verified Organization'}</p>
                                            <p className="text-xs text-slate-500">Just now</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600">Campaign launched successfully! Thank you for your support.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Donation Panel */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <div className="mb-8">
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-extrabold text-slate-900">₹{raised.toLocaleString()}</span>
                                        <span className="text-lg text-slate-500 mb-1">raised of ₹{goal.toLocaleString()}</span>
                                    </div>

                                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-brand-dark h-full rounded-full"
                                        ></motion.div>
                                    </div>

                                    <div className="flex justify-between text-sm font-medium text-slate-600 mb-8">
                                        <div className="flex items-center gap-1"><FiHeart className="text-pink-500" /> {campaign.donors?.length || 0} donors</div>
                                        <div className="flex items-center gap-1"><FiClock className="text-brand-dark" /> {daysLeft > 0 ? daysLeft : 0} days left</div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Make a Donation</h3>
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {[500, 1000, 2000, 5000].map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() => setDonationAmount(amount.toString())}
                                                    className={`py-3 border-2 rounded-xl font-semibold transition-all ${donationAmount === amount.toString()
                                                        ? 'border-brand-dark bg-brand-dark/5 text-brand-dark'
                                                        : 'border-slate-100 text-slate-700 hover:border-brand-dark hover:text-brand-dark hover:bg-brand-dark/5'
                                                        }`}
                                                >
                                                    ₹{amount}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative mb-6">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                                            <input
                                                type="number"
                                                value={donationAmount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                placeholder="Custom Amount"
                                                className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:outline-none focus:border-brand-dark focus:ring-0 transition-colors font-medium"
                                            />
                                        </div>
                                        <button
                                            onClick={handleDonate}
                                            className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-dark/20 hover:bg-brand-dark/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                        >
                                            Donate Now <FiHeart />
                                        </button>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                            <FiShare2 /> Share
                                        </button>
                                        <button className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                            <FiShield /> Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
