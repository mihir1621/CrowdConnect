import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left - Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                            Get in <span className="italic text-green-700">touch</span>.
                        </h1>
                        <p className="text-lg text-slate-600 mb-12 max-w-lg">
                            Have a question, feedback, or partnership inquiry? We'd love to hear from you. Our team typically responds within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm flex-shrink-0">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-serif text-brand-dark mb-1">Email us</h3>
                                    <p className="text-slate-600">support@crowdconnect.org</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm flex-shrink-0">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-serif text-brand-dark mb-1">Call us</h3>
                                    <p className="text-slate-600">+91 80-4567-8900</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm flex-shrink-0">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-serif text-brand-dark mb-1">Visit us</h3>
                                    <p className="text-slate-600">91 Springboard, Koramangala<br />Bengaluru, Karnataka 560034</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold font-serif text-brand-dark mb-8">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:border-brand-dark focus:ring-0 transition-colors" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:border-brand-dark focus:ring-0 transition-colors" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:border-brand-dark focus:ring-0 transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:border-brand-dark focus:ring-0 transition-colors" placeholder="How can we help?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:border-brand-dark focus:ring-0 transition-colors resize-none" placeholder="Tell us more..."></textarea>
                                </div>
                                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-base font-bold text-white hover:bg-brand-dark/90 transition-colors">
                                    Send Message <FiSend className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
