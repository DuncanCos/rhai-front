import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-300 shadow-lg">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    RHai
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <Link to="/jobs" className="btn btn-ghost">
                            Job Listings
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/applied-jobs" className="btn btn-ghost">
                            My Applications
                        </Link>
                    </li>
                    <li>
                        <Link to="/recruiter/jobs" className="btn btn-ghost">
                            Manage Jobs
                        </Link>
                    </li>
                    <li>
                        <Link to="/recruiter/candidates" className="btn btn-ghost">
                            Candidates
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} className="btn btn-ghost">
                        Menu
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/jobs">Job Listings</Link>
                        </li>
                        <li>
                            <Link to="/user/applied-jobs">My Applications</Link>
                        </li>
                        <li>
                            <Link to="/recruiter/jobs">Manage Jobs</Link>
                        </li>
                        <li>
                            <Link to="/recruiter/candidates">Candidates</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Navbar;