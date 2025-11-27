import React, { useState, useEffect } from 'react'
import api from '../context/api'

function Candidates() {
    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [filterStatus, setFilterStatus] = useState('All')
    const [filterPosition, setFilterPosition] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [showDetails, setShowDetails] = useState(false)

    const statusOptions = ['All', 'new', 'in_review', 'accepted', 'rejected']

    useEffect(() => {
        fetchCandidates()
    }, [])

    const fetchCandidates = async () => {
        try {
            const response = await api.get('/candidates/applications/')
            setCandidates(response.data)
            setLoading(false)
        } catch (err) {
            console.error("Error fetching candidates:", err)
            setError("Failed to load candidates")
            setLoading(false)
        }
    }

    const positions = ['All', ...new Set(candidates.map(c => c.job_title).filter(Boolean))]

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'new':
                return 'badge-neutral'
            case 'in_review':
                return 'badge-warning'
            case 'accepted':
                return 'badge-success'
            case 'rejected':
                return 'badge-error'
            default:
                return 'badge-ghost'
        }
    }

    const formatStatus = (status) => {
        if (!status) return ''
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    let filteredCandidates = candidates.filter(candidate => {
        const matchesStatus = filterStatus === 'All' || candidate.status === filterStatus
        const matchesPosition = filterPosition === 'All' || candidate.job_title === filterPosition
        const matchesSearch = (candidate.candidate_username && candidate.candidate_username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (candidate.candidate_email && candidate.candidate_email.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesStatus && matchesPosition && matchesSearch
    })

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/candidates/applications/${id}/status/`, { status: newStatus })
            setCandidates(candidates.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            ))
            if (selectedCandidate && selectedCandidate.id === id) {
                setSelectedCandidate({ ...selectedCandidate, status: newStatus })
            }
        } catch (err) {
            console.error("Error updating status:", err)
            alert("Failed to update status")
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
        new: candidates.filter(c => c.status === 'new').length,
        in_review: candidates.filter(c => c.status === 'in_review').length,
        accepted: candidates.filter(c => c.status === 'accepted').length,
        rejected: candidates.filter(c => c.status === 'rejected').length
    }

    if (loading) return <div className="p-6 text-center">Loading candidates...</div>
    if (error) return <div className="p-6 text-center text-error">{error}</div>

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
                        <div className="stat-title">New</div>
                        <div className="stat-value text-xl">{stats.new}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">In Review</div>
                        <div className="stat-value text-xl text-warning">{stats.in_review}</div>
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
                                <option key={status} value={status}>{formatStatus(status) || 'All Status'}</option>
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
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map(candidate => (
                                    <tr key={candidate.id} className="hover:bg-base-100">
                                        <td className="font-semibold">{candidate.candidate_username}</td>
                                        <td>{candidate.job_title}</td>
                                        <td>{new Date(candidate.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div className={`badge badge-lg ${getStatusBadgeColor(candidate.status)}`}>
                                                {formatStatus(candidate.status)}
                                            </div>
                                        </td>
                                        <td>
                                            {candidate.score !== null ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    {candidate.score}
                                                </div>
                                            ) : 'N/A'}
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
                                                        <option key={status} value={status}>{formatStatus(status)}</option>
                                                    ))}
                                                </select>
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
                            <h3 className="font-bold text-lg mb-4">{selectedCandidate.candidate_username}</h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-base-content/70">Email</p>
                                        <p className="font-semibold">{selectedCandidate.candidate_email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Applied Date</p>
                                        <p className="font-semibold">{new Date(selectedCandidate.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-base-content/70">Position Applied</p>
                                        <p className="font-semibold">{selectedCandidate.job_title}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Score</p>
                                        <p className="font-semibold">
                                            {selectedCandidate.score !== null ? (
                                                <>
                                                    <span className="text-yellow-500">★</span> {selectedCandidate.score}
                                                </>
                                            ) : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/70 mb-2">Current Status</p>
                                    <div className={`badge badge-lg ${getStatusBadgeColor(selectedCandidate.status)}`}>
                                        {formatStatus(selectedCandidate.status)}
                                    </div>
                                </div>

                                {selectedCandidate.cover_letter && (
                                    <div>
                                        <p className="text-sm text-base-content/70 mb-2">Cover Letter</p>
                                        <div className="bg-base-200 p-4 rounded-lg text-sm">
                                            {selectedCandidate.cover_letter}
                                        </div>
                                    </div>
                                )}

                                {selectedCandidate.cv_file && (
                                    <div>
                                        <p className="text-sm text-base-content/70 mb-2">CV</p>
                                        <a href={selectedCandidate.cv_file} target="_blank" rel="noopener noreferrer" className="link link-primary">
                                            Download CV
                                        </a>
                                    </div>
                                )}
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
