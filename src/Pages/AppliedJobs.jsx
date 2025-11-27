import React, { useState } from 'react'

function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([
        {
            id: 1,
            jobTitle: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'Remote',
            salary: '$80,000 - $120,000',
            appliedDate: '2025-11-22',
            status: 'Pending',
            description: 'React Developer position'
        },
        {
            id: 2,
            jobTitle: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'San Francisco, CA',
            salary: '$70,000 - $110,000',
            appliedDate: '2025-11-21',
            status: 'Interviewing',
            description: 'Create amazing user experiences'
        },
        {
            id: 3,
            jobTitle: 'Data Scientist',
            company: 'DataViz Inc',
            location: 'Boston, MA',
            salary: '$100,000 - $150,000',
            appliedDate: '2025-11-20',
            status: 'Rejected',
            description: 'Machine learning and data analysis'
        },
        {
            id: 4,
            jobTitle: 'Backend Developer',
            company: 'InnovateTech',
            location: 'New York, NY',
            salary: '$90,000 - $130,000',
            appliedDate: '2025-11-19',
            status: 'Accepted',
            description: 'Node.js and database expert needed'
        },
        {
            id: 5,
            jobTitle: 'Project Manager',
            company: 'EnterpriseSoft',
            location: 'Remote',
            salary: '$85,000 - $125,000',
            appliedDate: '2025-11-18',
            status: 'Pending',
            description: 'Lead cross-functional teams'
        }
    ])

    const [filterStatus, setFilterStatus] = useState('All')
    const [sortBy, setSortBy] = useState('date')

    const statusOptions = ['All', 'Pending', 'Interviewing', 'Accepted', 'Rejected']

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'badge-warning'
            case 'Interviewing':
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

    const stats = {
        total: appliedJobs.length,
        pending: appliedJobs.filter(j => j.status === 'Pending').length,
        interviewing: appliedJobs.filter(j => j.status === 'Interviewing').length,
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
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-xl text-warning">{stats.pending}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Interviewing</div>
                        <div className="stat-value text-xl text-info">{stats.interviewing}</div>
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
                                                    <h2 className="card-title text-2xl mb-1">{job.jobTitle}</h2>
                                                    <p className="text-lg font-semibold text-primary">{job.company}</p>
                                                </div>
                                                <div className={`badge badge-lg ${getStatusBadgeColor(job.status)}`}>
                                                    {job.status}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="badge">{job.location}</span>
                                                <span className="badge badge-success">{job.salary}</span>
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
