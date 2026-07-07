import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiDollarSign, FiHeart, FiTrendingUp, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/me');
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]);

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-8 flex items-center justify-center">
                <div className="text-slate-500">Loading dashboard...</div>
            </div>
        );
    }

    const { user, stats, recentDonations } = userData || {
        user: { name: currentUser?.displayName || 'User', role: 'Visitor' },
        stats: { totalDonated: 0, campaignsSupported: 0, impactScore: 0 },
        recentDonations: []
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
    };

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">{user.name}</h2>
                                    <p className="text-sm text-slate-500">{user.role}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-medium transition-colors">
                                    <FiActivity /> Overview
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
                                    <FiHeart /> My Donations
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
                                    <FiSettings /> Settings
                                </a>
                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors">
                                        <FiLogOut /> Sign Out
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Donated</h3>
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <FiDollarSign />
                                    </div>
                                </div>
                                <p className="text-4xl font-extrabold text-slate-900">₹{stats.totalDonated.toLocaleString()}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Campaigns Supported</h3>
                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                        <FiHeart />
                                    </div>
                                </div>
                                <p className="text-4xl font-extrabold text-slate-900">{stats.campaignsSupported}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Impact Score</h3>
                                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                        <FiTrendingUp />
                                    </div>
                                </div>
                                <p className="text-4xl font-extrabold text-slate-900">{stats.impactScore}</p>
                            </motion.div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-slate-900">Recent Donations</h2>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All</button>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {recentDonations.length > 0 ? recentDonations.map((donation, i) => (
                                    <div key={donation._id || i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-200 rounded-xl overflow-hidden">
                                                <img src={donation.campaign?.image || `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} alt="Campaign" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{donation.campaign?.title || 'Unknown Campaign'}</h4>
                                                <p className="text-sm text-slate-500">Donated on {new Date(donation.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1.5">
                                            <p className="font-bold text-slate-900">+₹{donation.amount.toLocaleString()}</p>
                                            <div className="flex gap-1.5">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${donation.paymentMethod === 'Crypto'
                                                        ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                                    }`}>
                                                    {donation.paymentMethod === 'Crypto' ? '🦊 MetaMask' : '💳 Razorpay'}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">
                                                    Successful
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-6 text-center text-slate-500">
                                        No recent donations found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
