import { motion } from 'framer-motion';
import { FiHeart, FiGlobe, FiTrendingUp, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Careers = () => {
    const openings = [
        { title: "Senior Frontend Engineer", dept: "Engineering", location: "Bengaluru / Remote", type: "Full-time" },
        { title: "Product Designer", dept: "Design", location: "Bengaluru", type: "Full-time" },
        { title: "Community Manager", dept: "Operations", location: "Remote", type: "Full-time" },
        { title: "Data Analyst", dept: "Analytics", location: "Bengaluru / Remote", type: "Full-time" },
        { title: "Content Writer", dept: "Marketing", location: "Remote", type: "Contract" },
        { title: "Backend Engineer", dept: "Engineering", location: "Bengaluru", type: "Full-time" }
    ];

    const perks = [
        { icon: <FiHeart className="w-6 h-6" />, title: "Health & Wellness", desc: "Comprehensive health insurance for you and your family, plus mental health support." },
        { icon: <FiGlobe className="w-6 h-6" />, title: "Remote Friendly", desc: "Work from anywhere in India. We believe in flexibility and trust." },
        { icon: <FiTrendingUp className="w-6 h-6" />, title: "Growth Budget", desc: "₹50,000 annual learning budget for courses, conferences, and books." },
        { icon: <FiAward className="w-6 h-6" />, title: "Impact Leave", desc: "5 extra paid days off per year to volunteer with a cause you care about." }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Build something that <span className="italic text-green-700">matters</span>.
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join a team of passionate people who are redefining how the world gives. Every line of code, every design, every word we write — it all goes toward changing lives.
                    </p>
                </motion.div>
            </section>

            {/* Perks */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <h2 className="text-3xl font-bold font-serif text-brand-dark text-center mb-12">Why work with us</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {perks.map((p, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-5">{p.icon}</div>
                            <h3 className="text-lg font-bold font-serif text-brand-dark mb-2">{p.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <h2 className="text-3xl font-bold font-serif text-brand-dark text-center mb-12">Open positions</h2>
                <div className="space-y-4">
                    {openings.map((job, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark">{job.title}</h3>
                                <p className="text-sm text-slate-500">{job.dept} · {job.location} · {job.type}</p>
                            </div>
                            <Link to="/contact" className="text-sm font-bold text-brand-dark hover:text-green-700 transition-colors whitespace-nowrap">Apply now →</Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-brand-dark rounded-3xl p-12">
                    <h2 className="text-3xl font-bold font-serif text-white mb-4">Don't see a role that fits?</h2>
                    <p className="text-white/80 mb-8">Send us your resume anyway. We're always looking for talented people.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white rounded-full hover:bg-cream transition-colors">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Careers;
