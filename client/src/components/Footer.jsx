import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-cream border-t border-slate-200/60 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center">
                                <FiHeart className="w-4 h-4 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold font-serif text-brand-dark">CrowdConnect</span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                            A trusted home for verified causes. Where every rupee is tracked, every story is real, and every donor is respected.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-brand-dark font-serif font-bold mb-6">Platform</h3>
                        <ul className="space-y-4">
                            <li><Link to="/campaigns" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Browse campaigns</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Categories</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Start a campaign</Link></li>
                            <li><a href="/#how-it-works" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">How it works</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-dark font-serif font-bold mb-6">Organizations</h3>
                        <ul className="space-y-4">
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Register</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Verification</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Compliance</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-dark font-serif font-bold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">About</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Careers</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Press</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-dark font-serif font-bold mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Terms</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Privacy</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Refund policy</Link></li>
                            <li><Link to="#" className="text-sm text-slate-500 hover:text-brand-dark transition-colors">Trust & safety</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} CrowdConnect. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-500">
                        Made with care in Bengaluru &middot; 80G certified partners only
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
