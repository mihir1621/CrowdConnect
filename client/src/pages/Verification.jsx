import { motion } from 'framer-motion';
import { FiCheckCircle, FiUpload, FiFileText, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Verification = () => {
    const steps = [
        { icon: <FiFileText className="w-6 h-6" />, step: "01", title: "Submit Documents", desc: "Upload your organization's registration certificate, PAN card, 80G certificate (if applicable), and audited financial statements from the last two years." },
        { icon: <FiUpload className="w-6 h-6" />, step: "02", title: "KYC Verification", desc: "Complete the Know Your Customer process. We verify the identity of board members and authorized signatories to ensure organizational legitimacy." },
        { icon: <FiShield className="w-6 h-6" />, step: "03", title: "Compliance Review", desc: "Our legal team reviews your submission against FCRA, Companies Act, and Societies Registration Act requirements. This typically takes 3–5 business days." },
        { icon: <FiCheckCircle className="w-6 h-6" />, step: "04", title: "Approval & Badge", desc: "Once approved, your organization receives a verified badge visible on all campaigns. You can now launch campaigns and start receiving donations." }
    ];

    const requirements = [
        "Valid registration certificate (Trust Deed / Society Registration / Section 8 Company)",
        "PAN card of the organization",
        "80G certificate (for tax-exempt donations)",
        "Audited financial statements (last 2 years)",
        "Board resolution authorizing fundraising",
        "ID proof of at least 2 board members",
        "Cancelled cheque or bank statement for account verification",
        "FCRA certificate (for receiving foreign donations)"
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Organization <span className="italic text-green-700">Verification</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We verify every organization on CrowdConnect to ensure donor trust and campaign legitimacy. Here's how the process works.
                    </p>
                </motion.div>
            </section>

            {/* Steps */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative">
                            <div className="text-5xl font-bold text-slate-100 absolute top-4 right-6 font-serif">{s.step}</div>
                            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-6">{s.icon}</div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">{s.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Requirements */}
            <section className="bg-brand-dark text-white py-20 mb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold font-serif text-center mb-12">Required Documents</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {requirements.map((r, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white/90">{r}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold font-serif text-brand-dark mb-4">Ready to get verified?</h2>
                <p className="text-slate-600 mb-8">Register your organization and start the verification process today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">Register Now</Link>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border-2 border-brand-dark rounded-full hover:bg-cream transition-colors">Contact Us</Link>
                </div>
            </section>
        </div>
    );
};

export default Verification;
