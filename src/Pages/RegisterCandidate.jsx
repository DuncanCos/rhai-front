import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterCandidate() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'candidate',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register as Candidate</h1>
                    <p className="py-6">Join us to find your dream job!</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        {error && <div className="alert alert-error">{error}</div>}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                className="input input-bordered"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>

                        <label className="label">
                            <Link to="/login" className="label-text-alt link link-hover">Already have an account? Login</Link>
                        </label>
                        <label className="label">
                            <Link to="/register/recruiter" className="label-text-alt link link-hover">Register as Recruiter</Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
