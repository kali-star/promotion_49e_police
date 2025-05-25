document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');

    // Toggle mobile menu
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('is-active'); // For hamburger animation
        });
    }

    // Close mobile menu when a link is clicked (optional)
    if (navList) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('is-active');
                }
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');

    // Toggle mobile menu
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('is-active'); // For hamburger animation
        });
    }

    // Close mobile menu when a link is clicked (optional)
    if (navList) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('is-active');
                }
            });
        });
    }

    // --- Espace Membres - DÉMONSTRATION FRONTEND UNIQUEMENT ---
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const memberNameSpan = document.getElementById('member-name');
    const logoutButton = document.getElementById('logout-button');

    // Pour simuler la connexion (vous remplacerez ceci par un vrai appel API)
    if (loginForm && loginSection && dashboardSection) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // --- VÉRIFICATION SIMPLE POUR LA DÉMO ---
            if (username === 'promo49' && password === 'password123') { // REMPLACER PAR VRAIE AUTHENTIFICATION BACKEND
                loginSection.classList.add('hidden'); // Masque le formulaire
                dashboardSection.classList.remove('hidden'); // Affiche le tableau de bord
                memberNameSpan.textContent = username; // Affiche le nom d'utilisateur (peut être le nom réel de l'utilisateur après une vraie connexion)
                alert('Connexion réussie (démo) !');
            } else {
                alert('Identifiant ou mot de passe incorrect (démo).');
            }
        });
    }

    // Pour simuler la déconnexion (vous remplacerez ceci par un vrai appel API)
    if (logoutButton && loginSection && dashboardSection) {
        logoutButton.addEventListener('click', () => {
            dashboardSection.classList.add('hidden'); // Masque le tableau de bord
            loginSection.classList.remove('hidden'); // Affiche le formulaire de connexion
            document.getElementById('login-form').reset(); // Réinitialise le formulaire
            alert('Déconnexion réussie (démo) !');
        });

        document.addEventListener('DOMContentLoaded', () => {
    // ... (votre code existant pour le hamburger et l'espace membres) ...

    // --- Formulaire de Contact - DÉMONSTRATION FRONTEND UNIQUEMENT ---
   document.addEventListener('DOMContentLoaded', () => {
    // ... (votre code existant pour le hamburger, l'espace membres, la galerie, l'agenda, et les animations) ...

    // --- Formulaire de Contact ---
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    // Nettoyage du formulaire de contact de démonstration
    // Le formulaire est maintenant géré par PHP, donc nous supprimons l'ancien EventListener JS
    if (contactForm) {
        // Supprimez l'ancien EventListener si vous l'aviez laissé pour la démo
        // contactForm.removeEventListener('submit', /* votre fonction de soumission */);
        
        // Gérer l'affichage des messages de succès/erreur après redirection PHP
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const message = urlParams.get('msg');

        if (status && formMessages) {
            formMessages.textContent = message || (status === 'success' ? 'Votre message a été envoyé avec succès !' : 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
            formMessages.classList.add('show', status);

            // Retirer les paramètres de l'URL après affichage pour une URL propre
            setTimeout(() => {
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: newUrl }, '', newUrl);
            }, 5000); // Retire les paramètres après 5 secondes
        }
    }
    // --- FIN Formulaire de Contact ---
});
    // --- FIN DÉMONSTRATION Formulaire de Contact ---
});
    }
    // --- FIN DÉMONSTRATION Espace Membres ---


    // Vous pouvez ajouter plus de JavaScript ici pour:
    // - Dynamic gallery (e.g., lightbox, carousel)
    // - Form validation (for contact page)
    // - Smooth scrolling
    // - API calls for actualities/agenda (if you have a backend)
});
    }

    // You can add more JavaScript here for:
    // - Dynamic gallery (e.g., lightbox, carousel)
    // - Form validation (for contact page)
    // - Smooth scrolling
    // - API calls for actualities/agenda (if you have a backend)
    document.addEventListener('DOMContentLoaded', () => {
    // ... (votre code existant pour le hamburger, l'espace membres, et le formulaire de contact) ...

    // --- GALERIE MULTIMÉDIA - FILTRES ET LIGHTBOX ---

    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const closeButton = document.querySelector('.lightbox .close-button');

    // 1. Fonctionnalité de filtrage
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Supprimer la classe 'active' de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe 'active' au bouton cliqué
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const itemType = item.getAttribute('data-type'); // 'image' ou 'video'

                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                    } else if (filterValue === 'photo' && itemType === 'image') {
                        item.classList.remove('hidden');
                    } else if (filterValue === 'video' && itemType === 'video') {
                        item.classList.remove('hidden');
                    } else if (itemCategory === filterValue) { // Pour les filtres de catégorie personnalisés
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // 2. Fonctionnalité Lightbox (pour les images uniquement, vidéos s'ouvrent directement dans l'iframe)
    if (lightbox && lightboxContent && closeButton) {
        galleryItems.forEach(item => {
            if (item.getAttribute('data-type') === 'image') { // N'applique la lightbox qu'aux images
                item.addEventListener('click', () => {
                    const imgSrc = item.querySelector('img').src;
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    
                    // Vider le contenu précédent et ajouter la nouvelle image
                    lightboxContent.innerHTML = ''; 
                    lightboxContent.appendChild(imgElement);
                    lightbox.classList.add('active'); // Afficher la lightbox
                });
            }
        });

        // Fermer la lightbox via le bouton de fermeture
        closeButton.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = ''; // Nettoyer le contenu
        });

        // Fermer la lightbox en cliquant en dehors de l'image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Si le clic est sur l'overlay et non l'image
                lightbox.classList.remove('active');
                lightboxContent.innerHTML = ''; // Nettoyer le contenu
            }
        });
    }


    
    
    // --- FIN GALERIE MULTIMÉDIA ---



    document.addEventListener('DOMContentLoaded', () => {
    // ... (votre code existant pour le hamburger, l'espace membres, le formulaire de contact, la galerie, l'agenda, et l'animation du titre du logo) ...

    // --- ANIMATION DE LA SECTION HERO (SUR INDEX.HTML UNIQUEMENT) ---
    const heroSection = document.getElementById('hero-section');
    const heroContent = document.querySelector('#hero-section .hero-content');
    const heroAnimationKey = 'heroAnimated'; // Clé pour sessionStorage

    if (heroSection && heroContent) { // S'assure que nous sommes bien sur une page avec cette section
        // Vérifie si l'animation de la section hero a déjà été jouée dans cette session
        if (sessionStorage.getItem(heroAnimationKey) === 'true') {
            // Si oui, on applique directement les styles finaux pour éviter le flash
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            // Appliquer les styles finaux aux éléments enfants pour qu'ils soient visibles
            heroContent.querySelectorAll('p, h2, .hero-actions .btn').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        } else {
            // Sinon, on déclenche l'animation après un court délai
            setTimeout(() => {
                heroContent.classList.add('fade-in');
                sessionStorage.setItem(heroAnimationKey, 'true'); // Marque l'animation comme jouée
            }, 300); // Délai de 300ms après le chargement de la page pour le déclenchement
        }
    }
    // --- FIN ANIMATION DE LA SECTION HERO ---
});
});
});