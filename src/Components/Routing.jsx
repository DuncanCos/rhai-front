import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from '../Pages/Menu'
import Login from '../Pages/Login'
import JobsList from '../Pages/JobsList'
import JobsManagement from '../Pages/JobsManagement'
import AppliedJobs from '../Pages/AppliedJobs'
import Candidates from '../Pages/Candidates'
import RegisterCandidate from '../Pages/RegisterCandidate'
import RegisterRecruiter from '../Pages/RegisterRecruiter'

export default function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/candidate" element={<RegisterCandidate />} />
                <Route path="/register/recruiter" element={<RegisterRecruiter />} />
                <Route path="/jobs" element={<JobsList />} />
                <Route path="/recruiter/jobs" element={<JobsManagement />} />
                <Route path="/user/applied-jobs" element={<AppliedJobs />} />
                <Route path="/recruiter/candidates" element={<Candidates />} />
            </Routes>
        </div>
    )
}
