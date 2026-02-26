import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added this import
import { MessageCircle, User, MapPin, ChevronRight } from 'lucide-react';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/matches');
                setMatches(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMatches();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-teal-50 p-6 md:p-12">
            <div className="max-w-3xl mx-auto pb-24"> {/* Added pb-24 so navbar doesn't hide content */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Matches</h1>
                <p className="text-gray-500 mb-10 font-medium">People who want to team up with you!</p>

                <div className="space-y-4">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <div key={match._id} className="bg-white/80 backdrop-blur-md border border-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <img 
                                            src={match.profileImage || "https://via.placeholder.com/100"} 
                                            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-100" 
                                            alt={match.name} 
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{match.name}, {match.age}</h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                            <MapPin size={14} /> {match.location?.city}
                                        </div>
                                    </div>
                                </div>

                                {/* Updated from <button> to <Link> below */}
                                <Link 
                                    to={`/chat/${match._id}`} 
                                    className="bg-teal-600 text-white p-4 rounded-2xl hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all group-hover:translate-x-1 flex items-center gap-2 font-bold"
                                >
                                    <MessageCircle size={20} />
                                    <span className="hidden md:inline">Chat</span>
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-teal-200">
                            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                                <User size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">No matches yet</h3>
                            <p className="text-gray-500">Keep exploring and liking profiles!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Matches;