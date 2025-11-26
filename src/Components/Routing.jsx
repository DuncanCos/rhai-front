import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from '../Pages/Menu'
import Login from '../Pages/Login'
import JobsLists from '../Pages/JobsLists'
import JobsRecruteur from '../Pages/JobsRecruteur'
import JobsCandidatUserList from '../Pages/JobsCandidatUserList'
import JobsCandidatRecruteurList from '../Pages/JobsCandidatRecruteurList'

export default function Routing() {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/jobs-lists" element={<JobsLists />} />
                <Route path="/jobs-recruteur" element={<JobsRecruteur />} />
                <Route path="/jobs-candidat-user-list" element={<JobsCandidatUserList />} />
                <Route path="/jobs-candidat-recruteur-list" element={<JobsCandidatRecruteurList />} />
            </Routes>
        </div>
    )
}
