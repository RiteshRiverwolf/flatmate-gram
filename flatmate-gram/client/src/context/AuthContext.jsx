import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                axios.defaults.headers.common['x-auth-token'] = storedToken;
                setToken(storedToken);

                try {
                    const res = await axios.get(`${API}/api/users/me`);
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth fetch failed", err);
                    localStorage.removeItem('token');
                    setToken(null);
                    delete axios.defaults.headers.common['x-auth-token'];
                }
            }

            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (newToken) => {
        localStorage.setItem('token', newToken);

        // IMPORTANT: attach token immediately
        axios.defaults.headers.common['x-auth-token'] = newToken;

        setToken(newToken);

        try {
            const res = await axios.get(`${API}/api/users/me`);
            setUser(res.data);
        } catch (err) {
            console.error("Login fetch failed", err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};