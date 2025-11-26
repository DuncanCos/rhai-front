import React, { useState } from 'react';

// 1. Simulation des données basées sur ton modèle Django "Application"
// Note: Dans la vraie app, candidate_name et job_title viendraient des relations Foreign Keys
const mockApplications = [
    {
        id: 1,
        candidate_name: "Alice Dupont",
        candidate_email: "alice@example.com",
        job_title: "Développeur Fullstack Django",
        cv_file: "/path/to/cv_alice.pdf",
        cover_letter: "Bonjour, passionnée par Django depuis 3 ans, je souhaite rejoindre votre équipe...",
        score: 85.5, // FloatField
        status: "new",
        created_at: "2023-11-25T09:00:00Z",
    },
    {
        id: 2,
        candidate_name: "Jean Martin",
        candidate_email: "jean.m@example.com",
        job_title: "Data Analyst",
        cv_file: "/path/to/cv_jean.pdf",
        cover_letter: "", // Pas de lettre
        score: 42.0,
        status: "rejected",
        created_at: "2023-11-20T14:30:00Z",
    },
    {
        id: 3,
        candidate_name: "Sophie Morel",
        candidate_email: "sophie.morel@example.com",
        job_title: "Développeur Fullstack Django",
        cv_file: "/path/to/cv_sophie.pdf",
        cover_letter: "Je suis très intéressée par le poste. Voici mes motivations...",
        score: 92.0,
        status: "in_review",
        created_at: "2023-11-24T10:15:00Z",
    },
];

// Mapping des statuts pour l'affichage et les couleurs
const STATUS_CONFIG = {
    new: { label: "Nouveau", color: "badge-info" },
    in_review: { label: "En revue", color: "badge-warning" },
    accepted: { label: "Accepté", color: "badge-success" },
    rejected: { label: "Rejeté", color: "badge-error" },
};

export default function JobsLists() {
    const [applications, setApplications] = useState(mockApplications);
    const [selectedLetter, setSelectedLetter] = useState(null);

    // Fonction pour changer le statut (simule un appel API PATCH)
    const handleStatusChange = (id, newStatus) => {
        const updatedApps = applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApps);
        console.log(`Statut mis à jour pour ID ${id} : ${newStatus}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    // Fonction pour déterminer la couleur du score
    const getScoreColor = (score) => {
        if (!score) return "text-gray-400";
        if (score >= 80) return "text-success font-bold";
        if (score >= 50) return "text-warning font-bold";
        return "text-error font-bold";
    };

    return (
        <div className="p-4 lg:p-8 bg-base-200 min-h-screen font-sans">

            {/* --- En-tête --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-base-content">Gestion des Candidatures</h1>
                    <p className="text-gray-500 text-sm">Suivez et évaluez les postulants à vos offres.</p>
                </div>
                <div className="stats shadow bg-base-100 mt-4 md:mt-0 p-2">
                    <div className="stat place-items-center py-2">
                        <div className="stat-title">Total</div>
                        <div className="stat-value text-primary text-2xl">{applications.length}</div>
                    </div>
                    <div className="stat place-items-center py-2">
                        <div className="stat-title">Nouveaux</div>
                        <div className="stat-value text-info text-2xl">
                            {applications.filter(a => a.status === 'new').length}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Tableau --- */}
            <div className="overflow-x-auto bg-base-100 rounded-box shadow-lg">
                <table className="table table-zebra w-full">
                    {/* Head */}
                    <thead>
                        <tr className="bg-base-200 text-base-content uppercase text-xs">
                            <th>Candidat / Job</th>
                            <th className="text-center">Score (IA)</th>
                            <th>Documents</th>
                            <th>Statut</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id} className="hover">

                                {/* 1. Colonne Candidat & Job */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-xs">{app.candidate_name.substring(0, 2).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{app.candidate_name}</div>
                                            <div className="text-xs opacity-50">{app.job_title}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Colonne Score */}
                                <td className="text-center">
                                    {app.score ? (
                                        <div className="tooltip" data-tip={`Score de pertinence: ${app.score}%`}>
                                            <span className={getScoreColor(app.score)}>{app.score}%</span>
                                            <progress className={`progress w-16 h-1.5 ml-2 align-middle ${app.score >= 80 ? 'progress-success' : app.score >= 50 ? 'progress-warning' : 'progress-error'}`} value={app.score} max="100"></progress>
                                        </div>
                                    ) : (
                                        <span className="badge badge-ghost badge-sm">N/A</span>
                                    )}
                                </td>

                                {/* 3. Colonne Documents (CV + Lettre) */}
                                <td>
                                    <div className="flex gap-2">
                                        {/* Bouton CV */}
                                        <button className="btn btn-square btn-ghost btn-sm tooltip" data-tip="Télécharger CV">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </button>

                                        {/* Bouton Lettre de motivation */}
                                        {app.cover_letter ? (
                                            <button
                                                className="btn btn-square btn-ghost btn-sm tooltip"
                                                data-tip="Lire la lettre"
                                                onClick={() => setSelectedLetter({ name: app.candidate_name, text: app.cover_letter })}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </button>
                                        ) : (
                                            <button className="btn btn-square btn-ghost btn-sm btn-disabled opacity-20">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </td>

                                {/* 4. Colonne Statut (Select interactif) */}
                                <td>
                                    <span className="badge badge-xs badge-outline">{app.status}</span>
                                </td>

                                {/* 5. Colonne Date */}
                                <td className="text-xs text-gray-500">
                                    {formatDate(app.created_at)}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Modale Lettre de Motivation --- */}
            {selectedLetter && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Lettre de {selectedLetter.name}</h3>
                        <p className="py-4 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                            {selectedLetter.text}
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setSelectedLetter(null)}>Fermer</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedLetter(null)}>close</button>
                    </form>
                </dialog>
            )}

        </div>
    );
}