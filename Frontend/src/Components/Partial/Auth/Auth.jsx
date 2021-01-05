import React, { createContext, useEffect, useContext, useState, useCallback, useMemo } from 'react';

// Context
const AuthContext = createContext({
    loggedIn: false,
    user: {},
    login: () => { },
    logout: () => { },
    createAccount: () => { },
});

// Provider
export function AuthProvider(props) {
    // Default values
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    // Check for tokens or user_id in sessionStorage
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
        };

        // Get user if token is still in sessionStorage
        async function getUser() {
            try {
                const res = await fetch('http://localhost:4000/user/me', options);
                const data = await res.json();

                setUser(data);
            } catch (err) { console.log(err); };
        }

        getUser();
    }, [])

    // Callbacks returns function calls (Just like bind in JS)
    // Memo returns it's return value

    const login = useCallback(async (email, password) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        // Try catch block, set user and sessionStorage
        try {
            const res = await fetch('http://localhost:4000/user/login', options);
            const data = await res.json();

            setUser(data.user);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user_id', data.user._id);
        } catch (err) { console.log(err) }
    }, [setUser])

    const logout = useCallback(() => {
        // Delete earlier stored tokens in database
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        };

        fetch('http://localhost:4000/user/logoutAll', options);

        // Set to default
        setUser(null);
        sessionStorage.clear();
    }, [setUser]);

    const createAccount = useCallback((name, email, password) => {
        fetch('http://localhost:4000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, [])

    const value = useMemo(() => {
        setLoggedIn(!!user) // Logged in is equal to user

        // If user deltes session tokens set user to null, and logged in to false
        if (!(sessionStorage.getItem('token') && sessionStorage.getItem('user_id'))) {
            setUser(null);
            setLoggedIn(false);
        }

        // Return value
        return {
            loggedIn,
            user,
            login,
            logout,
            createAccount
        };
    }, [user, login, logout, createAccount, loggedIn])

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

// Set Context
export default function useAuth() { return useContext(AuthContext); };