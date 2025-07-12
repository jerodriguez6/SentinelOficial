import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // Check for existing wallet connection on load
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts'
                    });

                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                        setIsWalletConnected(true);
                        setIsAuthenticated(true);
                        setUser({
                            type: 'wallet',
                            address: accounts[0],
                            displayName: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
                        });
                    }
                } catch (error) {
                    console.error('Error checking wallet connection:', error);
                }
            }
        };

        checkWalletConnection();
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setWalletAddress('');
        setIsWalletConnected(false);
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            throw new Error('MetaMask no está instalado');
        }

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            if (accounts.length > 0) {
                const address = accounts[0];
                setWalletAddress(address);
                setIsWalletConnected(true);
                setIsAuthenticated(true);
                setUser({
                    type: 'wallet',
                    address: address,
                    displayName: `${address.slice(0, 6)}...${address.slice(-4)}`
                });
                return address;
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    };

    const value = {
        isAuthenticated,
        user,
        walletAddress,
        isWalletConnected,
        login,
        logout,
        connectWallet
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;