import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShare2, FiHeart, FiClock, FiShield, FiCheckCircle } from 'react-icons/fi';

const CampaignDetails = () => {
    const { id } = useParams();

    // Mock data
    const campaign = {
        id,
        title: 'Clean Water Initiative in Rural Kenya',
        organization: 'Water for All',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        goal: 50000,
        raised: 35000,
        donors: 1240,
        daysLeft: 12,
        description: `Access to clean water is a fundamental human right, yet millions in rural Kenya still lack this basic necessity. Our initiative aims to build 50 sustainable solar-powered water wells in the most affected communities. 
    
These wells will not only provide safe drinking water but also improve sanitation, reduce waterborne diseases, and allow children—especially girls—to attend school instead of walking miles to fetch water.

Your contribution will directly fund the drilling, equipment, and community training needed to maintain these water sources for generations to come. Join us in making a lasting impact.`,
    };

    const progress = (campaign.raised / campaign.goal) * 100;

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-64 md:h-96 w-full">
                        <img
                            src={campaign.image}
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
                            <p className="text-lg text-white/80 font-medium">by {campaign.organization}</p>
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
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                            WA
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{campaign.organization}</p>
                                            <p className="text-xs text-slate-500">2 days ago</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600">We've just secured the permits for the first 10 wells! Thank you to everyone who has donated so far. Drilling begins next week.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Donation Panel */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <div className="mb-8">
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-extrabold text-slate-900">${campaign.raised.toLocaleString()}</span>
                                        <span className="text-lg text-slate-500 mb-1">raised of ${campaign.goal.toLocaleString()}</span>
                                    </div>

                                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                                        ></motion.div>
                                    </div>

                                    <div className="flex justify-between text-sm font-medium text-slate-600 mb-8">
                                        <div className="flex items-center gap-1"><FiHeart className="text-pink-500" /> {campaign.donors} donors</div>
                                        <div className="flex items-center gap-1"><FiClock className="text-indigo-500" /> {campaign.daysLeft} days left</div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Make a Donation</h3>
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {[25, 50, 100, 250].map((amount) => (
                                                <button key={amount} className="py-3 border-2 border-slate-100 rounded-xl font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                                    ${amount}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative mb-6">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                                            <input
                                                type="number"
                                                placeholder="Custom Amount"
                                                className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors font-medium"
                                            />
                                        </div>
                                        <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
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
