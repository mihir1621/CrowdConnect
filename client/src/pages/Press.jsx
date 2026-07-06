import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Press = () => {
    const pressReleases = [
        { date: "June 2026", title: "CrowdConnect surpasses ₹100 Crore in total donations", source: "Business Standard" },
        { date: "May 2026", title: "CrowdConnect partners with 500+ verified NGOs across India", source: "YourStory" },
        { date: "March 2026", title: "CrowdConnect raises Series A funding of $5M", source: "Inc42" },
        { date: "January 2026", title: "How CrowdConnect is revolutionizing charitable giving in India", source: "The Economic Times" },
        { date: "November 2025", title: "CrowdConnect launches 80G automated tax receipts for donors", source: "Mint" },
        { date: "September 2025", title: "CrowdConnect wins 'Best Social Impact Startup' at TechSparks 2025", source: "YourStory" }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Press & <span className="italic text-green-700">Media</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Read the latest news and coverage about CrowdConnect. For press inquiries, reach out to our communications team.
                    </p>
                </motion.div>
            </section>

            {/* Press Releases */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <h2 className="text-3xl font-bold font-serif text-brand-dark mb-10">In the news</h2>
                <div className="space-y-4">
                    {pressReleases.map((pr, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-xs font-bold text-slate-400 mb-1">{pr.date} · {pr.source}</p>
                                <h3 className="text-lg font-bold text-brand-dark">{pr.title}</h3>
                            </div>
                            <FiExternalLink className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Brand Kit */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="bg-brand-dark rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold font-serif text-white mb-4">Brand Kit</h2>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">Download our official logos, brand guidelines, and approved media assets for your publications.</p>
                    <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-brand-dark bg-white rounded-full hover:bg-cream transition-colors">
                        <FiDownload className="w-5 h-5" /> Download Brand Kit
                    </button>
                </div>
            </section>

            {/* Contact */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold font-serif text-brand-dark mb-4">Press inquiries</h2>
                <p className="text-slate-600 mb-6">For media inquiries, interviews, or partnership opportunities:</p>
                <p className="text-lg font-bold text-brand-dark mb-8">press@crowdconnect.org</p>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                    Contact Us
                </Link>
            </section>
        </div>
    );
};

export default Press;
