import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            login(res.data.token);
            navigate('/profile-setup');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Join FlatmateGram</h2>
                <input type="text" placeholder="Name" className="w-full p-3 mb-4 border rounded" onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">Sign Up</button>
                <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;