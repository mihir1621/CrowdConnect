import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiArrowLeft, FiShield, FiCheckCircle, FiMessageSquare, FiUser, FiMail, FiDollarSign } from 'react-icons/fi';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const Donate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { currentUser } = useAuth();

    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Form states
    const [amount, setAmount] = useState(searchParams.get('amount') || '');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await api.get(`/campaigns/${id}`);
                setCampaign(response.data);
            } catch (err) {
                console.error('Error fetching campaign:', err);
                setError('Failed to load campaign details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
        loadRazorpayScript();
    }, [id]);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || '');
            setEmail(currentUser.email || '');
        }
    }, [currentUser]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            navigate('/login');
            return;
        }

        const donationAmount = Number(amount);
        if (!donationAmount || donationAmount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order on Backend
            const orderRes = await api.post('/payments/create-order', {
                amount: donationAmount,
                campaignId: id
            });

            const order = orderRes.data;

            // 2. Configure Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mock',
                amount: order.amount,
                currency: order.currency,
                name: 'CrowdConnect',
                description: `Donation for ${campaign.title}`,
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // 3. Verify Payment on Backend
                        const verifyRes = await api.post('/payments/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: donationAmount,
                            campaignId: id,
                            donorName: name,
                            message: message // Optional message of support
                        });

                        setPaymentDetails({
                            paymentId: response.razorpay_payment_id,
                            amount: donationAmount,
                            orderId: response.razorpay_order_id
                        });
                        setPaymentSuccess(true);
                    } catch (err) {
                        console.error('Payment verification failed:', err);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                },
                theme: {
                    color: '#1e1b4b' // brand-dark
                }
            };

            // Mock payment simulation for development
            if (order.id.startsWith('order_mock_')) {
                setTimeout(() => {
                    options.handler({
                        razorpay_order_id: order.id,
                        razorpay_payment_id: `pay_mock_${Date.now()}`,
                        razorpay_signature: 'mock_signature'
                    });
                }, 1500);
                return;
            }

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert(`Payment failed: ${response.error.description}`);
                setIsProcessing(false);
            });
            rzp.open();

        } catch (err) {
            console.error('Error initiating payment:', err);
            alert('Failed to initiate payment. Please try again.');
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md">
                    <p className="text-red-500 font-medium mb-4">{error || 'Campaign not found.'}</p>
                    <Link to="/campaigns" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
                        <FiArrowLeft /> Back to Campaigns
                    </Link>
                </div>
            </div>
        );
    }

    const raised = campaign.raisedAmount || 0;
    const goal = campaign.goalAmount || 1;
    const progress = Math.min((raised / goal) * 100, 100);

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-8 transition-colors"
                >
                    <FiArrowLeft /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Campaign Summary */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="h-48 relative">
                                <img
                                    src={campaign.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                                    {campaign.category}
                                </span>
                            </div>
                            <div className="p-6 space-y-4">
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">You are supporting</span>
                                <h2 className="text-xl font-bold text-slate-900 leading-snug">{campaign.title}</h2>
                                <p className="text-sm text-slate-500">by {campaign.organization?.name || 'Verified Organization'}</p>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                        <span>₹{raised.toLocaleString()} raised</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 flex gap-4 items-start">
                            <FiShield className="text-indigo-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-indigo-950 text-sm mb-1">Secure & Trusted Payments</h4>
                                <p className="text-xs text-indigo-800/80 leading-relaxed">
                                    Your donation is protected by industry-standard encryption. Funds are directly transferred to the verified organization.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Donation Form / Success Screen */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10 relative overflow-hidden min-h-[450px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {!paymentSuccess ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Enter Donation Details</h1>
                                            <p className="text-slate-500 text-sm">Choose an amount and fill in your details to complete the donation.</p>
                                        </div>

                                        <form onSubmit={handlePayment} className="space-y-6">
                                            {/* Quick Select Amounts */}
                                            <div className="space-y-3">
                                                <label className="block text-sm font-semibold text-slate-700">Select Amount</label>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {[500, 1000, 2000, 5000].map((amt) => (
                                                        <button
                                                            type="button"
                                                            key={amt}
                                                            onClick={() => setAmount(amt.toString())}
                                                            className={`py-3 border-2 rounded-2xl font-bold text-sm transition-all ${amount === amt.toString()
                                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                                : 'border-slate-100 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30'
                                                                }`}
                                                        >
                                                            ₹{amt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Custom Amount Input */}
                                            <div className="relative">
                                                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <input
                                                    type="number"
                                                    required
                                                    min="10"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Enter Custom Amount"
                                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-indigo-600 transition-colors font-semibold text-lg"
                                                />
                                            </div>

                                            {/* Personal Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Your Name"
                                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Email Address"
                                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Message of Support */}
                                            <div className="relative">
                                                <FiMessageSquare className="absolute left-4 top-4 text-slate-400" />
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Write a message of support (optional)"
                                                    rows="3"
                                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isProcessing}
                                                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                {isProcessing ? (
                                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <>Proceed to Pay ₹{Number(amount || 0).toLocaleString()} <FiHeart /></>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center space-y-6 py-8"
                                    >
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                            <FiCheckCircle className="w-12 h-12" />
                                        </div>

                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-extrabold text-slate-900">Donation Successful!</h2>
                                            <p className="text-slate-500">Thank you for making a difference.</p>
                                        </div>

                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 max-w-md mx-auto text-left space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Amount Paid:</span>
                                                <span className="font-bold text-slate-950">₹{paymentDetails?.amount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Payment ID:</span>
                                                <span className="font-mono text-slate-700">{paymentDetails?.paymentId}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Order ID:</span>
                                                <span className="font-mono text-slate-700">{paymentDetails?.orderId}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Link
                                                to={`/campaigns/${id}`}
                                                className="inline-flex items-center justify-center px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                                            >
                                                Back to Campaign
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
