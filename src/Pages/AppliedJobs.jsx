import React, { useState, useEffect } from 'react'
import api from '../context/api'

function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userString = localStorage.getItem('user')
                const user = userString ? JSON.parse(userString) : null
                const userId = user?.user_id || user?.id

                if (!userId) {
                    console.warn('User ID not found, cannot filter applications.')
                    // Depending on requirements, we might want to redirect or show empty
                }

                const [applicationsRes, jobsRes] = await Promise.all([
                    api.get('/candidates/applications/'),
                    api.get('/candidates/offers/')
                ])

                const applications = applicationsRes.data
                const jobs = jobsRes.data

                // Filter applications for the current user
                const userApplications = applications.filter(app => app.candidate === userId)

                // Map backend data to frontend structure, linking with job details
                // Map backend data to frontend structure, linking with job details
                const mappedApps = userApplications.map(app => {
                    const job = jobs.find(j => j.id === app.job)
                    return {
                        id: app.id,
                        jobTitle: job?.title || 'Unknown Job',
                        candidateId: app.candidate,
                        location: job?.location || 'Remote',
                        score: app.score || 'N/A',
                        appliedDate: app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                        status: app.status || 'Pending',
                        description: job?.description || ''
                    }
                })

                setAppliedJobs(mappedApps)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('Failed to load applications.')
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const [filterStatus, setFilterStatus] = useState('All')
    const [sortBy, setSortBy] = useState('date')

    const statusOptions = ['All', 'New', 'In review', 'Accepted', 'Rejected']

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'New':
                return 'badge-warning'
            case 'In review':
                return 'badge-info'
            case 'Accepted':
                return 'badge-success'
            case 'Rejected':
                return 'badge-error'
            default:
                return 'badge-neutral'
        }
    }

    let filteredJobs = appliedJobs.filter(job =>
        filterStatus === 'All' || job.status === filterStatus
    )

    if (sortBy === 'date') {
        filteredJobs.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    } else if (sortBy === 'status') {
        filteredJobs.sort((a, b) => a.status.localeCompare(b.status))
    } else if (sortBy === 'title') {
        filteredJobs.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle))
    }

    const handleWithdraw = (id) => {
        if (confirm('Are you sure you want to withdraw this application?')) {
            setAppliedJobs(appliedJobs.filter(job => job.id !== id))

        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center">
                <div className="alert alert-error max-w-md">
                    <span>{error}</span>
                </div>
            </div>
        )
    }

    const stats = {
        total: appliedJobs.length,
        new: appliedJobs.filter(j => j.status === 'New').length,
        inReview: appliedJobs.filter(j => j.status === 'In review').length,
        accepted: appliedJobs.filter(j => j.status === 'Accepted').length,
        rejected: appliedJobs.filter(j => j.status === 'Rejected').length
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">My Job Applications</h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Total Applications</div>
                        <div className="stat-value text-2xl">{stats.total}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">New</div>
                        <div className="stat-value text-xl text-warning">{stats.new}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">In review</div>
                        <div className="stat-value text-xl text-info">{stats.inReview}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Accepted</div>
                        <div className="stat-value text-xl text-success">{stats.accepted}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Rejected</div>
                        <div className="stat-value text-xl text-error">{stats.rejected}</div>
                    </div>
                </div>

                {/* Filter and Sort Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="label">
                            <span className="label-text">Filter by Status</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Sort by</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Most Recent</option>
                            <option value="title">Job Title</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>

                {/* Applications List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <div key={job.id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h2 className="card-title text-2xl mb-1">
                                                        {job.jobTitle}
                                                        <span className="text-sm font-normal text-base-content/60 ml-2">
                                                            Candidate: {job.candidateId}
                                                        </span>
                                                    </h2>
                                                </div>
                                                <div className={`badge badge-lg ${getStatusBadgeColor(job.status)}`}>
                                                    {job.status}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="badge">{job.location}</span>
                                                <span className="badge badge-success">Score: {job.score}</span>
                                            </div>
                                            <p className="text-sm text-base-content/70 mb-2">
                                                Applied: {job.appliedDate}
                                            </p>
                                            <p className="mb-4">{job.description}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end gap-2">
                                        {job.status === 'Accepted' ? (
                                            <div className="alert alert-success w-full">
                                                <span>🎉 Congratulations! You got the job!</span>
                                            </div>
                                        ) : job.status === 'Rejected' ? (
                                            <div className="alert alert-error w-full">
                                                <span>Unfortunately, you were not selected for this position.</span>
                                            </div>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-outline btn-error"
                                                onClick={() => handleWithdraw(job.id)}
                                            >
                                                Withdraw Application
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 card bg-base-200">
                            <p className="text-xl text-base-content/70">No applications found with the selected filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppliedJobs
