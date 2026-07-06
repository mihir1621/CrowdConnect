import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit3, FiTarget, FiShare2, FiDollarSign, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const StartCampaign = () => {
    const steps = [
        { icon: <FiEdit3 className="w-6 h-6" />, title: "Tell your story", description: "Write a compelling description of your cause. Add photos and videos that show the real impact of donations." },
        { icon: <FiTarget className="w-6 h-6" />, title: "Set your goal", description: "Define how much you need and create a clear budget breakdown so donors know exactly where their money goes." },
        { icon: <FiShare2 className="w-6 h-6" />, title: "Share far & wide", description: "Use built-in sharing tools to spread your campaign across social media, email, and messaging platforms." },
        { icon: <FiDollarSign className="w-6 h-6" />, title: "Receive funds", description: "Donations are securely processed and transferred directly to your verified bank account. Track everything in real-time." }
    ];

    const benefits = [
        "Zero platform fees on donations",
        "80G tax benefit certificates for donors",
        "Dedicated campaign manager support",
        "Real-time analytics dashboard",
        "Secure Razorpay payment processing",
        "Social media sharing tools"
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                            Turn your <span className="italic text-green-700">passion</span> into action.
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg">
                            Launch a fundraising campaign in minutes. Whether it's for medical aid, education, or community development — we'll help you every step of the way.
                        </p>
                        <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-base font-bold text-white hover:bg-brand-dark/90 transition-colors">
                            Get Started <FiArrowRight />
                        </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team planning a campaign" className="absolute inset-0 w-full h-full object-cover" />
                    </motion.div>
                </div>
            </section>

            {/* How to Start */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <h2 className="text-4xl font-bold font-serif text-brand-dark text-center mb-16">How to start a campaign</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-6">{step.icon}</div>
                            <div className="text-xs font-bold text-slate-400 mb-2">STEP {i + 1}</div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">{step.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-brand-dark text-white py-20 mb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold font-serif text-center mb-12">Why CrowdConnect?</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-lg">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold font-serif text-brand-dark mb-6">Ready to make a difference?</h2>
                <p className="text-lg text-slate-600 mb-10">Create your free account and launch your first campaign today. It only takes 5 minutes.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                        Create Free Account
                    </Link>
                    <Link to="/campaigns" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border-2 border-brand-dark rounded-full hover:bg-cream transition-colors">
                        Browse Campaigns
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default StartCampaign;
