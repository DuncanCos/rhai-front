import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../context/api';
import { useState } from 'react';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError('');
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Échec de la connexion. Vérifiez vos identifiants.');
        }
    };
    const handleAdmin = () => {
        navigate('http://localhost:8000/admin/');
    };
    return (
        // Conteneur principal (Centré verticalement et horizontalement)
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">

                {/* Section Texte / Branding (Optionnel, pour le style) */}
                <div className="text-center lg:text-left px-4">
                    <h1 className="text-5xl font-bold">Connexion</h1>

                </div>

                {/* La Carte de Login */}
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {error && <div className="alert alert-error">{error}</div>}

                        {/* Champ Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Votre mot de passe"
                                className="input input-bordered"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Mot de passe oublié ?
                                </a>
                            </label>
                        </div>

                        {/* Bouton d'action */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleLogin}>Se connecter</button>
                        </div>

                        {/* Lien d'inscription (Footer de la carte) */}
                        <div className="text-center mt-4">
                            <span className="text-sm text-base-content/70">Pas encore de compte ? </span>
                            <a href="/register/candidate" className="link link-primary text-sm">S'inscrire</a>
                        </div>

                    </div>
                </div>
                <button className='btn btn-primary' onClick={handleAdmin}>Mode Admin</button>
            </div>

        </div>
    )
}
