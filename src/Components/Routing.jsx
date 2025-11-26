import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from '../Pages/Menu'
import Login from '../Pages/Login'
export default function Routing() {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}
