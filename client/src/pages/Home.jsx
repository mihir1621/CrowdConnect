import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';
import heroImage from '../assets/hero-hands.jpg';

const Home = () => {
    return (
        <div className="bg-cream min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light border border-slate-200/60 mb-8">
                            <FiShield className="w-4 h-4 text-brand-dark" />
                            <span className="text-xs font-medium text-brand-dark tracking-wide">
                                Only verified organizations. Nothing else.
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            Fund the causes<br />
                            that <span className="text-brand-dark">actually</span><br />
                            <span className="text-brand-dark">change lives.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                            CrowdConnect is where NGOs, hospitals, schools and social causes meet donors who care. Every campaign is verified. Every rupee is tracked. Every story is real.
                        </p>

                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
                    >
                        <img
                            src={heroImage}
                            alt="Hands stacked together in unity"
                            className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-xl shadow-brand-dark/5"
                        />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Home;
