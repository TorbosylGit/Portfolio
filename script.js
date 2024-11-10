// async function loadProjects() {
//     try {
//         const response = await fetch('bdd.json');
//         const data = await response.json();
//         const projectGrid = document.querySelector('.projectGrid');
//         let visibleProjects = 3;

//         function displayVisibleProjects() {
//             projectGrid.innerHTML = '';
//             const projectIds = Object.keys(data);
//             projectIds.slice(0, visibleProjects).forEach(key => {
//                 const project = data[key];
//                 const projectHtml = `
//                     <div class="projectItem" data-project="${key}">
//                         <div class="projectImage">
//                             <img src="${project.image_url}" alt="${project.image_alt}" class="cover" />
//                         </div>
//                         <div class="projectDescription">
//                             <h3>${project.title_text}</h3>
//                             <a href="#post" class="btn">En savoir plus</a>
//                         </div>
//                     </div>
//                 `;
//                 projectGrid.insertAdjacentHTML('beforeend', projectHtml);
//             });

//             document.querySelector('.title .btn').style.display =
//                 visibleProjects >= projectIds.length ? 'none' : 'block';

//             document.querySelectorAll('.projectItem').forEach(item => {
//                 item.addEventListener('click', function () {
//                     deselectActiveProject();
//                     this.classList.add('active');
//                     const projectId = this.getAttribute('data-project');
//                     displayProjectDetails(projectId);
//                 });
//             });
//         }

//         displayVisibleProjects();

//         document.querySelector('.title .btn').addEventListener('click', () => {
//             visibleProjects += 3;
//             displayVisibleProjects();
//         });
//     } catch (error) {
//         console.error("Erreur lors du chargement des projets :", error);
//     }
// }

// function displayProjectDetails(projectId) {
//     fetch('bdd.json')
//         .then(response => response.json())
//         .then(data => {
//             const project = data[projectId];
//             if (!project) return;

//             const projectTitle = `<h2>${project.title}</h2>`;
//             const projectContent = `
//                 <div id="project-details">
//                     <h3>${project.context_objectives.heading}</h3>
//                     <p>${project.context_objectives.description}</p>
//                     <h3>${project.techniques_skills.heading}</h3>
//                     <ul>
//                         ${project.techniques_skills.list.map(skill => `<li><strong>${skill.split(':')[0]}:</strong> ${skill.split(':')[1]}</li>`).join('')}
//                     </ul>
//                     <h3>${project.presentation_experience.heading}</h3>
//                     <p>${project.presentation_experience.description}</p>
//                     <ul>
//                         ${project.presentation_experience.list.map(item => `<li>${item}</li>`).join('')}
//                     </ul>
//                     <p>${project.presentation_experience.additional_description}</p>
//                     <h3>${project.results.heading}</h3>
//                     <p>${project.results.description}</p>
//                     ${project.github_link ? `<a href="${project.github_link}" target="_blank">Voir sur GitHub</a>` : ''}
//                 </div>
//             `;
//             document.getElementById('project-title').innerHTML = projectTitle;
//             document.getElementById('project-description').innerHTML = projectContent;
//         })
//         .catch(error => console.error("Erreur lors de l'affichage des détails du projet :", error));
// }

// function deselectActiveProject() {
//     const activeProject = document.querySelector('.projectItem.active');
//     if (activeProject) {
//         activeProject.classList.remove('active');
//     }
// }

// function resetProjectDisplay() {
//     document.getElementById('project-title').innerHTML = `<h2>Mon Portfolio</h2>`;
//     document.getElementById('project-description').innerHTML = `
//         <div class="content">
//             <p>Mon portfolio est une vitrine de mes projets réalisés, chacun reflétant un aspect de mes compétences techniques et de mon engagement dans le développement web. Vous trouverez ici des projets variés, de la création de pages responsives au développement de back-end sécurisé.</p>
//             <p>La diversité des projets démontre ma capacité à gérer plusieurs aspects du développement web, aussi bien en front-end qu’en back-end. Cela prouve ma flexibilité et ma volonté d’apprendre des technologies modernes.</p>
//             <p>Bien que je sois encore en phase d’apprentissage, chaque projet m’a permis de monter en compétences et de mieux comprendre les besoins d'un site web fonctionnel et sécurisé.</p>
//             <p>Je prévois d’ajouter des fonctionnalités interactives et de rendre le portfolio plus dynamique, notamment en intégrant des animations et des projets plus complexes au fur et à mesure de mon évolution professionnelle.</p>
//         </div>`;
//     deselectActiveProject();
// }

// function toggleMenu() {
//     const menuToggle = document.querySelector('.menuToggle');
//     const navigation = document.querySelector('.navigation');
//     menuToggle.classList.toggle('active');
//     navigation.classList.toggle('active');
//     menuToggle.textContent = menuToggle.classList.contains('active') ? 'close' : 'menu';
// }

