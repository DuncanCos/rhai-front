import React, { useState } from 'react'

function Candidates() {
    const [candidates, setCandidates] = useState([
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567',
            position: 'Frontend Developer',
            appliedDate: '2025-11-22',
            status: 'Reviewing',
            experience: '5 years',
            skills: ['React', 'JavaScript', 'CSS', 'HTML'],
            rating: 4.5
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 234-5678',
            position: 'Backend Developer',
            appliedDate: '2025-11-21',
            status: 'Interviewed',
            experience: '7 years',
            skills: ['Node.js', 'MongoDB', 'PostgreSQL', 'REST API'],
            rating: 4.8
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'm.chen@email.com',
            phone: '+1 (555) 345-6789',
            position: 'Frontend Developer',
            appliedDate: '2025-11-20',
            status: 'Rejected',
            experience: '2 years',
            skills: ['React', 'Vue.js', 'JavaScript'],
            rating: 3.2
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'emma.d@email.com',
            phone: '+1 (555) 456-7890',
            position: 'UI/UX Designer',
            appliedDate: '2025-11-19',
            status: 'Shortlisted',
            experience: '4 years',
            skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
            rating: 4.7
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.w@email.com',
            phone: '+1 (555) 567-8901',
            position: 'Backend Developer',
            appliedDate: '2025-11-18',
            status: 'Accepted',
            experience: '8 years',
            skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
            rating: 4.9
        }
    ])

    const [filterStatus, setFilterStatus] = useState('All')
    const [filterPosition, setFilterPosition] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [showDetails, setShowDetails] = useState(false)

    const statusOptions = ['All', 'Reviewing', 'Interviewed', 'Shortlisted', 'Accepted', 'Rejected']
    const positions = ['All', ...new Set(candidates.map(c => c.position))]

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Reviewing':
                return 'badge-warning'
            case 'Interviewed':
                return 'badge-info'
            case 'Shortlisted':
                return 'badge-accent'
            case 'Accepted':
                return 'badge-success'
            case 'Rejected':
                return 'badge-error'
            default:
                return 'badge-neutral'
        }
    }

    let filteredCandidates = candidates.filter(candidate => {
        const matchesStatus = filterStatus === 'All' || candidate.status === filterStatus
        const matchesPosition = filterPosition === 'All' || candidate.position === filterPosition
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesPosition && matchesSearch
    })

    const handleStatusChange = (id, newStatus) => {
        setCandidates(candidates.map(c =>
            c.id === id ? { ...c, status: newStatus } : c
        ))
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this candidate?')) {
            setCandidates(candidates.filter(c => c.id !== id))
        }
    }

    const handleViewDetails = (candidate) => {
        setSelectedCandidate(candidate)
        setShowDetails(true)
    }

    const handleCloseDetails = () => {
        setShowDetails(false)
        setSelectedCandidate(null)
    }

    const stats = {
        total: candidates.length,
        reviewing: candidates.filter(c => c.status === 'Reviewing').length,
        interviewed: candidates.filter(c => c.status === 'Interviewed').length,
        shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
        accepted: candidates.filter(c => c.status === 'Accepted').length
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Candidates Management</h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Total Candidates</div>
                        <div className="stat-value text-2xl">{stats.total}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Reviewing</div>
                        <div className="stat-value text-xl text-warning">{stats.reviewing}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Interviewed</div>
                        <div className="stat-value text-xl text-info">{stats.interviewed}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Shortlisted</div>
                        <div className="stat-value text-xl text-accent">{stats.shortlisted}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Accepted</div>
                        <div className="stat-value text-xl text-success">{stats.accepted}</div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            className="select select-bordered w-full"
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                        >
                            {positions.map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    </div>
                    <div>
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
                </div>

                {/* Candidates Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full bg-base-200 rounded-lg">
                        <thead>
                            <tr className="bg-base-300">
                                <th>Name</th>
                                <th>Position</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map(candidate => (
                                    <tr key={candidate.id} className="hover:bg-base-100">
                                        <td className="font-semibold">{candidate.name}</td>
                                        <td>{candidate.position}</td>
                                        <td>{candidate.appliedDate}</td>
                                        <td>
                                            <div className={`badge badge-lg ${getStatusBadgeColor(candidate.status)}`}>
                                                {candidate.status}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                {candidate.rating}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => handleViewDetails(candidate)}
                                                >
                                                    View
                                                </button>
                                                <select
                                                    className="select select-bordered select-sm"
                                                    value={candidate.status}
                                                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                                                >
                                                    {statusOptions.filter(s => s !== 'All').map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    className="btn btn-sm btn-error"
                                                    onClick={() => handleDelete(candidate.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        <p className="text-lg text-base-content/70">No candidates found matching your criteria.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Candidate Details Modal */}
                {showDetails && selectedCandidate && (
                    <div className="modal modal-open">
                        <div className="modal-box w-11/12 max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">{selectedCandidate.name}</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-base-content/70">Email</p>
                                        <p className="font-semibold">{selectedCandidate.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Phone</p>
                                        <p className="font-semibold">{selectedCandidate.phone}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-base-content/70">Position Applied</p>
                                        <p className="font-semibold">{selectedCandidate.position}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Experience</p>
                                        <p className="font-semibold">{selectedCandidate.experience}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-base-content/70">Applied Date</p>
                                        <p className="font-semibold">{selectedCandidate.appliedDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Rating</p>
                                        <p className="font-semibold">
                                            <span className="text-yellow-500">★</span> {selectedCandidate.rating}/5
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/70 mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((skill, idx) => (
                                            <span key={idx} className="badge badge-primary">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/70 mb-2">Current Status</p>
                                    <div className={`badge badge-lg ${getStatusBadgeColor(selectedCandidate.status)}`}>
                                        {selectedCandidate.status}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button
                                    className="btn"
                                    onClick={handleCloseDetails}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={handleCloseDetails}>close</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Candidates
