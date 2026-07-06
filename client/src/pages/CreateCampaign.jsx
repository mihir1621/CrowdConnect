import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiDollarSign, FiCalendar, FiFileText, FiTag, FiImage } from 'react-icons/fi';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        category: 'Medical',
        goalAmount: '',
        endDate: '',
        image: '',
        description: ''
    });

    const categories = [
        'Medical', 'Education', 'Environment', 'Disaster Relief', 'Community', 'Animals', 'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/campaigns', {
                ...formData,
                goalAmount: Number(formData.goalAmount)
            });

            navigate(`/campaigns/${response.data._id}`);
        } catch (err) {
            console.error('Error creating campaign:', err);
            setError(err.response?.data?.message || 'Failed to create campaign. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-serif">Start a New Campaign</h1>
                    <p className="text-slate-600 text-lg">Fill in the details below to launch your fundraising campaign.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Basic Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Basic Details</h2>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Title</label>
                                <div className="relative">
                                    <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Clean Water Initiative in Rural Kenya"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                    <div className="relative">
                                        <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <select
                                            name="category"
                                            required
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all appearance-none bg-white"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Goal Amount (₹)</label>
                                    <div className="relative">
                                        <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number"
                                            name="goalAmount"
                                            required
                                            min="1000"
                                            value={formData.goalAmount}
                                            onChange={handleChange}
                                            placeholder="50000"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media & Timeline */}
                        <div className="space-y-6 pt-4">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Media & Timeline</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Image URL</label>
                                    <div className="relative">
                                        <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="url"
                                            name="image"
                                            required
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                                    <div className="relative">
                                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="date"
                                            name="endDate"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {formData.image && (
                                <div className="mt-4 rounded-xl overflow-hidden h-48 border border-slate-200">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>

                        {/* Story */}
                        <div className="space-y-6 pt-4">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. The Story</h2>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="6"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell potential donors why you are raising funds, how the money will be used, and the impact it will have..."
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-dark/20 hover:bg-brand-dark/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiUploadCloud className="w-5 h-5" />
                                        Launch Campaign
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                By launching this campaign, you agree to our Terms of Service and Trust & Safety guidelines.
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateCampaign;
