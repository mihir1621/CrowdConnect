import { motion } from 'framer-motion';

const Privacy = () => {
    const sections = [
        { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, payment details), information collected automatically (IP address, browser type, device info, usage data), and information from third parties (social login providers, payment processors)." },
        { title: "2. How We Use Your Information", content: "We use your information to provide and improve the Platform, process donations and payments, send transaction confirmations and updates, communicate campaign progress to donors, comply with legal obligations, and prevent fraud and abuse." },
        { title: "3. Information Sharing", content: "We do not sell your personal information. We may share data with payment processors (Razorpay) to complete transactions, campaign organizers (donor name and amount, if you choose to be visible), service providers who assist in operating the Platform, and law enforcement when required by law." },
        { title: "4. Data Security", content: "We implement industry-standard security measures including SSL/TLS encryption, PCI DSS compliant payment processing, regular security audits, and secure data storage with access controls. However, no method of transmission over the Internet is 100% secure." },
        { title: "5. Cookies & Tracking", content: "We use cookies and similar technologies to maintain your session and preferences, analyze Platform usage and performance, personalize your experience, and serve relevant content. You can control cookie settings through your browser preferences." },
        { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal information, opt out of marketing communications, request data portability, and withdraw consent for data processing. To exercise these rights, contact us at privacy@crowdconnect.org." },
        { title: "7. Data Retention", content: "We retain your personal information for as long as your account is active or as needed to provide services. Transaction records are retained as required by applicable tax and financial regulations. You may request account deletion at any time." },
        { title: "8. Children's Privacy", content: "CrowdConnect is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we discover that a child has provided us with personal information, we will delete it promptly." },
        { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Continued use after changes constitutes acceptance." },
        { title: "10. Contact Us", content: "For privacy-related questions or concerns, contact our Data Protection Officer at privacy@crowdconnect.org or write to: CrowdConnect Privacy, 91 Springboard, Koramangala, Bengaluru, Karnataka 560034." }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl font-bold font-serif text-brand-dark mb-4">Privacy Policy</h1>
                    <p className="text-slate-500 mb-12">Last updated: July 1, 2026</p>
                    <div className="space-y-10">
                        {sections.map((s, i) => (
                            <div key={i}>
                                <h2 className="text-xl font-bold font-serif text-brand-dark mb-3">{s.title}</h2>
                                <p className="text-slate-600 leading-relaxed">{s.content}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
