// -----------------------------
// Chargement dynamique d'Anime.js
// -----------------------------
function loadAnimeJs(callback) {
    const animeScript = document.createElement('script');
    animeScript.src =
        'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js';
    animeScript.integrity =
        'sha512-aNMyYYxdIxIaot0Y1/PLuEu3eipGCmsEUBrUq+7aVyPGMFH8z0eTP0tkqAvv34fzN6z+201d3T8HPb1svWSKHQ==';
    animeScript.crossOrigin = 'anonymous';
    animeScript.referrerPolicy = 'no-referrer';
    animeScript.onload = callback; // Appeler la fonction principale une fois chargé
    document.head.appendChild(animeScript);
}

// -----------------------------
// Effet des icônes dans la bannière
// -----------------------------
function initializeEffectInBanner() {
    const effectContainer = document.querySelector('.effect-container');
    const iconSizeMin = 20;
    const iconSizeMax = 80;
    const maxIcons = 30;

    // générer une liste unicode dans la plage
    const Unicode = [];
    for (let i = 0xf000; i <= 0xf099; i++) {
        Unicode.push(`&#x${i.toString(16)};`);
    }

    // générer des indices uniques
    function generateUniqueIndices(maxIcons, arrayLength) {
        const indices = new Set();
        while (indices.size < maxIcons) {
            const randomIndex = Math.floor(Math.random() * arrayLength);
            indices.add(randomIndex);
        }
        return Array.from(indices); // convertir en tableau
    }

    // sélection unique des icônes
    const uniqueIndices = generateUniqueIndices(maxIcons, Unicode.length);
    const shuffledIcons = uniqueIndices.map((index) => Unicode[index]); // sélection stricte

    // initialise les icônes au centre
    function initializeIcons() {
        const containerRect = effectContainer.getBoundingClientRect();
        const icons = []; // liste des icônes

        // limite du conteneur
        const maxWidth = containerRect.width * 0.8;
        const maxHeight = containerRect.height * 0.8;
        const offsetX = (containerRect.width - maxWidth) / 2;
        const offsetY = (containerRect.height - maxHeight) / 2;

        for (let i = 0; i < maxIcons; i++) {
            const icon = document.createElement('i');
            icon.className = 'icon fas';
            icon.innerHTML = shuffledIcons[i];

            // taille aléatoire pour chaque icône
            const randomSize =
                Math.random() * (iconSizeMax - iconSizeMin) + iconSizeMin;
            icon.style.fontSize = `${randomSize}px`;

            // position initiale au centre
            icon.style.position = 'absolute';
            const centerX = containerRect.width / 2 - randomSize / 2;
            const centerY = containerRect.height / 2 - randomSize / 2;
            icon.style.left = `${centerX}px`;
            icon.style.top = `${centerY}px`;

            effectContainer.appendChild(icon);

            // position finale et vitesse
            const finalX = offsetX + Math.random() * (maxWidth - randomSize);
            const finalY = offsetY + Math.random() * (maxHeight - randomSize);

            // ajouter l'icône avec ses propriétés et vitesse initiale aléatoire
            icons.push({
                element: icon,
                size: randomSize,
                x: finalX,
                y: finalY,
                velocityX: (Math.random() - 0.5) * 0.12, // vitesse aléatoire sur X
                velocityY: (Math.random() - 0.5) * 0.12, // vitesse aléatoire sur Y
                scale: Math.random() * 1.5 + 0.5, // échelle finale
            });
        }

        animateIcons(icons); // démarre l'animation initiale
    }

    // mise à jour position et rebonds
    function updateIconPosition(icon, containerRect) {
        const { element, size } = icon;

        // mettre à jour la position
        icon.x += icon.velocityX;
        icon.y += icon.velocityY;

        // vérifie les collisions avec les bords et rebondit
        if (icon.x <= 0 || icon.x + size >= containerRect.width) {
            icon.velocityX *= -1; // inverse la direction sur X
            icon.x = Math.max(
                0,
                Math.min(icon.x, containerRect.width - 2 * size)
            ); // reste dans les limites
        }
        if (icon.y <= 0 || icon.y + size >= containerRect.height) {
            icon.velocityY *= -1; // inverse la direction sur Y
            icon.y = Math.max(
                0,
                Math.min(icon.y, containerRect.height - 2 * size)
            ); // reste dans les limites
        }

        // appliquer les nouvelles positions
        element.style.left = `${icon.x}px`;
        element.style.top = `${icon.y}px`;
    }

    // animation de jaillissement
    function animateIcons(icons) {
        icons.forEach((icon) => {
            const { element, x, y, scale } = icon;

            // animation initiale avec Anime.js
            anime({
                targets: element,
                left: `${x}px`,
                top: `${y}px`,
                scale: scale,
                duration: 2000,
                easing: 'easeOutExpo',
                complete: () => {
                    // démarre le mouvement continu après le jaillissement
                    requestAnimationFrame(() =>
                        moveIcons(
                            icons,
                            effectContainer.getBoundingClientRect()
                        )
                    );
                },
            });
        });
    }

    // mouvement continu
    function moveIcons(icons, containerRect) {
        icons.forEach((icon) => updateIconPosition(icon, containerRect));
        requestAnimationFrame(() => moveIcons(icons, containerRect)); // boucle d'animation
    }

    initializeIcons();
}

