import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiArrowRight, FiStar, FiHeart } from 'react-icons/fi';
import { LuSearch, LuHeartHandshake, LuTrendingUp, LuShieldCheck, LuReceipt, LuEye, LuLock, LuChevronDown } from 'react-icons/lu';
import heroImage from '../assets/hero-hands.jpg';
import successStoryImage from '../assets/success-story-girl.png';
import successStoryMedical from '../assets/success-story-medical.png';
import successStoryDisaster from '../assets/success-story-disaster.png';
import campaignEnvironment from '../assets/campaign-environment.png';
import api from '../utils/api';

const names = ['Anaya', 'Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sneha', 'Rohan'];
const causes = ['treatment', 'education', 'surgery', 'relief fund', 'startup', 'community project'];
const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

const Home = () => {
    const navigate = useNavigate();
    const [liveDonation, setLiveDonation] = useState({
        amount: 18200,
        name: "Anaya's",
        cause: "treatment",
        time: 3,
        location: "Mumbai"
    });

    const [stats, setStats] = useState({
        raised: 133,
        donors: 891,
        orgs: 2345
    });

    const [openFaq, setOpenFaq] = useState(null);
    const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
    const [allCampaigns, setAllCampaigns] = useState([]);
    const [quickCampaignId, setQuickCampaignId] = useState('');
    const [quickAmount, setQuickAmount] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        // Fetch featured campaigns
        const fetchFeatured = async () => {
            try {
                const response = await api.get('/campaigns');
                setAllCampaigns(response.data);
                setFeaturedCampaigns(response.data.slice(0, 3));
                if (response.data.length > 0) {
                    setQuickCampaignId(response.data[0]._id);
                }
            } catch (error) {
                console.error("Error fetching featured campaigns:", error);
            }
        };
        fetchFeatured();

        // Randomize floating card every 5-8 seconds
        const interval = setInterval(() => {
            const randomAmount = Math.floor(Math.random() * 50000) + 1000;
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCause = causes[Math.floor(Math.random() * causes.length)];
            const randomTime = Math.floor(Math.random() * 59) + 1;
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];

            setLiveDonation({
                amount: randomAmount,
                name: `${randomName}'s`,
                cause: randomCause,
                time: randomTime,
                location: randomLocation
            });
        }, 6000);



        return () => clearInterval(interval);
    }, []);

    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#how-it-works') {
            const element = document.getElementById('how-it-works');
            if (element) {
                // Small delay to ensure rendering is complete
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.hash]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.getElementById('quick-campaign-dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleQuickDonate = (e) => {
        e.preventDefault();
        if (!quickCampaignId) {
            alert('Please select a campaign');
            return;
        }
        const amount = Number(quickAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }
        navigate(`/donate/${quickCampaignId}?amount=${amount}`);
    };

    const selectedCampaign = allCampaigns.find(c => c._id === quickCampaignId);

    return (
        <>
            <div className="bg-cream min-h-[calc(100vh-80px)] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-4">

                        {/* Left Column - Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-xl"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light border border-slate-200/60 mb-4">
                                <FiShield className="w-3.5 h-3.5 text-brand-dark" />
                                <span className="text-[11px] sm:text-xs font-medium text-brand-dark tracking-wide">
                                    Only verified organizations. Nothing else.
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold font-serif text-slate-900 leading-[1.1] mb-3 tracking-tight">
                                Fund the causes<br />
                                that <span className="text-brand-dark">actually</span><br />
                                <span className="text-brand-dark">change lives.</span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 max-w-lg">
                                CrowdConnect is where NGOs, hospitals, schools and social causes meet donors who care. Every campaign is verified. Every rupee is tracked. Every story is real.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                                <Link
                                    to="/campaigns"
                                    className="w-full sm:w-auto rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-brand-dark/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Browse campaigns <FiArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/register"
                                    className="w-full sm:w-auto rounded-full bg-transparent px-6 py-3 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 flex items-center justify-center"
                                >
                                    Start a campaign
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Raised</p>
                                    <p className="text-xl sm:text-2xl font-bold font-serif text-slate-900">₹{stats.raised} Cr</p>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Donors</p>
                                    <p className="text-xl sm:text-2xl font-bold font-serif text-slate-900">{stats.donors}k+</p>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Orgs</p>
                                    <p className="text-xl sm:text-2xl font-bold font-serif text-slate-900">{stats.orgs.toLocaleString()}+</p>
                                </div>
                            </div>

                        </motion.div>

                        {/* Right Column - Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative h-[250px] sm:h-[350px] lg:h-[380px] w-full mt-8 lg:mt-0"
                        >
                            <img
                                src={heroImage}
                                alt="Hands stacked together in unity"
                                className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-xl shadow-brand-dark/5"
                            />

                            {/* Floating Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={liveDonation.time + liveDonation.amount}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute -bottom-6 -left-6 sm:bottom-8 sm:-left-12 bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/40 max-w-[260px]"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Live Now</span>
                                    </div>
                                    <p className="text-sm font-bold font-serif text-slate-900 leading-snug mb-1">
                                        ₹{liveDonation.amount.toLocaleString()} just donated to {liveDonation.name} {liveDonation.cause}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {liveDonation.time} seconds ago · {liveDonation.location}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                    </div>
                </div>

            </div>

            {/* Quick Donate Section */}
            <div className="bg-white py-16 border-t border-slate-200/60">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4 text-xs font-semibold text-indigo-300">
                                <FiHeart className="w-3.5 h-3.5 fill-indigo-300" /> Quick Donation
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 tracking-tight">
                                Support a Cause in Seconds
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base">
                                Select a campaign, choose an amount, and make an impact instantly.
                            </p>
                        </div>

                        <form onSubmit={handleQuickDonate} className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campaign Selector */}
                                <div className="space-y-2 relative" id="quick-campaign-dropdown">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Select Campaign</label>
                                    <button
                                        type="button"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-left text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all flex items-center justify-between gap-3 cursor-pointer"
                                    >
                                        {selectedCampaign ? (
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <span className="text-lg flex-shrink-0">
                                                    {selectedCampaign.category === 'Medical' ? '❤️' :
                                                        selectedCampaign.category === 'Education' ? '📚' :
                                                            selectedCampaign.category === 'Environment' ? '🌿' :
                                                                selectedCampaign.category === 'Animals' ? '🐾' : '🤝'}
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold truncate text-white">{selectedCampaign.title}</p>
                                                    <p className="text-[10px] text-slate-300 font-medium">{selectedCampaign.category}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">Select a campaign...</span>
                                        )}
                                        <LuChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                                            >
                                                {allCampaigns.map((campaign) => (
                                                    <button
                                                        key={campaign._id}
                                                        type="button"
                                                        onClick={() => {
                                                            setQuickCampaignId(campaign._id);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0 ${quickCampaignId === campaign._id ? 'bg-white/5' : ''}`}
                                                    >
                                                        <span className="text-lg flex-shrink-0">
                                                            {campaign.category === 'Medical' ? '❤️' :
                                                                campaign.category === 'Education' ? '📚' :
                                                                    campaign.category === 'Environment' ? '🌿' :
                                                                        campaign.category === 'Animals' ? '🐾' : '🤝'}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-white truncate">{campaign.title}</p>
                                                            <p className="text-[10px] text-slate-400 font-medium">{campaign.category}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Amount Selector */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Donation Amount (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">₹</span>
                                        <input
                                            type="number"
                                            required
                                            min="10"
                                            value={quickAmount}
                                            onChange={(e) => setQuickAmount(e.target.value)}
                                            placeholder="Enter Amount"
                                            className="w-full bg-white/10 border border-white/20 rounded-2xl pl-8 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Preset Buttons & Submit Button */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                    {[500, 1000, 2000, 5000].map((amt) => (
                                        <button
                                            type="button"
                                            key={amt}
                                            onClick={() => setQuickAmount(amt.toString())}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${quickAmount === amt.toString()
                                                ? 'bg-white text-indigo-950 border-white'
                                                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            ₹{amt}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    Donate Now <FiArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <div className="w-full border-t border-slate-200/60 bg-cream/50 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">
                        Trusted by 2,345+ verified organizations
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Ashadeep Foundation', 'Goonj', 'SELCO Foundation', 'St. Jude India', 'HealHands Trust', 'Teach For India'].map((org, index) => (
                            <span key={index} className="text-lg sm:text-xl font-serif font-semibold text-slate-700">
                                {org}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Causes making a difference right now */}
            <div className="bg-cream py-20 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12 relative">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                Featured
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4 tracking-tight">
                            Causes making a difference right now
                        </h2>
                        <p className="text-base text-slate-600 mb-6">
                            Hand-picked campaigns from verified organizations that need your support this week.
                        </p>
                        <Link to="/campaigns" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-brand-dark hover:text-brand-dark/80 transition-colors">
                            Browse campaigns <FiArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCampaigns.length > 0 ? featuredCampaigns.map((campaign) => {
                            const raised = campaign.raisedAmount || 0;
                            const goal = campaign.goalAmount || 1;
                            const progress = Math.min(Math.round((raised / goal) * 100), 100);

                            const endDate = new Date(campaign.endDate);
                            const today = new Date();
                            const diffTime = endDate - today;
                            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            return (
                                <Link to={`/campaigns/${campaign._id}`} key={campaign._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                    <div className="relative h-56">
                                        <img src={campaign.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-medium text-slate-700 shadow-sm">
                                            {campaign.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{campaign.organization?.name || 'Verified Organization'}</p>
                                        <h3 className="text-xl font-bold font-serif text-slate-900 mb-3 line-clamp-2">{campaign.title}</h3>
                                        <p className="text-sm text-slate-600 mb-6 line-clamp-2">{campaign.description}</p>

                                        <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
                                            <div className="bg-brand-dark h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm mb-4">
                                            <div><span className="font-bold text-slate-900">₹{raised.toLocaleString()}</span> <span className="text-slate-500">of ₹{goal.toLocaleString()}</span></div>
                                            <div className="text-slate-500">{progress}%</div>
                                        </div>

                                        <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-100">
                                            <div>{campaign.donors?.length || 0} donors</div>
                                            <div>{daysLeft > 0 ? daysLeft : 0} days left</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div className="col-span-3 text-center py-12 text-slate-500">
                                Loading featured campaigns...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-cream py-20 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                Categories
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 mb-6 tracking-tight">
                            Find a cause close to your heart
                        </h2>
                        <p className="text-base md:text-lg text-slate-600">
                            From medical emergencies to education and disaster relief — pick what moves you.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: "❤️", title: "Medical", count: "214" },
                            { icon: "📚", title: "Education", count: "189" },
                            { icon: "🌊", title: "Disaster Relief", count: "47" },
                            { icon: "🐾", title: "Animals", count: "96" },
                            { icon: "🌿", title: "Environment", count: "78" },
                            { icon: "🤝", title: "Women & Girls", count: "132" },
                            { icon: "🍚", title: "Hunger", count: "68" },
                            { icon: "🏅", title: "Sports", count: "41" }
                        ].map((category, index) => (
                            <Link
                                key={index}
                                to={`/campaigns?category=${category.title.toLowerCase()}`}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group flex flex-col items-start"
                            >
                                <div className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-bold font-serif text-slate-900 mb-1">
                                    {category.title}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {category.count} live campaigns
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it works Section */}
            <div id="how-it-works" className="bg-cream py-20 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                How it works
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 tracking-tight">
                            Give with confidence in three simple steps
                        </h2>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                        {/* Step 1 */}
                        <div className="relative bg-white p-8 pt-12 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="absolute -top-5 left-8 w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                1
                            </div>
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <LuSearch className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">
                                Discover verified causes
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Browse campaigns from organizations we've legally verified — 80G certificates, audited books, board diligence.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative bg-white p-8 pt-12 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="absolute -top-5 left-8 w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                2
                            </div>
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <LuHeartHandshake className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">
                                Donate securely
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                One-click checkout with UPI, cards, netbanking. 80G tax receipt in your inbox within seconds.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative bg-white p-8 pt-12 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="absolute -top-5 left-8 w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                3
                            </div>
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <LuTrendingUp className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">
                                Track your impact
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Quarterly impact reports, photo updates, and audited proof of use. See exactly where your money went.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why CrowdConnect Section */}
            <div className="bg-brand-dark py-24 border-t border-brand-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-amber-400" />
                                Why CrowdConnect
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6 tracking-tight leading-tight">
                            Trust isn't a feature.<br />It's the foundation.
                        </h2>
                        <p className="text-base md:text-lg text-slate-300 mx-auto leading-relaxed">
                            We built CrowdConnect because donors deserve to know their money reaches the people they want to help — provably.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20">
                                <LuShieldCheck className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-white mb-3">
                                Legally verified only
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Every org submits registration, 80G, 12A, audited financials, and board KYC. No exceptions.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20">
                                <LuReceipt className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-white mb-3">
                                97.5% reaches the cause
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Flat 2.5% platform fee. No hidden charges. Ever. The rest goes where you intended.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20">
                                <LuEye className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-white mb-3">
                                Radical transparency
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Public updates, quarterly impact reports, and audited proof of use for every withdrawal.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20">
                                <LuLock className="w-6 h-6 text-brand-dark" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-white mb-3">
                                Bank-grade security
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                PCI DSS payments, end-to-end encryption, and RBI-compliant escrow for large campaigns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Stories Section */}
            <div className="bg-cream py-24 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                Success Stories
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 mb-6 tracking-tight">
                            Real people. Real outcomes. Real proof.
                        </h2>
                        <p className="text-base md:text-lg text-slate-600">
                            Every one of these started as a campaign on CrowdConnect.
                        </p>
                    </div>
                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative h-[400px] sm:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl shadow-brand-dark/5">
                            <img
                                src={successStoryImage}
                                alt="Young girl reading a book in a classroom"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="max-w-xl">
                            <p className="text-xs font-bold text-brand-dark uppercase tracking-[0.2em] mb-4">
                                Education
                            </p>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                                12 libraries. 4,800 children. One monsoon.
                            </h3>
                            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                                Ashadeep Foundation raised ₹6 lakhs in 18 days and opened 12 school libraries in rural Bihar before the school year began.
                            </p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100/50 text-sm font-semibold text-slate-800 border border-amber-200/50">
                                4,800 children reading
                            </div>
                        </div>
                    </div>

                    {/* Story 2 (Reversed Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
                        {/* Text Content (Left on desktop) */}
                        <div className="max-w-xl order-2 lg:order-1">
                            <p className="text-xs font-bold text-brand-dark uppercase tracking-[0.2em] mb-4">
                                Medical
                            </p>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                                Anaya walked out of the hospital in June.
                            </h3>
                            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                                3,921 donors funded her leukemia treatment. Today she's back in school and dreaming of becoming a doctor.
                            </p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100/50 text-sm font-semibold text-slate-800 border border-amber-200/50">
                                ₹28 L raised
                            </div>
                        </div>

                        {/* Image (Right on desktop) */}
                        <div className="relative h-[400px] sm:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl shadow-brand-dark/5 order-1 lg:order-2">
                            <img
                                src={successStoryMedical}
                                alt="Doctor checking on a smiling elderly patient"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Story 3 (Standard Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
                        {/* Image */}
                        <div className="relative h-[400px] sm:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl shadow-brand-dark/5">
                            <img
                                src={successStoryDisaster}
                                alt="People distributing relief materials in a village"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="max-w-xl">
                            <p className="text-xs font-bold text-brand-dark uppercase tracking-[0.2em] mb-4">
                                Disaster Relief
                            </p>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                                40 villages, 72 hours, zero delays.
                            </h3>
                            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                                Goonj's Assam flood response reached 40 villages with dry rations, tarps, and dignity kits within three days.
                            </p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100/50 text-sm font-semibold text-slate-800 border border-amber-200/50">
                                12,000 families
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats & Testimonials Section */}
            <div className="bg-cream py-24 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Stats Card */}
                    <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 mb-32">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold font-serif text-brand-dark mb-2">₹127 Cr+</div>
                                <div className="text-sm text-slate-500">Raised for causes</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold font-serif text-brand-dark mb-2">2,400+</div>
                                <div className="text-sm text-slate-500">Verified organizations</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold font-serif text-brand-dark mb-2">1.8 M</div>
                                <div className="text-sm text-slate-500">Lives touched</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold font-serif text-brand-dark mb-2">34</div>
                                <div className="text-sm text-slate-500">Countries reached</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                Testimonials
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 tracking-tight">
                            From the people who use it every day
                        </h2>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="text-amber-400 text-4xl font-serif leading-none mb-4">"</div>
                            <p className="text-slate-700 font-serif text-lg leading-relaxed mb-8 flex-grow">
                                "CrowdConnect made it possible for our small NGO to raise ₹18 lakhs in three weeks. The trust badge changed everything."
                            </p>
                            <div>
                                <p className="font-bold text-slate-900">Priya Menon</p>
                                <p className="text-sm text-slate-500">Founder, Ashadeep Foundation</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="text-amber-400 text-4xl font-serif leading-none mb-4">"</div>
                            <p className="text-slate-700 font-serif text-lg leading-relaxed mb-8 flex-grow">
                                "I donate every month here because I can actually see the impact reports. Transparency you can feel."
                            </p>
                            <div>
                                <p className="font-bold text-slate-900">Rahul Verma</p>
                                <p className="text-sm text-slate-500">Monthly donor since 2023</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="text-amber-400 text-4xl font-serif leading-none mb-4">"</div>
                            <p className="text-slate-700 font-serif text-lg leading-relaxed mb-8 flex-grow">
                                "The verification process is rigorous — and that's exactly why our donors keep coming back."
                            </p>
                            <div>
                                <p className="font-bold text-slate-900">Dr. Anjali Rao</p>
                                <p className="text-sm text-slate-500">Trustee, HealHands Trust</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Campaigns Section */}
            <div className="bg-cream py-24 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                                <FiStar className="w-4 h-4 fill-brand-dark" />
                                LATEST
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 tracking-tight">
                            Fresh campaigns, added this week
                        </h2>
                    </div>

                    {/* Campaigns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCampaigns.length > 0 ? featuredCampaigns.slice(0, 4).map((campaign) => {
                            const raised = campaign.raisedAmount || 0;
                            const goal = campaign.goalAmount || 1;
                            const progress = Math.min(Math.round((raised / goal) * 100), 100);

                            const endDate = new Date(campaign.endDate);
                            const today = new Date();
                            const diffTime = endDate - today;
                            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            return (
                                <Link to={`/campaigns/${campaign._id}`} key={`latest-${campaign._id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                                    <div className="relative h-48">
                                        <img src={campaign.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-medium text-slate-700 shadow-sm">
                                            {campaign.category}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{campaign.organization?.name || 'Verified Organization'}</p>
                                        <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 line-clamp-2">{campaign.title}</h3>
                                        <p className="text-xs text-slate-600 mb-4 line-clamp-2 flex-grow">{campaign.description}</p>

                                        <div className="mt-auto">
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                                                <div className="bg-brand-dark h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <div className="flex justify-between items-center text-xs mb-3">
                                                <div><span className="font-bold text-slate-900">₹{raised.toLocaleString()}</span> <span className="text-slate-500">of ₹{goal.toLocaleString()}</span></div>
                                                <div className="text-slate-500">{progress}%</div>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-3 border-t border-slate-100">
                                                <div>{campaign.donors?.length || 0} donors</div>
                                                <div>{daysLeft > 0 ? daysLeft : 0} days left</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div className="col-span-4 text-center py-12 text-slate-500">
                                Loading latest campaigns...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-cream py-24 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Centered QUESTIONS Label */}
                    <div className="flex items-center justify-center mb-12">
                        <p className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-dark uppercase tracking-[0.2em]">
                            <FiStar className="w-4 h-4 fill-brand-dark" />
                            QUESTIONS
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Left Column - Header */}
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 mb-6 tracking-tight leading-tight">
                                Everything you might be wondering
                            </h2>
                            <p className="text-base text-slate-600 leading-relaxed">
                                If we haven't answered it here, our team replies within 4 hours on any business day.
                            </p>
                        </div>

                        {/* Right Column - Accordion */}
                        <div className="lg:col-span-7">
                            <div className="divide-y divide-slate-200/60">
                                {[
                                    {
                                        q: "How does CrowdConnect verify organizations?",
                                        a: "We require every organization to submit their registration certificate, 80G/12A certificates, audited financials for the last 3 years, and KYC documents of board members. Our legal team verifies these before any campaign goes live."
                                    },
                                    {
                                        q: "What percentage of my donation reaches the cause?",
                                        a: "97.5% of your donation reaches the cause. We charge a flat 2.5% platform fee to cover payment gateway charges and operational costs. There are no hidden fees."
                                    },
                                    {
                                        q: "Are donations tax-deductible?",
                                        a: "Yes, donations to organizations with an 80G certificate are tax-deductible. You will receive an 80G receipt in your inbox immediately after a successful donation."
                                    },
                                    {
                                        q: "How do I know my money is being used correctly?",
                                        a: "Organizations are required to post regular updates on their campaigns. For large campaigns, funds are released in tranches based on audited proof of use and milestone completion."
                                    },
                                    {
                                        q: "Can I donate anonymously?",
                                        a: "Yes, you can choose to hide your name from the public donor wall during checkout. However, you will still need to provide your details for the 80G tax receipt."
                                    }
                                ].map((faq, index) => (
                                    <div key={index} className="py-6">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between text-left focus:outline-none group"
                                        >
                                            <span className="text-lg font-serif font-bold text-slate-900 group-hover:text-brand-dark transition-colors">
                                                {faq.q}
                                            </span>
                                            <LuChevronDown
                                                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pt-4 text-slate-600 leading-relaxed">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Home;
