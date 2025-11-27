import React, { useState } from 'react'
import api from '../context/api'
import { useAuth } from '../context/AuthContext'

function ApplyModal({ job, onClose, onSuccess }) {
    const [resume, setResume] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [lettre, setLettre] = useState('')
    const { user } = useAuth()

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0])
        }
    }

    const handleSubmitApplication = async (e) => {
        e.preventDefault()
        if (!resume || !job) return

        setIsSubmitting(true)
        const formData = new FormData()
        formData.append('cv_file', resume)
        formData.append('job', job.id)
        formData.append('cover_letter', lettre)
        formData.append('candidate', user.id)

        try {
            await api.post('/candidates/applications/', formData, {
                headers: {
                    'Content-Type': undefined,
                }
            })
            alert('Application submitted successfully!')
            onSuccess(job.id)
            onClose()
        } catch (err) {
            console.error('Error submitting application:', err)
            alert('Failed to submit application. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Apply for {job.title}</h3>
                <p className="py-4">Please upload your CV (PDF) to apply for this position.</p>

                <form onSubmit={handleSubmitApplication}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Resume (PDF)</span>
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered w-full"
                            required
                        />
                        <input type="text" placeholder='lettre de motivation' value={lettre} onChange={(e) => setLettre(e.target.value)} />

                    </div>

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <span className="loading loading-spinner"></span> : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}

export default ApplyModal
