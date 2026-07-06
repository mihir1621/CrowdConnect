import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await api.get('/campaigns');
                setCampaigns(response.data);
            } catch (err) {
                console.error('Error fetching campaigns:', err);
                setError('Failed to load campaigns. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Browse Campaigns</h1>
                        <p className="text-lg text-slate-600 max-w-2xl">Discover and support verified campaigns that are making a real difference in the world.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                className="w-full md:w-64 pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                            />
                        </div>
                        <button className="p-3 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 text-slate-600 transition-colors flex-shrink-0">
                            <FiFilter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-dark"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-8 bg-red-50 rounded-2xl border border-red-100">
                        {error}
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="text-center text-slate-500 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        No campaigns found. Check back later!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map((campaign, index) => {
                            const raised = campaign.raisedAmount || 0;
                            const goal = campaign.goalAmount || 1; // Prevent division by zero
                            const progress = Math.min(Math.round((raised / goal) * 100), 100);

                            // Calculate days left
                            const endDate = new Date(campaign.endDate);
                            const today = new Date();
                            const diffTime = endDate - today;
                            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    key={campaign._id}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={campaign.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                                            {campaign.category}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-sm font-medium text-indigo-600 mb-2">
                                            {campaign.organization?.name || 'Verified Organization'}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">{campaign.title}</h3>

                                        <div className="mt-auto">
                                            <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                                <span>₹{raised.toLocaleString()} raised</span>
                                                <span className="text-slate-500">{progress}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                                                ></motion.div>
                                            </div>

                                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                                                <div className="text-sm text-slate-500">
                                                    <span className="font-semibold text-slate-700">{daysLeft > 0 ? daysLeft : 0}</span> days left
                                                </div>
                                                <Link
                                                    to={`/campaigns/${campaign._id}`}
                                                    className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                                                >
                                                    View Details <FiArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
