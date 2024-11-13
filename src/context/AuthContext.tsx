// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//     id: string;
//     email: string;
//     name: string;
// }

// interface AuthContextType {
//     user: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
//     signup: (name: string, email: string, password: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const login = async (email: string, password: string) => {
//         // Mock API call
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//             const user = await response.json();
//             setUser(user);
//             localStorage.setItem('user', JSON.stringify(user));
//         } else {
//             throw new Error('Login failed');
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };

//     const signup = async (name: string, email: string, password: string) => {
//         // Mock API call
//         const response = await fetch('/api/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, email, password }),
//         });

//         if (response.ok) {
//             const user = await response.json();
//             setUser(user);
//             localStorage.setItem('user', JSON.stringify(user));
//         } else {
//             throw new Error('Signup failed');
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, signup }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    id?: string;
    email: string;
    name: string;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (name: string, email: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/login', { email, password });
            const user = response.data;
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/signup', { name, email, password });
            const user = response.data;
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };
    return (
            <AuthContext.Provider value={{ user, login, logout, signup }}>
                {children}
            </AuthContext.Provider>
        );

    // ... (rest of the component)
};