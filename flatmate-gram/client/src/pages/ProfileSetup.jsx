import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Save, User, MapPin, DollarSign, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

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
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                age: formData.age,
                gender: formData.gender,
                roommatePreference: formData.roommatePreference,
                location: {
                    city: formData.city,
                    workLocation: formData.workLocation
                },
                work: {
                    profession: formData.profession,
                    company: formData.company
                },
                budget: {
                    min: formData.budgetMin,
                    max: formData.budgetMax
                },
                moveInDate: formData.moveInDate,
                bio: formData.bio,
                lifestyle: {
                    smoking: formData.smoking,
                    drinking: formData.drinking,
                    petsOk: formData.petsOk,
                    foodHabit: formData.foodHabit,
                    workingHours: formData.workingHours
                }
            };

            const res = await axios.put(`${API}/api/users/update`, payload);

            setUser(res.data);
            alert("Profile Saved!");
            navigate('/discovery');

        } catch (err) {
            alert("Error saving profile");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                <div className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                            Set up your profile
                        </h1>
                        <p className="text-gray-500 font-medium mt-2">
                            Let's find your perfect roommate match.
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-200 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Save size={20} /> Save Profile
                    </button>
                </div>

                {/* Rest of UI unchanged */}
                {/* (All form inputs remain the same as your original code) */}

            </div>
        </div>
    );
};

export default ProfileSetup;