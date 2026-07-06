import { motion } from 'framer-motion';
import { FiHeart, FiGlobe, FiShield, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const About = () => {
    const values = [
        {
            icon: <FiHeart className="w-6 h-6" />,
            title: "Empathy First",
            description: "We believe in the power of understanding and sharing the feelings of others. Every campaign is a story that deserves to be heard."
        },
        {
            icon: <FiShield className="w-6 h-6" />,
            title: "Radical Transparency",
            description: "Trust is our currency. We ensure every donation is tracked and every campaign is verified for complete peace of mind."
        },
        {
            icon: <FiUsers className="w-6 h-6" />,
            title: "Community Driven",
            description: "We are more than a platform; we are a global community of changemakers dedicated to lifting each other up."
        },
        {
            icon: <FiGlobe className="w-6 h-6" />,
            title: "Global Impact",
            description: "Geography shouldn't limit generosity. We connect dreamers with believers across borders and cultures."
        }
    ];

    const team = [
        {
            name: "Sarah Jenkins",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            name: "David Chen",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            name: "Elena Rodriguez",
            role: "Community Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            name: "Marcus Johnson",
            role: "Lead Engineer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-bold font-serif text-brand-dark leading-tight mb-6">
                            Empowering <br />
                            <span className="italic text-green-700">changemakers</span> <br />
                            worldwide.
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg">
                            CrowdConnect was founded on a simple belief: when people come together, incredible things happen. We provide the platform for dreamers to find their believers.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Volunteers working together"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply"></div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-brand-dark text-white py-24 mb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <FiHeart className="w-12 h-12 mx-auto mb-8 text-green-400" />
                        <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-8 leading-tight">
                            "Our mission is to democratize funding and make philanthropy accessible to everyone, everywhere."
                        </h2>
                        <p className="text-xl text-white/80 font-serif italic">
                            - The CrowdConnect Team
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-serif text-brand-dark mb-4">Our Core Values</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide every decision we make and every feature we build.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brand-dark mb-6">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark mb-3">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold font-serif text-brand-dark mb-4">Meet the Team</h2>
                        <p className="text-slate-600 max-w-xl">We are a diverse group of engineers, designers, and dreamers united by a common goal.</p>
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-green-700 transition-colors">
                        Join our team <FiArrowRight />
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-80 mb-4 rounded-2xl overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-brand-dark">{member.name}</h3>
                            <p className="text-slate-500">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-brand-light rounded-3xl p-12 lg:p-20">
                    <h2 className="text-4xl font-bold font-serif text-brand-dark mb-6">Ready to make an impact?</h2>
                    <p className="text-lg text-slate-700 mb-10 max-w-2xl mx-auto">
                        Whether you want to start a campaign for a cause you care about, or support someone else's dream, your journey starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/campaigns" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                            Browse Campaigns
                        </Link>
                        <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white border-2 border-brand-dark rounded-full hover:bg-cream transition-colors">
                            Start a Campaign
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
