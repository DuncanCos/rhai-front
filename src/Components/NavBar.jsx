import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-lg mb-8">
            {/* --- Partie Gauche : Logo / Menu --- */}
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Menu
                </Link>
            </div>

            {/* --- Partie Droite : Actions --- */}
            <div className="flex-none gap-4">

                {/* Bouton Login (visible si pas connecté) */}
                <Link to="/login" className="btn btn-primary btn-sm">
                    Login
                </Link>

                {/* Dropdown Mon Compte (Avatar) */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-primary">
                            {/* Image de placeholder ou image utilisateur */}

                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Mon Compte
                                <span className="badge">Nouveau</span>
                            </Link>
                        </li>
                        <li><Link to="/settings">Paramètres</Link></li>
                        <li><button>Déconnexion</button></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;