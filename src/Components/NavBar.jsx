import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <div className="navbar bg-base-300 shadow-lg">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    RHai
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {user?.role === 'candidate' && (
                        <li>
                            <Link to="/jobs" className="btn btn-ghost">
                                Job Listings
                            </Link>
                        </li>
                    )}
                    {user?.role === 'candidate' && (
                        <li>
                            <Link to="/user/applied-jobs" className="btn btn-ghost">
                                My Applications
                            </Link>
                        </li>
                    )}
                    {user?.role === 'recruiter' && (
                        <li>
                            <Link to="/recruiter/jobs" className="btn btn-ghost">
                                Manage Jobs
                            </Link>
                        </li>
                    )}
                    {user?.role === 'recruiter' && (
                        <li>
                            <Link to="/recruiter/candidates" className="btn btn-ghost">
                                Candidates
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {user ? (

                <div className="navbar-end gap-2">
                    {user.role}
                    {user.username}
                    <button onClick={logout} className="btn btn-sm btn-error ml-2">
                        Déconnexion
                    </button>
                    <div className="dropdown dropdown-end lg:hidden">
                        <div tabIndex={0} className="btn btn-ghost">
                            Menu
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                            {user.role === 'candidate' && (
                                <li>
                                    <Link to="/jobs">Job Listings</Link>
                                </li>
                            )}
                            {user.role === 'candidate' && (
                                <li>
                                    <Link to="/user/applied-jobs">My Applications</Link>
                                </li>
                            )}
                            {user.role === 'recruiter' && (
                                <li>
                                    <Link to="/recruiter/jobs">Manage Jobs</Link>
                                </li>
                            )}
                            {user.role === 'recruiter' && (
                                <li>
                                    <Link to="/recruiter/candidates">Candidates</Link>
                                </li>
                            )}
                            <li>
                                <button onClick={logout}>Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            )}
        </div>

    );
};

export default Navbar;