// -----------------------------
// Chargement des projets
// -----------------------------
// charger les projets depuis bdd.json
async function loadProjects() {
    try {
        // charger les données JSON
        const response = await fetch('bdd.json');
        const data = await response.json();
        const projectGrid = document.querySelector('.projectGrid');
        let visibleProjects = 3; // nombre initial de projets visibles

        // trier les projets par date
        const sortedProjects = Object.entries(data).sort(
            ([, a], [, b]) => new Date(b.date) - new Date(a.date)
        );

        // afficher les projets visibles
        function displayVisibleProjects() {
            projectGrid.innerHTML = ''; // réinitialiser le contenu
            sortedProjects
                .slice(0, visibleProjects)
                .forEach(([key, project]) => {
                    // créer le HTML pour chaque projet
                    const projectHtml = `
                    <div class="projectItem" data-project="${key}">
                        <div class="projectImage">
                            <img src="${project.image_url}" alt="${project.image_alt}" class="cover" />
                        </div>
                        <div class="projectDescription">
                            <h3>${project.title_text}</h3>
                            <a href="#post" class="btn">En savoir plus</a>
                        </div>
                    </div>
                `;
                    projectGrid.insertAdjacentHTML('beforeend', projectHtml); // ajouter au DOM
                });

            // afficher ou cacher le bouton
            document.querySelector('.title .btn').style.display =
                visibleProjects >= sortedProjects.length ? 'none' : 'block';

            // ajouter les événements de clic
            document.querySelectorAll('.projectItem').forEach((item) => {
                item.addEventListener('click', function () {
                    deselectActiveProject(); // désélectionner l'ancien projet
                    this.classList.add('active'); // marquer comme actif
                    const projectId = this.getAttribute('data-project');
                    displayProjectDetails(projectId); // afficher les détails
                });
            });
        }

        displayVisibleProjects(); // afficher les projets au démarrage

        // gérer le clic sur "Afficher plus"
        document.querySelector('.title .btn').addEventListener('click', () => {
            visibleProjects += 3; // augmenter le nombre visible
            displayVisibleProjects(); // rafraîchir l'affichage
        });
    } catch (error) {
        console.error('Erreur lors du chargement des projets :', error); // gérer les erreurs
    }
}

// afficher les détails d'un projet
function displayProjectDetails(projectId) {
    fetch('bdd.json') // récupérer les données
        .then((response) => response.json())
        .then((data) => {
            const project = data[projectId]; // récupérer le projet sélectionné
            if (!project) return; // sortir si non trouvé

            const projectTitle = `<h2>${project.title}</h2>`; // titre du projet
            const projectContent = `
                <div id="project-details">
                    <h3>${project.context_objectives.heading}</h3>
                    <p>${project.context_objectives.description}</p>
                    
                    <h3>${project.techniques_skills.heading}</h3>
                    <ul>
                        ${project.techniques_skills.list
                            .map((skill) => {
                                if (skill.includes(':')) {
                                    const [boldPart, rest] = skill.split(
                                        ':',
                                        2
                                    );
                                    return `<li><strong>${boldPart.trim()}:</strong> ${rest.trim()}</li>`;
                                }
                                return `<li>${skill}</li>`; // texte simple
                            })
                            .join('')}
                    </ul>

                    <h3>${project.presentation_experience.heading}</h3>
                    <p>${project.presentation_experience.description}</p>
                    <ul>
                        ${project.presentation_experience.list
                            .map((item) => {
                                if (item.includes(':')) {
                                    const [boldPart, rest] = item.split(':', 2);
                                    return `<li><strong>${boldPart.trim()}:</strong> ${rest.trim()}</li>`;
                                }
                                return `<li>${item}</li>`; // texte simple
                            })
                            .join('')}
                    </ul>
                    <p>${
                        project.presentation_experience.additional_description
                    }</p>

                    <h3>${project.results.heading}</h3>
                    <p>${project.results.description}</p>

                    ${
                        project.github_link
                            ? `<a href="${project.github_link}" target="_blank">Voir sur GitHub</a>` // lien GitHub
                            : ''
                    }
                </div>
            `;
            document.getElementById('project-title').innerHTML = projectTitle; // mettre à jour le titre
            document.getElementById('project-description').innerHTML =
                projectContent; // mettre à jour le contenu
        })
        .catch((error) =>
            console.error(
                "Erreur lors de l'affichage des détails du projet :",
                error
            )
        );
}

// désélectionner le projet actif
function deselectActiveProject() {
    const activeProject = document.querySelector('.projectItem.active');
    if (activeProject) {
        activeProject.classList.remove('active'); // retirer la classe active
    }
}

// gestion de l'ouverture/fermeture du menu
function toggleMenu() {
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active'); // basculer l'état actif
    navigation.classList.toggle('active'); // afficher ou cacher le menu
    menuToggle.textContent = menuToggle.classList.contains('active')
        ? 'close'
        : 'menu';
}

document.querySelector('.menuToggle').addEventListener('click', toggleMenu); // gérer le clic du menu
document.querySelectorAll('.navigation a, .footerMenu a').forEach((link) => {
    link.addEventListener('click', () => {
        if (
            document.querySelector('.menuToggle').classList.contains('active')
        ) {
            toggleMenu(); // fermer le menu après clic
        }
    });
});

// -----------------------------
// Initialisation
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadAnimeJs(() => {
        initializeEffectInBanner(); // effet des icônes
    });
    loadProjects(); // chargement des projets
});
