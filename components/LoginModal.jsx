import React, { useState } from 'react';
import { X, Mail, Eye, EyeOff, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { login, connectWallet } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle email login/register logic here
        const userData = {
            type: 'email',
            email: formData.email,
            name: formData.email.split('@')[0],
            displayName: formData.email.split('@')[0]
        };

        login(userData);
        console.log('Form submitted:', formData);
        onClose();
    };

    const handleGoogleLogin = () => {
        // Handle Google login
        const userData = {
            type: 'google',
            email: 'user@gmail.com',
            name: 'Google User',
            displayName: 'Google User'
        };

        login(userData);
        console.log('Google login');
        onClose();
    };

    const handleWalletConnect = async () => {
        if (!window.ethereum) {
            alert('Por favor instala MetaMask para conectar tu wallet');
            return;
        }

        setIsConnecting(true);

        try {
            const address = await connectWallet();
            console.log('Wallet connected:', address);

            // Close modal after successful connection
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error al conectar la wallet: ' + error.message);
        } finally {
            setIsConnecting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-[#09090B] border-zinc-800 w-full max-w-md">
                <CardHeader className="relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <CardTitle className="text-white text-center">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                            style={{
                                backgroundColor: '#1B1D23',
                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">G</span>
                                </div>
                                <span>Continuar con Google</span>
                            </div>
                        </Button>

                        <Button
                            onClick={handleWalletConnect}
                            variant="outline"
                            disabled={isConnecting}
                            className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                            style={{
                                backgroundColor: '#1B1D23',
                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                            }}
                        >
                            <Wallet className="w-5 h-5 mr-2" />
                            {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-[#09090B] px-2 text-slate-400">o</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-slate-400"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pr-10 bg-zinc-800 border-zinc-700 text-white placeholder-slate-400"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirmar contraseña
                                </label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-zinc-800 border-zinc-700 text-white placeholder-slate-400"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full text-white"
                            style={{
                                backgroundColor: '#1B1D23',
                                backgroundImage: 'linear-gradient(90deg, #4F5961, #1B1D23)',
                            }}
                        >
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </Button>
                    </form>

                    {/* Toggle between login/register */}
                    <div className="text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginModal;