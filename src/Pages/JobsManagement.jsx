import React, { useState, useEffect } from 'react'
import api from '../context/api'
import { useAuth } from '../context/AuthContext'

function JobsManagement() {
    const { user } = useAuth()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        recruiter: user.id,
        is_active: true
    })

    const categories = ['IT', 'Design', 'Data', 'Management', 'Sales', 'HR']

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const response = await api.get('/candidates/offers/')
            setJobs(response.data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching jobs:', err)
            setError('Failed to load jobs')
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleOpenModal = (job = null) => {
        if (job) {
            setEditingId(job.id)
            setFormData({
                title: job.title,
                company: job.recruiter || '', // Mapping recruiter to company for now or empty
                location: job.location,
                salary: '', // Not in response
                description: job.description,
                category: 'IT' // Default
            })
        } else {
            setEditingId(null)
            setFormData({
                title: '',
                company: '',
                location: '',
                salary: '',
                description: '',
                category: 'IT'
            })
        }
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editingId) {
                // Update existing job
                // The user only asked for GET and POST, but I'll try to keep PUT if possible.
                // Assuming endpoint /candidates/offers/{id}/
                await api.put(`/candidates/offers/${editingId}/`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access}`
                    }
                })
                fetchJobs() // Refresh list
            } else {
                // Create new job
                await api.post('/candidates/offers/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access}`
                    }
                })
                fetchJobs() // Refresh list
            }
            handleCloseModal()
        } catch (err) {
            console.error('Error saving job:', err)
            alert('Failed to save job')
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this job posting?')) {
            try {
                await api.delete(`/candidates/offers/${id}/`)
                fetchJobs()
            } catch (err) {
                console.error('Error deleting job:', err)
                alert('Failed to delete job')
            }
        }
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>
    if (error) return <div className="p-6 text-center text-error">{error}</div>

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Jobs Management</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleOpenModal()}
                    >
                        + Post New Job
                    </button>
                </div>

                {/* Jobs List */}
                <div className="grid grid-cols-1 gap-6">
                    {jobs.length > 0 ? (
                        jobs.map(job => (
                            <div key={job.id} className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h2 className="card-title text-2xl mb-2">{job.title}</h2>
                                            {/* Displaying Recruiter ID as Company for now since we don't have company name */}
                                            <p className="text-lg font-semibold text-primary mb-1">Recruiter: {job.recruiter}</p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="badge">{job.location}</span>
                                                {/* <span className="badge badge-accent">{job.category}</span> */}
                                                {/* <span className="badge badge-success">{job.salary}</span> */}
                                                {job.is_active && <span className="badge badge-success">Active</span>}
                                            </div>
                                            <p className="text-sm text-base-content/70 mb-2">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                                            <p className="mb-4">{job.description}</p>
                                            {/* <div className="alert alert-info">
                                                <span className="font-bold">{job.applicants} applicants</span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleOpenModal(job)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 card bg-base-200">
                            <p className="text-xl text-base-content/70">No job postings yet. Create one to get started!</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box w-11/12 max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">
                                {editingId ? 'Edit Job Posting' : 'Create New Job Posting'}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Job Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g., Frontend Developer"
                                        className="input input-bordered"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Keeping these fields in the form but they might not be used by API */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Company</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Company name"
                                            className="input input-bordered"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select
                                            name="category"
                                            className="select select-bordered"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Location</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="City, Country"
                                            className="input input-bordered"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {/* <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Salary Range</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="salary"
                                            placeholder="e.g., $80,000 - $120,000"
                                            className="input input-bordered"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                </div>

                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Job description"
                                        className="textarea textarea-bordered h-24"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingId ? 'Update Job' : 'Post Job'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={handleCloseModal}>close</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobsManagement
