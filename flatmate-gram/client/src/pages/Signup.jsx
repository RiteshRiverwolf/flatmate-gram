import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/api/auth/register', formData);
            login(res.data.token);
            navigate('/profile-setup');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all"
            >

                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Join FlatmateGram
                </h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    Sign Up
                </button>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-purple-600 font-semibold ml-1 hover:underline">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Signup;