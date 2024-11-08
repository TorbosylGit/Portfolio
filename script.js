// sélection des éléments principaux
const menuToggle = document.querySelector('.menuToggle');
const navigation = document.querySelector('.navigation');
const header = document.querySelector('header');
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const loadMoreButton = document.querySelector(".title .btn");
let visibleProjects = 3; // compteur de projets visibles

// fonction ouvrir/fermer le menu
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    menuToggle.textContent = menuToggle.classList.contains('active') ? 'close' : 'menu';
}

// fonction fermer le menu
function closeMenu() {
    menuToggle.classList.remove('active');
    navigation.classList.remove('active');
    menuToggle.textContent = 'menu';
}

// ouvrir/fermer menu sur clic
menuToggle.addEventListener('click', toggleMenu);

// fermer menu sur clic lien
document.querySelectorAll('.navigation a, .footerMenu a').forEach(link => {
    link.addEventListener('click', () => {
        resetProjectDisplay(); // réinitialiser affichage projet
        closeMenu(); // fermer le menu
    });
});

// fonction réinitialiser affichage projet
function resetProjectDisplay() {
    projectTitle.innerHTML = "<h2>Mon Portfolio</h2>";
    projectDescription.innerHTML = `
        <div class="content">
            <p>Mon portfolio est une vitrine de mes projets réalisés, chacun reflétant un aspect de mes compétences techniques et de mon engagement dans le développement web. Vous trouverez ici des projets variés, de la création de pages responsives au développement de back-end sécurisé.</p>
            <p>La diversité des projets démontre ma capacité à gérer plusieurs aspects du développement web, aussi bien en front-end qu’en back-end. Cela prouve ma flexibilité et ma volonté d’apprendre des technologies modernes.</p>
            <p>Bien que je sois encore en phase d’apprentissage, chaque projet m’a permis de monter en compétences et de mieux comprendre les besoins d'un site web fonctionnel et sécurisé.</p>
            <p>Je prévois d’ajouter des fonctionnalités interactives et de rendre le portfolio plus dynamique, notamment en intégrant des animations et des projets plus complexes au fur et à mesure de mon évolution professionnelle.</p>
        </div>`;
    document.querySelectorAll(".postBx").forEach(thumbnail => {
        thumbnail.classList.remove("active");
    });
}

// désélectionner projets sur clic portfolio
document.querySelector('.postBx[data-project="project_7"] .btn').addEventListener('click', () => {
    resetProjectDisplay();
});

// charger données du projet JSON
async function loadProjectData(projectId) {
    try {
        const response = await fetch("bdd.json");
        const data = await response.json();

        if (data[projectId]) {
            const project = data[projectId];
            projectTitle.innerHTML = project.title;

            const description = `
                ${project.context_objectives.heading}
                ${project.context_objectives.description}
            `;

            const techniques = `
                ${project.techniques_skills.heading}
                <ul>
                    ${project.techniques_skills.list.join("")}
                </ul>
            `;

            const presentation = `
                ${project.presentation_experience.heading}
                ${project.presentation_experience.description}
                <ul>
                    ${project.presentation_experience.list.join("")}
                </ul>
            `;

            const results = `
                ${project.results.heading}
                ${project.results.description}
            `;

            const githubLink = project.github_link 
                ? `<p><a href="${project.github_link}" target="_blank">Voir sur GitHub</a></p>`
                : '';

            projectDescription.innerHTML = `
                ${description}
                ${techniques}
                ${presentation}
                ${results}
                ${githubLink}
            `;

            setActiveThumbnail(projectId); // activer vignette sélectionnée
        } else {
            console.error(`Projet ${projectId} non trouvé dans le JSON.`);
        }
    } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON:", error);
    }
}

// activer vignette projet sélectionné
function setActiveThumbnail(projectId) {
    document.querySelectorAll(".postBx").forEach(thumbnail => {
        thumbnail.classList.remove("active");
    });

    const selectedThumbnail = document.querySelector(`.postBx[data-project="${projectId}"]`);
    if (selectedThumbnail) {
        selectedThumbnail.classList.add("active");
    }
}

// afficher projets initialement visibles
function displayProjects() {
    document.querySelectorAll(".postBx").forEach((project, index) => {
        project.style.display = index < visibleProjects ? "block" : "none";
    });
    loadMoreButton.style.display = document.querySelectorAll(".postBx").length > visibleProjects ? "block" : "none";
}

// afficher projets supplémentaires sans défilement
loadMoreButton.addEventListener('click', (event) => {
    event.preventDefault(); // empêcher défilement page
    visibleProjects += 3;
    displayProjects();
});

// initialiser l'affichage des projets
displayProjects();

// charger données projets sur clic
document.querySelectorAll(".postBx .btn").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const projectId = button.closest(".postBx").dataset.project;
        loadProjectData(projectId);
    });
});