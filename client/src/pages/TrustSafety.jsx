import { motion } from 'framer-motion';
import { FiShield, FiAlertTriangle, FiLock, FiEye, FiUserCheck, FiFlag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TrustSafety = () => {
    const pillars = [
        { icon: <FiUserCheck className="w-6 h-6" />, title: "Verified Organizations", desc: "Every organization on CrowdConnect undergoes a rigorous verification process including legal registration checks, 80G certificate validation, audited financial statements, and board member diligence." },
        { icon: <FiLock className="w-6 h-6" />, title: "Secure Payments", desc: "All transactions are processed through PCI DSS compliant payment infrastructure. We use end-to-end encryption and RBI-compliant escrow for large campaigns to ensure your money is always safe." },
        { icon: <FiEye className="w-6 h-6" />, title: "Fund Tracking", desc: "Every rupee is tracked. Organizations are required to post regular updates showing proof of fund utilization. For large campaigns, funds are released in tranches based on milestone completion." },
        { icon: <FiAlertTriangle className="w-6 h-6" />, title: "Fraud Prevention", desc: "Our dedicated fraud prevention team monitors campaigns 24/7 using AI-powered detection systems and manual reviews. Suspicious campaigns are immediately flagged and investigated." },
        { icon: <FiShield className="w-6 h-6" />, title: "Donor Protection", desc: "Your identity is protected. You choose what information is visible. We never sell donor data, and our refund policy ensures you're covered if a campaign is found to be fraudulent." },
        { icon: <FiFlag className="w-6 h-6" />, title: "Report Mechanism", desc: "See something suspicious? Our community-powered reporting system lets you flag campaigns instantly. Every report is investigated within 48 hours by our trust and safety team." }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-8">
                        <FiShield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Trust & <span className="italic text-green-700">Safety</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Your trust is our foundation. Here's how we protect donors, verify organizations, and ensure every campaign on CrowdConnect is legitimate.
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillars.map((p, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-6">{p.icon}</div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">{p.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-brand-dark rounded-3xl p-12">
                    <h2 className="text-3xl font-bold font-serif text-white mb-4">Report a concern</h2>
                    <p className="text-white/80 mb-8">If you notice anything suspicious, we want to know. Your report helps keep the community safe.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white rounded-full hover:bg-cream transition-colors">
                        Report Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TrustSafety;