// document.querySelector('.menuToggle').addEventListener('click', toggleMenu);
// document.querySelectorAll('.navigation a, .footerMenu a').forEach(link => {
//     link.addEventListener('click', () => {
//         resetProjectDisplay();
//         if (document.querySelector('.menuToggle').classList.contains('active')) {
//             toggleMenu();
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', loadProjects);

// document.addEventListener('DOMContentLoaded', () => {
//     const yearElement = document.getElementById('currentYear');
//     const currentYear = new Date().getFullYear();
//     yearElement.textContent = currentYear;
// });

//---

// charger projets depuis bdd.json
async function loadProjects() {
    try {
        const response = await fetch('bdd.json');
        const data = await response.json();
        const projectGrid = document.querySelector('.projectGrid');
        let visibleProjects = 3;

        // afficher projets visibles
        function displayVisibleProjects() {
            projectGrid.innerHTML = '';
            const projectIds = Object.keys(data);
            projectIds.slice(0, visibleProjects).forEach(key => {
                const project = data[key];
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
                projectGrid.insertAdjacentHTML('beforeend', projectHtml);
            });

            // gérer visibilité du bouton
            document.querySelector('.title .btn').style.display =
                visibleProjects >= projectIds.length ? 'none' : 'block';

            // événement de clic pour projets
            document.querySelectorAll('.projectItem').forEach(item => {
                item.addEventListener('click', function () {
                    deselectActiveProject();
                    this.classList.add('active');
                    const projectId = this.getAttribute('data-project');
                    displayProjectDetails(projectId);
                });
            });
        }

        // afficher les projets initiaux
        displayVisibleProjects();

        // charger plus de projets
        document.querySelector('.title .btn').addEventListener('click', () => {
            visibleProjects += 3;
            displayVisibleProjects();
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// afficher détails du projet
function displayProjectDetails(projectId) {
    fetch('bdd.json')
        .then(response => response.json())
        .then(data => {
            const project = data[projectId];
            if (!project) return;

            const projectTitle = `<h2>${project.title}</h2>`;
            const projectContent = `
                <div id="project-details">
                    <h3>${project.context_objectives.heading}</h3>
                    <p>${project.context_objectives.description}</p>
                    <h3>${project.techniques_skills.heading}</h3>
                    <ul>
                        ${project.techniques_skills.list.map(skill => `<li><strong>${skill.split(':')[0]}:</strong> ${skill.split(':')[1]}</li>`).join('')}
                    </ul>
                    <h3>${project.presentation_experience.heading}</h3>
                    <p>${project.presentation_experience.description}</p>
                    <ul>
                        ${project.presentation_experience.list.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <p>${project.presentation_experience.additional_description}</p>
                    <h3>${project.results.heading}</h3>
                    <p>${project.results.description}</p>
                    ${project.github_link ? `<a href="${project.github_link}" target="_blank">Voir sur GitHub</a>` : ''}
                </div>
            `;
            document.getElementById('project-title').innerHTML = projectTitle;
            document.getElementById('project-description').innerHTML = projectContent;
        })
        .catch(error => console.error("Erreur lors de l'affichage des détails du projet :", error));
}

// désélectionner vignette active
function deselectActiveProject() {
    const activeProject = document.querySelector('.projectItem.active');
    if (activeProject) {
        activeProject.classList.remove('active');
    }
}

// réinitialiser affichage du portfolio
function resetProjectDisplay() {
    document.getElementById('project-title').innerHTML = `<h2>Mon Portfolio</h2>`;
    document.getElementById('project-description').innerHTML = `
        <div class="content">
            <p>Mon portfolio est une vitrine de mes projets réalisés, chacun reflétant un aspect de mes compétences techniques et de mon engagement dans le développement web. Vous trouverez ici des projets variés, de la création de pages responsives au développement de back-end sécurisé.</p>
            <p>La diversité des projets démontre ma capacité à gérer plusieurs aspects du développement web, aussi bien en front-end qu’en back-end. Cela prouve ma flexibilité et ma volonté d’apprendre des technologies modernes.</p>
            <p>Bien que je sois encore en phase d’apprentissage, chaque projet m’a permis de monter en compétences et de mieux comprendre les besoins d'un site web fonctionnel et sécurisé.</p>
            <p>Je prévois d’ajouter des fonctionnalités interactives et de rendre le portfolio plus dynamique, notamment en intégrant des animations et des projets plus complexes au fur et à mesure de mon évolution professionnelle.</p>
        </div>`;
    deselectActiveProject();
}

// gérer menu toggle
function toggleMenu() {
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    menuToggle.textContent = menuToggle.classList.contains('active') ? 'close' : 'menu';
}

// initialiser événements du menu
document.querySelector('.menuToggle').addEventListener('click', toggleMenu);
document.querySelectorAll('.navigation a, .footerMenu a').forEach(link => {
    link.addEventListener('click', () => {
        resetProjectDisplay();
        if (document.querySelector('.menuToggle').classList.contains('active')) {
            toggleMenu();
        }
    });
});

// charger projets au chargement du DOM
document.addEventListener('DOMContentLoaded', loadProjects);

// mise à jour année copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});
