import React, { useState, useEffect } from 'react';

export default function JobFormModal({ isOpen, onClose, onSubmit, initialData }) {
    // État initial du formulaire
    const defaultState = {
        title: '',
        location: '',
        description: '',
        is_active: true
    };

    const [formData, setFormData] = useState(defaultState);

    // À chaque ouverture ou changement de données (Edit vs Create), on met à jour le formulaire
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(initialData);
        } else if (isOpen) {
            setFormData(defaultState);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box w-11/12 max-w-2xl">
                <form method="dialog">
                    {/* Bouton pour fermer (X) */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                </form>

                <h3 className="font-bold text-lg mb-4">
                    {initialData ? "Modifier l'offre" : "Créer une nouvelle offre"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Titre */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-medium">Intitulé du poste</span></label>
                        <input
                            type="text"
                            required
                            placeholder="ex: Développeur React"
                            className="input input-bordered w-full"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Localisation */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-medium">Localisation</span></label>
                        <input
                            type="text"
                            placeholder="ex: Paris (ou laisser vide pour Télétravail)"
                            className="input input-bordered w-full"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Description du poste</span></label>
                        <textarea
                            className="textarea textarea-bordered h-32"
                            required
                            placeholder="Détails des missions, profil recherché..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Statut (Active) */}
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                            <span className="label-text font-medium">Offre active (visible par les candidats)</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            />
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="modal-action mt-6">
                        <button type="button" className="btn" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn btn-primary">
                            {initialData ? "Sauvegarder les modifications" : "Publier l'offre"}
                        </button>
                    </div>
                </form>
            </div>
            {/* Fond sombre cliquable pour fermer */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}