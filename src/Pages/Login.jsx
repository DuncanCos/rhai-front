import React from 'react'

export default function Login() {
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
                    <form className="card-body">

                        {/* Champ Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email@exemple.com"
                                className="input input-bordered"
                                required
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
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Mot de passe oublié ?
                                </a>
                            </label>
                        </div>

                        {/* Bouton d'action */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Se connecter</button>
                        </div>

                        {/* Lien d'inscription (Footer de la carte) */}
                        <div className="text-center mt-4">
                            <span className="text-sm text-base-content/70">Pas encore de compte ? </span>
                            <a href="#" className="link link-primary text-sm">S'inscrire</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
