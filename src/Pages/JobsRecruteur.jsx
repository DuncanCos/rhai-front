import React, { useState } from 'react';
import JobFormModal from '../Components/JobFormModal';

// Mock Data initial
const initialJobs = [
    { id: 1, title: "Développeur Python Junior", location: "Lyon", description: "...", is_active: true, created_at: new Date().toISOString() },
    { id: 2, title: "Product Owner", location: "Paris", description: "...", is_active: false, created_at: new Date().toISOString() },
];

export default function JobsRecruteur() {
    const [jobs, setJobs] = useState(initialJobs);

    // États pour la gestion de la modale
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null); // null = mode création, object = mode édition

    // --- ACTIONS CRUD ---

    // 1. DELETE
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.")) {
            setJobs(jobs.filter(job => job.id !== id));
        }
    };

    // 2. TOGGLE STATUS (Active/Inactive direct depuis la liste)
    const handleToggleStatus = (id) => {
        setJobs(jobs.map(job =>
            job.id === id ? { ...job, is_active: !job.is_active } : job
        ));
    };

    // 3. OPEN MODAL (Create)
    const openCreateModal = () => {
        setCurrentJob(null);
        setIsModalOpen(true);
    };

    // 4. OPEN MODAL (Edit)
    const openEditModal = (job) => {
        setCurrentJob(job);
        setIsModalOpen(true);
    };

    // 5. SUBMIT (Gère Create & Update)
    const handleFormSubmit = (formData) => {
        if (currentJob) {
            // UPDATE : On met à jour l'élément existant
            setJobs(jobs.map(job =>
                job.id === currentJob.id ? { ...formData, id: currentJob.id, created_at: currentJob.created_at } : job
            ));
        } else {
            // CREATE : On ajoute un nouvel élément
            const newJob = {
                ...formData,
                id: Date.now(), // ID temporaire unique
                created_at: new Date().toISOString()
            };
            setJobs([newJob, ...jobs]);
        }
        // La fermeture est gérée par le callback onClose dans la modale, mais on peut forcer ici si besoin
    };

    return (
        <div className="p-4 lg:p-8 bg-base-200 min-h-screen font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">Mes Offres d'Emploi</h1>
                    <p className="text-gray-500">Gérez vos offres, modifiez les détails ou suspendez le recrutement.</p>
                </div>
                <button className="btn btn-primary gap-2" onClick={openCreateModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Nouvelle Offre
                </button>
            </div>

            {/* Tableau des Jobs */}
            <div className="overflow-x-auto bg-base-100 rounded-box shadow-lg">
                <table className="table w-full">
                    {/* En-tête */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>Statut</th>
                            <th>Intitulé / Localisation</th>
                            <th className="hidden md:table-cell">Description</th>
                            <th>Date création</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <tr key={job.id} className="hover">

                                    {/* Statut (Clickable pour toggle rapide) */}
                                    <td>
                                        <div className="form-control">
                                            <label className="cursor-pointer label justify-start gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success toggle-sm"
                                                    checked={job.is_active}
                                                    onChange={() => handleToggleStatus(job.id)}
                                                />
                                                <span className={`badge badge-sm ${job.is_active ? 'badge-success' : 'badge-ghost'}`}>
                                                    {job.is_active ? 'Active' : 'Brouillon'}
                                                </span>
                                            </label>
                                        </div>
                                    </td>

                                    {/* Titre & Loc */}
                                    <td>
                                        <div className="font-bold text-lg">{job.title}</div>
                                        <div className="text-sm opacity-50 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {job.location || "Non spécifié"}
                                        </div>
                                    </td>

                                    {/* Description (Truncated) */}
                                    <td className="hidden md:table-cell max-w-xs truncate text-gray-500">
                                        {job.description}
                                    </td>

                                    {/* Date */}
                                    <td className="text-sm text-gray-500">
                                        {new Date(job.created_at).toLocaleDateString()}
                                    </td>

                                    {/* Actions Buttons */}
                                    <td className="text-right">
                                        <div className="join">
                                            <button
                                                className="btn btn-sm btn-ghost join-item tooltip"
                                                data-tip="Modifier"
                                                onClick={() => openEditModal(job)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-ghost join-item tooltip"
                                                data-tip="Supprimer"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-400">
                                    Aucune offre créée. Commencez par cliquer sur "Nouvelle Offre".
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- Integration de la Modale --- */}
            <JobFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={currentJob}
            />

        </div>
    );
}