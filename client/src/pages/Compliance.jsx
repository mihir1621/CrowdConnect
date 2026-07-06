import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Compliance = () => {
    const frameworks = [
        { icon: <FiFileText className="w-6 h-6" />, title: "FCRA Compliance", desc: "Organizations receiving foreign contributions must hold a valid FCRA registration. We verify FCRA certificates and ensure all international donations comply with the Foreign Contribution Regulation Act." },
        { icon: <FiShield className="w-6 h-6" />, title: "Income Tax Act (80G)", desc: "We partner exclusively with organizations holding valid 80G certificates, enabling donors to claim tax deductions. We auto-generate 80G receipts for every eligible donation." },
        { icon: <FiCheckCircle className="w-6 h-6" />, title: "RBI Guidelines", desc: "All payment processing follows Reserve Bank of India guidelines. Large campaigns use RBI-compliant escrow accounts, and all transactions are PCI DSS compliant through our partner Razorpay." },
        { icon: <FiAlertCircle className="w-6 h-6" />, title: "PMLA / AML", desc: "We adhere to the Prevention of Money Laundering Act and Anti-Money Laundering regulations. Our KYC processes and transaction monitoring systems help detect and prevent illicit financial activities." }
    ];

    const commitments = [
        "Annual compliance audit by independent auditors",
        "Quarterly transparency reports published publicly",
        "Real-time transaction monitoring and anomaly detection",
        "Mandatory KYC for all organizations and large donors",
        "Data protection compliant with IT Act 2000 and proposed DPDP Act",
        "Grievance redressal mechanism with 48-hour response SLA"
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Regulatory <span className="italic text-green-700">Compliance</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        CrowdConnect operates in full compliance with Indian regulatory frameworks to ensure the highest standards of governance and donor protection.
                    </p>
                </motion.div>
            </section>

            {/* Frameworks */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid sm:grid-cols-2 gap-8">
                    {frameworks.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-6">{f.icon}</div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">{f.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Commitments */}
            <section className="bg-brand-dark text-white py-20 mb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Compliance Commitments</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {commitments.map((c, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white/90">{c}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold font-serif text-brand-dark mb-4">Questions about compliance?</h2>
                <p className="text-slate-600 mb-8">Our legal and compliance team is here to help.</p>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                    Contact Legal Team
                </Link>
            </section>
        </div>
    );
};

export default Compliance;
