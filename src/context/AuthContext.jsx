import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const login = async (email, password) => {
        // TODO: Replace with actual API call
        // Example:
        // const response = await fetch('YOUR_API_URL/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // });
        // if (!response.ok) throw new Error('Login failed');
        // const data = await response.json();

        // Mock login for now
        console.log("Logging in with", email);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockUser = {
            email,
            name: "Utilisateur Test",
            role: "user" // or 'recruiter'
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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
