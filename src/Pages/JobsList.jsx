import React, { useState } from 'react'

function JobsList() {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'Remote',
            salary: '$80,000 - $120,000',
            description: 'We are looking for an experienced Frontend Developer with React expertise.',
            category: 'IT',
            postedDate: '2025-11-20'
        },
        {
            id: 2,
            title: 'Backend Developer',
            company: 'InnovateTech',
            location: 'New York, NY',
            salary: '$90,000 - $130,000',
            description: 'Seeking a Backend Developer proficient in Node.js and databases.',
            category: 'IT',
            postedDate: '2025-11-18'
        },
        {
            id: 3,
            title: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'San Francisco, CA',
            salary: '$70,000 - $110,000',
            description: 'Join our design team to create amazing user experiences.',
            category: 'Design',
            postedDate: '2025-11-15'
        },
        {
            id: 4,
            title: 'Data Scientist',
            company: 'DataViz Inc',
            location: 'Boston, MA',
            salary: '$100,000 - $150,000',
            description: 'Help us extract insights from large datasets using machine learning.',
            category: 'Data',
            postedDate: '2025-11-12'
        },
        {
            id: 5,
            title: 'Project Manager',
            company: 'EnterpriseSoft',
            location: 'Remote',
            salary: '$85,000 - $125,000',
            description: 'Lead cross-functional teams and deliver projects on time.',
            category: 'Management',
            postedDate: '2025-11-10'
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [appliedJobs, setAppliedJobs] = useState([])

    const categories = ['All', 'IT', 'Design', 'Data', 'Management']

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleApplyJob = (jobId) => {
        if (!appliedJobs.includes(jobId)) {
            setAppliedJobs([...appliedJobs, jobId])
            alert('Successfully applied for this job!')
        } else {
            alert('You have already applied for this job.')
        }
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Job Listings</h1>

                {/* Search and Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Search jobs by title or company..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            className="select select-bordered w-full"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
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
                                            <p className="text-lg font-semibold text-primary mb-1">{job.company}</p>
                                            <div className="flex flex-wrap gap-3 mb-3">
                                                <span className="badge badge-lg">{job.location}</span>
                                                <span className="badge badge-lg badge-accent">{job.category}</span>
                                                <span className="badge badge-lg badge-success">{job.salary}</span>
                                            </div>
                                            <p className="text-sm text-base-content/70 mb-3">Posted: {job.postedDate}</p>
                                            <p className="mb-4">{job.description}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end gap-2">
                                        <button
                                            className={`btn ${appliedJobs.includes(job.id) ? 'btn-disabled' : 'btn-primary'}`}
                                            onClick={() => handleApplyJob(job.id)}
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
        </div>
    )
}

export default JobsList
