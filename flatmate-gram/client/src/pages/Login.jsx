import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/auth/login`, formData);
            login(res.data.token);
            navigate('/profile-setup');
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border rounded"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm">
                    New here? <Link to="/signup" className="text-blue-600">Create account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;