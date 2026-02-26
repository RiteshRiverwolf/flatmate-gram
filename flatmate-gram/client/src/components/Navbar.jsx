import { Link, useLocation } from 'react-router-dom';
import { Compass, Heart, User, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const navItems = [
        { path: '/discovery', icon: Compass, label: 'Explore' },
        { path: '/matches', icon: Heart, label: 'Matches' },
        { path: '/profile-setup', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 z-50">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}>
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                );
            })}
            <button onClick={logout} className="flex flex-col items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors">
                <LogOut size={24} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Exit</span>
            </button>
        </nav>
    );
};

export default Navbar;