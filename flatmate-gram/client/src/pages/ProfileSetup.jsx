import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Save, User, MapPin, DollarSign, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import

const ProfileSetup = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', age: '', gender: 'Male', roommatePreference: 'Any',
        city: '', workLocation: '', profession: '', company: '',
        budgetMin: 500, budgetMax: 1500, moveInDate: '',
        bio: '', smoking: false, drinking: false, petsOk: false,
        foodHabit: 'Any', workingHours: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                gender: user.gender || 'Male',
                roommatePreference: user.roommatePreference || 'Any',
                city: user.location?.city || '',
                workLocation: user.location?.workLocation || '',
                profession: user.work?.profession || '',
                company: user.work?.company || '',
                budgetMin: user.budget?.min || 500,
                budgetMax: user.budget?.max || 1500,
                moveInDate: user.moveInDate?.split('T')[0] || '',
                bio: user.bio || '',
                smoking: user.lifestyle?.smoking || false,
                drinking: user.lifestyle?.drinking || false,
                petsOk: user.lifestyle?.petsOk || false,
                foodHabit: user.lifestyle?.foodHabit || 'Any',
                workingHours: user.lifestyle?.workingHours || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name, age: formData.age, gender: formData.gender,
                roommatePreference: formData.roommatePreference,
                location: { city: formData.city, workLocation: formData.workLocation },
                work: { profession: formData.profession, company: formData.company },
                budget: { min: formData.budgetMin, max: formData.budgetMax },
                moveInDate: formData.moveInDate, bio: formData.bio,
                lifestyle: { 
                    smoking: formData.smoking, drinking: formData.drinking, 
                    petsOk: formData.petsOk, foodHabit: formData.foodHabit, 
                    workingHours: formData.workingHours 
                }
            };
            
            const res = await axios.put('http://localhost:5000/api/users/update', payload);
        setUser(res.data);
        alert("Profile Saved!");
        navigate('/discovery'); // This will take you directly to the grid
        } catch (err) { alert("Error saving profile"); }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                            Set up your profile
                        </h1>
                        <p className="text-gray-500 font-medium mt-2">Let's find your perfect roommate match.</p>
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-200 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Save size={20} /> Save Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Basic Info Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-teal-50">
                        <div className="flex items-center gap-3 mb-6 text-teal-700">
                            <User className="bg-teal-100 p-2 rounded-xl" size={40} />
                            <h2 className="text-2xl font-bold">Basic Info</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/50 border-2 border-gray-100 focus:border-teal-400 rounded-2xl p-3 outline-none transition-all" placeholder="e.g., Ritesh" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Age</label>
                                <input name="age" type="number" value={formData.age} onChange={handleChange} className="w-full bg-white/50 border-2 border-gray-100 focus:border-teal-400 rounded-2xl p-3 outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white/50 border-2 border-gray-100 focus:border-teal-400 rounded-2xl p-3 outline-none transition-all appearance-none">
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Preference</label>
                                <select name="roommatePreference" value={formData.roommatePreference} onChange={handleChange} className="w-full bg-white/50 border-2 border-gray-100 focus:border-teal-400 rounded-2xl p-3 outline-none transition-all appearance-none">
                                    <option>Any</option><option>Same as mine</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Location & Work */}
                    <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-indigo-50">
                        <div className="flex items-center gap-3 mb-6 text-indigo-700">
                            <MapPin className="bg-indigo-100 p-2 rounded-xl" size={40} />
                            <h2 className="text-2xl font-bold">Location & Work</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input name="city" value={formData.city} onChange={handleChange} className="bg-white/50 border-2 border-gray-100 focus:border-indigo-400 rounded-2xl p-3 outline-none" placeholder="City you want to stay in" />
                            <input name="workLocation" value={formData.workLocation} onChange={handleChange} className="bg-white/50 border-2 border-gray-100 focus:border-indigo-400 rounded-2xl p-3 outline-none" placeholder="Work area (e.g., Midtown)" />
                            <input name="profession" value={formData.profession} onChange={handleChange} className="bg-white/50 border-2 border-gray-100 focus:border-indigo-400 rounded-2xl p-3 outline-none" placeholder="Profession" />
                            <input name="company" value={formData.company} onChange={handleChange} className="bg-white/50 border-2 border-gray-100 focus:border-indigo-400 rounded-2xl p-3 outline-none" placeholder="Company / College" />
                        </div>
                    </section>

                    {/* Budget Section */}
                    <section className="bg-gradient-to-r from-teal-600 to-indigo-600 p-8 rounded-3xl shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="bg-white/20 p-2 rounded-xl" size={40} />
                            <h2 className="text-2xl font-bold">Budget & Timeline</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-80">Min Budget</label>
                                <input name="budgetMin" type="number" value={formData.budgetMin} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:bg-white/20 transition-all placeholder-white/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-80">Max Budget</label>
                                <input name="budgetMax" type="number" value={formData.budgetMax} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:bg-white/20 transition-all placeholder-white/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-80">Move-in Date</label>
                                <input name="moveInDate" type="date" value={formData.moveInDate} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:bg-white/20 transition-all" />
                            </div>
                        </div>
                    </section>

                    {/* Lifestyle Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-teal-50">
                        <div className="flex items-center gap-3 mb-6 text-teal-700">
                            <Activity className="bg-teal-100 p-2 rounded-xl" size={40} />
                            <h2 className="text-2xl font-bold">Lifestyle Habits</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                {['smoking', 'drinking', 'petsOk'].map((habit) => (
                                    <label key={habit} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl cursor-pointer hover:bg-teal-50 transition-colors">
                                        <span className="font-semibold text-gray-700 capitalize">{habit.replace('Ok', ' OK')}</span>
                                        <input 
                                            name={habit} 
                                            type="checkbox" 
                                            checked={formData[habit]} 
                                            onChange={handleChange} 
                                            className="w-6 h-6 rounded-lg text-teal-600 focus:ring-teal-500 border-gray-300" 
                                        />
                                    </label>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Food Habit</label>
                                    <select name="foodHabit" value={formData.foodHabit} onChange={handleChange} className="w-full mt-2 bg-gray-50 border-2 border-transparent focus:border-teal-400 rounded-2xl p-3 outline-none">
                                        <option>Any</option><option>Veg</option><option>Non-Veg</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Bio</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full mt-2 bg-gray-50 border-2 border-transparent focus:border-teal-400 rounded-2xl p-3 outline-none" placeholder="Tell us about your vibe..."></textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;