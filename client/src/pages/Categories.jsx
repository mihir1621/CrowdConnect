import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Categories = () => {
    const categories = [
        { icon: "❤️", title: "Medical", count: "214", description: "Support life-saving treatments, surgeries, and medical equipment for those in need.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "📚", title: "Education", count: "189", description: "Fund scholarships, school supplies, and educational programs for underprivileged children.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🌊", title: "Disaster Relief", count: "47", description: "Provide immediate relief and long-term recovery support for communities affected by natural disasters.", image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🐾", title: "Animals", count: "96", description: "Help rescue, shelter, and provide medical care for animals in distress.", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🌿", title: "Environment", count: "78", description: "Fund reforestation, ocean cleanup, and sustainability initiatives to protect our planet.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🤝", title: "Women & Girls", count: "132", description: "Empower women and girls through education, healthcare, and economic opportunity programs.", image: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🍚", title: "Hunger", count: "68", description: "Fight hunger by funding food banks, community kitchens, and nutrition programs.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { icon: "🏅", title: "Sports", count: "41", description: "Support aspiring athletes with training, equipment, and competition funding.", image: "https://images.unsplash.com/photo-1461896836934-ber7fc87f78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Find a cause close <br />to your <span className="italic text-green-700">heart</span>.
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto">
                        From medical emergencies to education and disaster relief — pick what moves you and start making a difference today.
                    </p>
                </motion.div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <Link
                                to={`/campaigns?category=${category.title.toLowerCase()}`}
                                className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-4 left-5 text-3xl">{category.icon}</div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-bold font-serif text-brand-dark">{category.title}</h3>
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{category.count} live</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{category.description}</p>
                                    <div className="flex items-center gap-1 text-sm font-bold text-brand-dark group-hover:text-green-700 transition-colors">
                                        Browse campaigns <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-brand-dark rounded-3xl p-12 lg:p-16">
                    <h2 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-4">Can't find what you're looking for?</h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Start your own campaign and rally the community around the cause that matters most to you.
                    </p>
                    <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-dark bg-white rounded-full hover:bg-cream transition-colors">
                        Start a Campaign
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Categories;
