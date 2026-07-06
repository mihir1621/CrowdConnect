import { Link, useLocation } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-cream border-b border-slate-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                                <FiHeart className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-2xl font-bold text-brand-dark tracking-tight font-serif">
                                CrowdConnect
                            </span>
                        </Link>
                    </div>

                    {/* Center Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/campaigns"
                            className={`text-sm font-medium transition-colors ${isActive('/campaigns') ? 'text-brand-dark' : 'text-slate-600 hover:text-brand-dark'}`}
                        >
                            Discover
                        </Link>
                        <Link
                            to="/categories"
                            className={`text-sm font-medium transition-colors ${isActive('/categories') ? 'text-brand-dark' : 'text-slate-600 hover:text-brand-dark'}`}
                        >
                            Categories
                        </Link>
                        <Link
                            to="/how-it-works"
                            className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-brand-dark' : 'text-slate-600 hover:text-brand-dark'}`}
                        >
                            How it works
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-brand-dark' : 'text-slate-600 hover:text-brand-dark'}`}
                        >
                            About
                        </Link>
                    </div>

                    {/* Auth Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/login"
                            className="text-slate-600 hover:text-brand-dark text-sm font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="bg-brand-dark text-white hover:bg-brand-dark/90 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
                        >
                            Start a campaign
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
