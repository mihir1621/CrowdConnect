import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await register(email, password, 'Donor', name);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign in with Google.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex bg-cream">
            {/* Left Side - Image & Atmosphere */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Team hands together"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent"></div>

                {/* Seamless blend gradient */}
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-r from-transparent to-cream z-0 pointer-events-none"></div>

                {/* Floating Badge */}
                <div className="absolute top-8 left-8 z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 shadow-2xl"
                    >
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                            <FiCheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-base">100% Verified</p>
                            <p className="text-white/80 text-xs">Trusted organizations</p>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 flex flex-col justify-end p-8 lg:p-12 text-white h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                <FiHeart className="w-4 h-4 fill-white" />
                            </div>
                            <span className="text-lg font-bold font-serif tracking-tight">CrowdConnect</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold font-serif leading-tight mb-4">
                            "The best way to find yourself is to lose yourself in the service of others."
                        </h2>
                        <p className="text-base text-white/80 max-w-md">
                            Start your journey today. Create an account to fund causes you care about or start your own campaign.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12 xl:px-20">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-8 text-center lg:text-left">
                        <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-brand-dark rounded-full flex items-center justify-center">
                                <FiHeart className="w-4 h-4 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold font-serif text-brand-dark tracking-tight">CrowdConnect</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-2">Create an account</h1>
                        <p className="text-sm text-slate-600">Join thousands of changemakers today.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                        >
                            <FcGoogle className="w-5 h-5" />
                            <span className="text-sm font-semibold text-slate-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50">
                            <FaApple className="w-5 h-5 text-slate-900" />
                            <span className="text-sm font-semibold text-slate-700">Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-cream px-4 text-slate-500 font-medium">Or register with email</span>
                        </div>
                    </div>

                    <form className="space-y-8 mt-8" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer block w-full border-0 border-b-2 border-slate-200 bg-transparent py-2 px-0 text-base sm:text-lg text-slate-900 focus:border-brand-dark focus:ring-0 transition-colors placeholder-transparent"
                                placeholder="Full Name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 -top-5 text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-dark cursor-text"
                            >
                                Full Name
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer block w-full border-0 border-b-2 border-slate-200 bg-transparent py-2 px-0 text-base sm:text-lg text-slate-900 focus:border-brand-dark focus:ring-0 transition-colors placeholder-transparent"
                                placeholder="Email address"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 -top-5 text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-dark cursor-text"
                            >
                                Email address
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer block w-full border-0 border-b-2 border-slate-200 bg-transparent py-2 px-0 text-base sm:text-lg text-slate-900 focus:border-brand-dark focus:ring-0 transition-colors placeholder-transparent"
                                placeholder="Password"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-0 -top-5 text-xs font-bold text-slate-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-dark cursor-text"
                            >
                                Password
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="relative flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded-md border-2 border-slate-300 checked:border-brand-dark checked:bg-brand-dark transition-all"
                                    />
                                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <label htmlFor="terms" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                                    I agree to the <a href="#" className="font-bold text-brand-dark hover:underline">Terms</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark pl-5 pr-1.5 py-1.5 text-sm font-bold text-white overflow-hidden transition-transform hover:-translate-y-0.5 w-full sm:w-auto disabled:opacity-70"
                            >
                                <span className="relative z-10">{loading ? 'Signing up...' : 'Sign up'}</span>
                                <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <div className="absolute inset-0 bg-brand-dark/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-brand-dark hover:text-brand-dark/80 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
