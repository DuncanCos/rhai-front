import React, { useState } from 'react';

// --- MOCK DATA (Simulation API avec structure imbriquée) ---
// Dans ton API Django, tu utiliserais probablement un JobOfferSerializer 
// avec un champ 'applications' (nested serializer)
const mockJobsWithApplications = [
    {
        id: 101,
        title: "Développeur Backend Python",
        location: "Paris",
        is_active: true,
        created_at: "2023-11-01",
        applications: [
            {
                id: 1,
                candidate_name: "Alice Dupont", // Venant de settings.AUTH_USER_MODEL
                score: 88.5,
                status: "new",
                cv_file: "cv_alice.pdf",
                cover_letter: "Bonjour, expert Django depuis 4 ans...",
                created_at: "2023-11-20"
            },
            {
                id: 2,
                candidate_name: "Bob Martin",
                score: 45.0,
                status: "rejected",
                cv_file: "cv_bob.pdf",
                cover_letter: "",
                created_at: "2023-11-22"
            }
        ]
    },
    {
        id: 102,
        title: "Product Owner (Agile)",
        location: "Lyon / Remote",
        is_active: true,
        created_at: "2023-11-05",
        applications: [
            {
                id: 3,
                candidate_name: "Sophie Bernard",
                score: 92.0,
                status: "in_review",
                cv_file: "cv_sophie.pdf",
                cover_letter: "Passionnée par Scrum...",
                created_at: "2023-11-25"
            }
        ]
    },
    {
        id: 103,
        title: "Stagiaire DevOps",
        location: "Bordeaux",
        is_active: false,
        created_at: "2023-10-15",
        applications: [] // Aucune candidature
    }
];

export default function JobsCandidatRecruteurList() {
    const [jobs, setJobs] = useState(mockJobsWithApplications);
    const [modalContent, setModalContent] = useState(null); // Pour la lettre de motivation

    // Mise à jour du statut d'une candidature spécifique
    const handleStatusChange = (jobId, appId, newStatus) => {
        const updatedJobs = jobs.map(job => {
            if (job.id !== jobId) return job;

            const updatedApps = job.applications.map(app =>
                app.id === appId ? { ...app, status: newStatus } : app
            );

            return { ...job, applications: updatedApps };
        });
        setJobs(updatedJobs);
    };

    // Couleurs selon le score
    const getScoreColor = (score) => {
        if (score >= 80) return "text-success";
        if (score >= 50) return "text-warning";
        return "text-error";
    };

    // Couleurs des statuts pour le select
    const getStatusClass = (status) => {
        switch (status) {
            case 'accepted': return 'select-success';
            case 'rejected': return 'select-error';
            case 'in_review': return 'select-warning';
            default: return 'select-info';
        }
    };

    return (
        <div className="p-4 lg:p-8 bg-base-200 min-h-screen font-sans">
            <h1 className="text-3xl font-bold mb-6 text-base-content">Candidatures par Offre</h1>

            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm rounded-box">
                        <input type="checkbox" name="my-accordion-2" defaultChecked={job.applications.length > 0} />

                        {/* --- Header de l'accordéon (Le Job) --- */}
                        <div className="collapse-title flex items-center justify-between pr-12">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold">{job.title}</h2>
                                    {!job.is_active && <span className="badge badge-sm badge-ghost">Clôturé</span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {job.location} • Publié le {new Date(job.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Compteur de candidats */}
                            <div className="indicator">
                                <span className="badge badge-primary font-bold indicator-item border-none">
                                    {job.applications.length}
                                </span>
                                <button className="btn btn-sm btn-ghost cursor-default">Candidats</button>
                            </div>
                        </div>

                        {/* --- Contenu de l'accordéon (Les Applications) --- */}
                        <div className="collapse-content bg-base-100">
                            <div className="overflow-x-auto mt-4">
                                {job.applications.length > 0 ? (
                                    <table className="table table-sm lg:table-md w-full">
                                        {/* En-tête Tableau */}
                                        <thead className="bg-base-200">
                                            <tr>
                                                <th>Candidat</th>
                                                <th className="text-center">IA Score</th>
                                                <th>Documents</th>
                                                <th>Statut</th>
                                                <th>Reçu le</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {job.applications.map((app) => (
                                                <tr key={app.id} className="hover:bg-base-200/50 transition-colors">

                                                    {/* Nom Candidat */}
                                                    <td className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <div className="avatar placeholder">
                                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 text-white text-xs">
                                                                    {app.candidate_name.substring(0, 2).toUpperCase()}
                                                                </div>
                                                            </div>
                                                            {app.candidate_name}
                                                        </div>
                                                    </td>

                                                    {/* Score */}
                                                    <td className="text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <span className={`font-bold ${getScoreColor(app.score)}`}>{app.score}%</span>
                                                            <progress className={`progress w-16 h-1.5 ${getScoreColor(app.score).replace('text-', 'progress-')}`} value={app.score} max="100"></progress>
                                                        </div>
                                                    </td>

                                                    {/* Actions Documents */}
                                                    <td>
                                                        <div className="flex items-center gap-2">
                                                            {/* CV Download */}
                                                            <a href={app.cv_file} className="btn btn-square btn-xs btn-outline" title="Télécharger CV">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                            </a>
                                                            {/* Lettre de motivation */}
                                                            <button
                                                                className={`btn btn-square btn-xs btn-outline ${!app.cover_letter && 'btn-disabled opacity-20'}`}
                                                                onClick={() => setModalContent(app.cover_letter)}
                                                                title="Voir lettre de motivation"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                            </button>
                                                        </div>
                                                    </td>

                                                    {/* Select Statut */}
                                                    <td>
                                                        <select
                                                            className={`select select-bordered select-xs w-full max-w-xs ${getStatusClass(app.status)}`}
                                                            value={app.status}
                                                            onChange={(e) => handleStatusChange(job.id, app.id, e.target.value)}
                                                        >
                                                            <option value="new">Nouveau</option>
                                                            <option value="in_review">En cours</option>
                                                            <option value="accepted">Accepté</option>
                                                            <option value="rejected">Rejeté</option>
                                                        </select>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="text-gray-500 text-xs">
                                                        {new Date(app.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-6 text-gray-400 italic">
                                        Aucune candidature pour le moment.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Modale pour la lettre de motivation --- */}
            {modalContent && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Lettre de motivation</h3>
                        <div className="p-4 bg-base-200 rounded-lg text-sm whitespace-pre-line leading-relaxed">
                            {modalContent}
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setModalContent(null)}>Fermer</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setModalContent(null)}>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
}