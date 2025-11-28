import axios from 'axios';

// 1. Création de l'instance Axios
// On utilise une variable d'environnement pour l'URL pour faciliter le switch dev/prod
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000000, // Timeout après 10 secondes
});

// 2. Intercepteur de REQUÊTE (Request Interceptor)
// S'exécute avant que la requête ne parte vers le serveur.
api.interceptors.request.use(
    (config) => {
        // Récupérer le token depuis le stockage local (ou cookies/context)
        const userString = localStorage.getItem('user');

        // Si un token existe, on l'ajoute au header Authorization
        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.access) {
                config.headers.Authorization = `Bearer ${user.access}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Intercepteur de RÉPONSE (Response Interceptor)
// S'exécute dès que le serveur répond (succès ou erreur).
api.interceptors.response.use(
    (response) => {
        // On peut retourner directement response.data pour simplifier les appels dans les composants
        return response;
    },
    (error) => {
        // Gestion globale des erreurs
        if (error.response) {

            // Cas : Non autorisé (Token expiré ou invalide)
            if (error.response.status === 401) {
                console.warn('Session expirée, redirection vers login...');
                // localStorage.removeItem('user');
                // Optionnel : Rediriger l'utilisateur
                // window.location.href = '/login';
            }

            // Cas : Ressource non trouvée
            if (error.response.status === 404) {
                console.error('Ressource introuvable');
            }

            // Cas : Erreur serveur
            if (error.response.status >= 500) {
                console.error('Erreur serveur, veuillez réessayer plus tard.');
            }
        } else if (error.request) {
            // La requête est partie mais pas de réponse (problème réseau)
            console.error('Erreur réseau : Pas de réponse du serveur.');
        }

        return Promise.reject(error);
    }
);

export default api;