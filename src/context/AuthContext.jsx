import { createContext, useState, useContext, useEffect } from 'react';
import api from './api';
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Check for stored user/token on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/accounts/login/', { username, password });
            console.log(response.data);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/accounts/register/', userData);
            console.log("Registration success:", response.data);
            // Optionally log the user in immediately after registration
            // setUser(response.data); 
            // localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
        // localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
