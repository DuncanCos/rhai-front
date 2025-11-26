import React from 'react'
import { useState } from 'react'

const mockJobs = [
    {
        id: 1,
        title: "Développeur Fullstack Django/React",
        description: "Nous recherchons un développeur capable de créer des APIs robustes avec Django DRF et de gérer le front avec React. Vous travaillerez au sein d'une équipe agile sur des projets innovants.",
        location: "Paris",
        created_at: "2023-11-20T09:00:00Z",
        is_active: true,
    },
    {
        id: 2,
        title: "Administrateur Système Linux",
        description: "Gestion de parcs serveurs, automatisation avec Ansible et surveillance de la production. Une astreinte est à prévoir une semaine par mois.",
        location: "Lyon",
        created_at: "2023-11-18T14:30:00Z",
        is_active: true,
    },
    {
        id: 3,
        title: "Chef de Projet Digital",
        description: "Coordination des équipes techniques et créatives. Vous serez garant du respect des délais et de la qualité des livrables pour nos clients grands comptes.",
        location: "", // Cas où location est vide (blank=True)
        created_at: "2023-11-15T10:15:00Z",
        is_active: false, // Offre inactive
    },
    {
        id: 4,
        title: "Data Analyst",
        description: "Analyse de données complexes pour aider à la prise de décision stratégique. Maîtrise de SQL et Python requise.",
        location: "Marseille",
        created_at: "2023-11-22T08:00:00Z",
        is_active: true,
    },
];


export default function JobsCandidatUserList() {
    const [filterText, setFilterText] = useState("");

    // Fonction utilitaire pour formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    // Filtrage des jobs (par titre ou localisation)
    const filteredJobs = mockJobs.filter(job => {
        // On peut choisir de ne pas afficher les inactifs
        // if (!job.is_active) return false; 

        const searchLower = filterText.toLowerCase();
        return (
            job.title.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="min-h-screen bg-base-200 font-sans p-4 lg:p-8">

            {/* --- En-tête --- */}
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-base-content mb-2">Nos Opportunités</h1>
                <p className="text-gray-500">Découvrez nos dernières offres d'emploi.</p>
            </div>

            {/* --- Barre de Recherche --- */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="join w-full shadow-sm">
                    <div className="btn join-item no-animation bg-base-100 border-none hover:bg-base-100 cursor-default">
                        {/* SVG Search Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input
                        className="input input-bordered join-item w-full focus:outline-none"
                        placeholder="Rechercher par poste ou ville..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
            </div>

            {/* --- Liste des Cartes --- */}
            <div className="max-w-4xl mx-auto grid gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job.id} className={`card bg-base-100 shadow-md transition-all hover:shadow-lg border-l-4 ${job.is_active ? 'border-primary' : 'border-gray-300 opacity-75'}`}>
                            <div className="card-body p-6">

                                {/* Header Carte : Titre + Date */}
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                                    <div>
                                        <h2 className="card-title text-xl text-primary font-bold">
                                            {job.title}
                                            {!job.is_active && <span className="badge badge-ghost badge-sm">Clôturée</span>}
                                        </h2>

                                        {/* Localisation & Date */}
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                {/* SVG MapPin */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {job.location || "Télétravail / Non spécifié"}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {/* SVG Calendar */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                Publié le {formatDate(job.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bouton Action (Visible sur desktop à droite) */}
                                    <div className="hidden md:block">
                                        <button className="btn btn-primary btn-sm" disabled={!job.is_active}>
                                            Voir l'offre
                                        </button>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-4 text-base-content/80 text-sm leading-relaxed">
                                    <p className="line-clamp-2">{job.description}</p>
                                </div>

                                {/* Bouton Action (Visible sur mobile en bas) */}
                                <div className="md:hidden mt-4 pt-4 border-t border-base-200">
                                    <button className="btn btn-primary btn-block btn-sm" disabled={!job.is_active}>
                                        Voir l'offre
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Aucune offre ne correspond à votre recherche.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
