import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: "Starter",
            subtitle: "For individuals & small causes",
            price: "Free",
            priceNote: "5% platform fee on donations",
            features: [
                "Unlimited campaigns",
                "Basic analytics dashboard",
                "Social sharing tools",
                "Email support",
                "Standard payout (7 days)",
                "Donor messaging"
            ],
            cta: "Get Started Free",
            featured: false
        },
        {
            name: "Pro",
            subtitle: "For growing organizations",
            price: "₹2,999",
            priceNote: "/month · 2.5% platform fee",
            features: [
                "Everything in Starter",
                "Priority verification badge",
                "Advanced analytics & reports",
                "Auto 80G receipt generation",
                "Priority support (4hr SLA)",
                "Fast payout (3 days)",
                "Custom campaign pages",
                "Team member accounts (up to 5)"
            ],
            cta: "Start Free Trial",
            featured: true
        },
        {
            name: "Enterprise",
            subtitle: "For large NGOs & foundations",
            price: "Custom",
            priceNote: "Tailored to your needs",
            features: [
                "Everything in Pro",
                "Zero platform fee option",
                "Dedicated account manager",
                "API access & integrations",
                "Custom branding & white-label",
                "Escrow account management",
                "Unlimited team members",
                "SLA-backed uptime guarantee"
            ],
            cta: "Contact Sales",
            featured: false
        }
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-16">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl lg:text-6xl font-bold font-serif text-brand-dark leading-tight mb-6">
                        Simple, <span className="italic text-green-700">transparent</span> pricing
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        No hidden fees, no surprises. Choose a plan that fits your organization's needs and scale as you grow.
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid lg:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className={`rounded-3xl p-8 lg:p-10 flex flex-col ${plan.featured ? 'bg-brand-dark text-white border-2 border-brand-dark shadow-xl scale-105' : 'bg-white border border-slate-100 shadow-sm'}`}>
                            <div className="mb-8">
                                {plan.featured && <div className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Most Popular</div>}
                                <h3 className={`text-2xl font-bold font-serif mb-1 ${plan.featured ? 'text-white' : 'text-brand-dark'}`}>{plan.name}</h3>
                                <p className={`text-sm ${plan.featured ? 'text-white/70' : 'text-slate-500'}`}>{plan.subtitle}</p>
                            </div>
                            <div className="mb-8">
                                <span className={`text-4xl font-bold font-serif ${plan.featured ? 'text-white' : 'text-brand-dark'}`}>{plan.price}</span>
                                <span className={`text-sm ${plan.featured ? 'text-white/70' : 'text-slate-500'}`}>{plan.priceNote}</span>
                            </div>
                            <ul className="space-y-3 mb-10 flex-grow">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <FiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.featured ? 'text-green-400' : 'text-green-600'}`} />
                                        <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-slate-600'}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}
                                className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-colors ${plan.featured ? 'bg-white text-brand-dark hover:bg-cream' : 'bg-brand-dark text-white hover:bg-brand-dark/90'}`}>
                                {plan.cta} <FiArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold font-serif text-brand-dark mb-4">Need a custom plan?</h2>
                <p className="text-slate-600 mb-6">We work with organizations of all sizes. Let's find the perfect fit.</p>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-dark rounded-full hover:bg-brand-dark/90 transition-colors">
                    Talk to Sales
                </Link>
            </section>
        </div>
    );
};

export default Pricing;
