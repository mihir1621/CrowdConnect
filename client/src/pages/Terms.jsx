import { motion } from 'framer-motion';

const Terms = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using CrowdConnect ('the Platform'), you agree to be bound by these Terms of Service. If you do not agree to these terms, you should not use the Platform. CrowdConnect reserves the right to modify these terms at any time, and continued use of the Platform constitutes acceptance of any modifications."
        },
        {
            title: "2. Account Registration",
            content: "To use certain features of the Platform, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
            title: "3. Campaign Guidelines",
            content: "All campaigns must comply with applicable laws and our community guidelines. Campaigns must be for legitimate charitable, personal, or community purposes. CrowdConnect reserves the right to review, suspend, or remove any campaign that violates our policies, misrepresents information, or engages in fraudulent activity."
        },
        {
            title: "4. Donations & Payments",
            content: "All donations are processed through our secure payment partner, Razorpay. Donations are voluntary and non-refundable unless otherwise specified in our Refund Policy. CrowdConnect does not guarantee that campaigns will reach their funding goals. Donors acknowledge that their contributions are made at their own discretion."
        },
        {
            title: "5. Fees & Charges",
            content: "CrowdConnect charges a platform fee on donations to cover operational costs, payment processing, and platform maintenance. Current fee structures are displayed transparently on each campaign page. Fees may be updated with prior notice to users."
        },
        {
            title: "6. Intellectual Property",
            content: "All content on the Platform, including text, graphics, logos, and software, is the property of CrowdConnect or its content suppliers and is protected by intellectual property laws. Users retain ownership of content they submit but grant CrowdConnect a license to use, display, and distribute such content in connection with the Platform."
        },
        {
            title: "7. Privacy",
            content: "Your use of the Platform is also governed by our Privacy Policy. By using CrowdConnect, you consent to the collection and use of information as described in our Privacy Policy."
        },
        {
            title: "8. Limitation of Liability",
            content: "CrowdConnect provides the Platform 'as is' without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the Platform. Our total liability shall not exceed the amount of fees paid by you in the twelve months preceding the claim."
        },
        {
            title: "9. Governing Law",
            content: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka."
        },
        {
            title: "10. Contact",
            content: "For questions about these Terms of Service, please contact us at legal@crowdconnect.org or write to: CrowdConnect Legal, 91 Springboard, Koramangala, Bengaluru, Karnataka 560034."
        }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl font-bold font-serif text-brand-dark mb-4">Terms of Service</h1>
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

export default Terms;
