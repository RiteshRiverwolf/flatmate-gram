import { Link } from 'react-router-dom';
import { Home as HomeIcon, Users, MessageCircle, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-gradient-to-br from-teal-600 via-teal-500 to-indigo-600 text-white py-20 px-6 text-center rounded-b-[4rem] shadow-2xl">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl font-black mb-6 tracking-tight">Find your vibe, <br/><span className="text-teal-200">find your home.</span></h1>
                    <p className="text-xl opacity-90 mb-10 font-medium">The modern way to find compatible roommates. No more awkward living situations.</p>
                    <Link to="/signup" className="bg-white text-teal-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform inline-block">
                        Get Started for Free
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                    <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><Users size={32}/></div>
                    <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
                    <p className="text-gray-500">Connect with real people from companies like Infosys, Google, and more.</p>
                </div>
                <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                    <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><ShieldCheck size={32}/></div>
                    <h3 className="text-xl font-bold mb-3">Compatibility First</h3>
                    <p className="text-gray-500">Filters for food habits, smoking, and pets to ensure a peaceful stay.</p>
                </div>
                <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                    <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><MessageCircle size={32}/></div>
                    <h3 className="text-xl font-bold mb-3">Instant Chat</h3>
                    <p className="text-gray-500">Match with someone and start chatting immediately to team up.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;