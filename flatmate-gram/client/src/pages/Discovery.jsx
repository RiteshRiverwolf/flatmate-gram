import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, X, MapPin, Briefcase } from 'lucide-react';

const Discovery = () => {
    const [people, setPeople] = useState([]);
    // Track interactions: { userId: 'like' | 'dislike' | null }
    const [interactions, setInteractions] = useState({});

    useEffect(() => {
        const fetchPeople = async () => {
            const res = await axios.get('http://localhost:5000/api/users/all');
            setPeople(res.data);
        };
        fetchPeople();
    }, []);

    const handleAction = async (personId, action) => {
        // Toggle logic
        setInteractions(prev => ({
            ...prev,
            [personId]: prev[personId] === action ? null : action
        }));

        if (action === 'like' && interactions[personId] !== 'like') {
            try {
                const res = await axios.post(`http://localhost:5000/api/users/like/${personId}`);
                if (res.data.isMatch) alert("🎉 It's a Match!");
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-black mb-8 text-gray-800">Suggested Roommates</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {people.map((person) => {
                    const status = interactions[person._id];

                    return (
                        <div key={person._id} className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 group">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={person.profileImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"} 
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    alt={person.name}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-600 shadow-sm">
                                    ${person.budget?.max}/mo
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800">{person.name}, {person.age}</h2>
                                <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                                    <MapPin size={14}/> {person.location?.city}
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                                    <Briefcase size={14}/> {person.work?.profession}
                                </div>

                                <div className="flex gap-3 mt-6">
                                    {/* DISLIKE / CROSS BUTTON */}
                                    <button 
                                        onClick={() => handleAction(person._id, 'dislike')}
                                        className={`flex-1 py-3 rounded-2xl transition-all flex justify-center border-2 ${
                                            status === 'dislike' 
                                            ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200' 
                                            : 'bg-gray-100 border-transparent text-gray-400 hover:bg-rose-50 hover:text-rose-500'
                                        }`}
                                    >
                                        <X size={20} strokeWidth={status === 'dislike' ? 3 : 2}/>
                                    </button>

                                    {/* LIKE BUTTON */}
                                    <button 
                                        onClick={() => handleAction(person._id, 'like')}
                                        className={`flex-[2] py-3 rounded-2xl transition-all flex justify-center items-center gap-2 font-bold border-2 ${
                                            status === 'like' 
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200' 
                                            : 'bg-teal-600 border-transparent text-white hover:bg-teal-700 shadow-lg shadow-teal-100'
                                        }`}
                                    >
                                        <Heart size={20} fill={status === 'like' ? "white" : "transparent"} strokeWidth={3}/>
                                        {status === 'like' ? 'Liked' : 'Like'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Discovery;