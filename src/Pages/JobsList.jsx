import React, { useState, useEffect } from 'react'
import api from '../context/api'
import ApplyModal from '../Components/ApplyModal'

function JobsList() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [appliedJobs, setAppliedJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/candidates/offers/')
                // Map backend data to frontend structure
                const mappedJobs = response.data.map(job => ({
                    id: job.id,
                    title: job.title,
                    location: job.location || 'Remote',
                    description: job.description,
                    postedDate: new Date(job.created_at).toLocaleDateString()
                }))
                setJobs(mappedJobs)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching jobs:', err)
                setError('Failed to load jobs. Please try again later.')
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    const filteredJobs = jobs.filter(job => {
        return job.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const handleApplyClick = (job) => {
        if (appliedJobs.includes(job.id)) {
            alert('You have already applied for this job.')
            return
        }
        setSelectedJob(job)
    }

    const handleCloseModal = () => {
        setSelectedJob(null)
    }

    const handleApplicationSuccess = (jobId) => {
        setAppliedJobs([...appliedJobs, jobId])
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Job Listings</h1>

                {/* Search and Filter Section */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                    <div>
                        <input
                            type="text"
                            placeholder="Search jobs by title..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <div key={job.id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h2 className="card-title text-2xl mb-2">{job.title}</h2>
                                            <div className="flex flex-wrap gap-3 mb-3">
                                                <span className="badge badge-lg">{job.location}</span>
                                            </div>
                                            <p className="text-sm text-base-content/70 mb-3">Posted: {job.postedDate}</p>
                                            <p className="mb-4">{job.description}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end gap-2">
                                        <button
                                            className={`btn ${appliedJobs.includes(job.id) ? 'btn-disabled' : 'btn-primary'}`}
                                            onClick={() => handleApplyClick(job)}
                                        >
                                            {appliedJobs.includes(job.id) ? '✓ Applied' : 'Apply Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-base-content/70">No jobs found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Applications Summary */}
                <div className="mt-8 p-6 bg-info/20 rounded-lg">
                    <p className="text-lg">
                        <span className="font-bold">Applications:</span> You have applied to {appliedJobs.length} job(s)
                    </p>
                </div>
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <ApplyModal
                    job={selectedJob}
                    onClose={handleCloseModal}
                    onSuccess={handleApplicationSuccess}
                />
            )}
        </div>
    )
}

export default JobsList
