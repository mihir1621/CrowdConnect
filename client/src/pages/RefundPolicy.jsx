import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
    const sections = [
        { title: "1. General Policy", content: "Donations made through CrowdConnect are generally considered final and non-refundable. By making a donation, you acknowledge that you are making a voluntary contribution to a campaign. However, we understand that exceptions may arise, and we handle refund requests on a case-by-case basis." },
        { title: "2. Eligible Refund Scenarios", content: "Refunds may be considered in the following cases: unauthorized transactions on your account, duplicate charges due to technical errors, campaigns found to be fraudulent after investigation, campaign cancellation by the organizer before funds are disbursed, and significant misrepresentation of campaign purpose." },
        { title: "3. Refund Request Process", content: "To request a refund, email refunds@crowdconnect.org within 30 days of your donation with your transaction ID, the campaign name, the reason for your refund request, and any supporting documentation. Our team will review your request within 5–7 business days." },
        { title: "4. Processing Time", content: "Approved refunds are processed within 10–15 business days. Refunds are credited back to the original payment method. Bank processing times may vary, and it may take an additional 5–7 days for the amount to appear in your account." },
        { title: "5. Non-Refundable Situations", content: "Refunds will not be issued if the campaign has already disbursed funds, the donation was made more than 30 days ago without extenuating circumstances, the donor simply changed their mind after a successful and legitimate donation, or the request lacks sufficient justification." },
        { title: "6. Fraudulent Campaigns", content: "If a campaign is found to be fraudulent, CrowdConnect will proactively initiate refunds for all donors. We have a dedicated fraud prevention team that monitors campaigns and investigates reports. Remaining campaign funds will be frozen and returned to donors." },
        { title: "7. Platform Fees", content: "In cases where a refund is approved, any platform fees deducted will also be refunded in full. Payment gateway processing fees may be non-recoverable depending on the payment provider's policies." },
        { title: "8. Contact", content: "For refund-related queries, reach out to refunds@crowdconnect.org or call our support line at +91 80-4567-8900 (Mon–Fri, 9 AM – 6 PM IST)." }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl font-bold font-serif text-brand-dark mb-4">Refund Policy</h1>
                    <p className="text-slate-500 mb-12">Last updated: July 1, 2026</p>
                    <div className="space-y-10">
                        {sections.map((s, i) => (
                            <div key={i}>
                                <h2 className="text-xl font-bold font-serif text-brand-dark mb-3">{s.title}</h2>
                                <p className="text-slate-600 leading-relaxed">{s.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-100 text-center">
                        <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">Need help with a refund?</h3>
                        <p className="text-slate-600 mb-6">Our support team is here to help you.</p>
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                            Contact Support
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RefundPolicy;
