

document.addEventListener('DOMContentLoaded', function() {
    console.log("Pathname:", window.location.pathname);  
    console.log("Search Params:", window.location.search);  

    if (window.location.pathname === '/character.php') {
        const urlParams = new URLSearchParams(window.location.search);
        const characterId = urlParams.get('id');

        console.log("Character ID:", characterId);  

        if (characterId) {
            fetchCharacterDetails(characterId);
        } else {
            console.error("Aucun ID de personnage trouvé dans l'URL.");
        }
    } else {
        console.error("Cette page n'est pas une page de détails de personnage.");
    }

    function fetchCharacterDetails(characterId) {
        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(response => {
                console.log("API Response Status:", response.status);  
                if (!response.ok) {
                    throw new Error(`Erreur API: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Character Data:", data);  

                const detailsSection = document.getElementById('character-details');
                if (detailsSection) {
                    detailsSection.innerHTML = `
                        <img src="${data.image}" alt="${data.name}">
                        <h3>${data.name}</h3>
                        <p>Species: ${data.species}</p>
                        <p>Status: ${data.status}</p>
                        <p>Origin: ${data.origin.name}</p>
                        <p>Location: ${data.location.name}</p>
                    `;
                } else {
                    console.error("Element 'character-details' non trouvé dans le DOM.");
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
});

const apiBaseUrl = 'https://rickandmortyapi.com/api/character';

// Fonction pour charger les personnages
function loadCharacters(url = apiBaseUrl) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data.results);
            setupPagination(data.info);
        })
        .catch(error => console.error("Erreur lors du chargement des personnages :", error));
}

// Fonction pour afficher les personnages
function displayCharacters(characters) {
    const charactersSection = document.getElementById('characters');
    charactersSection.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.dataset.id = character.id;

        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
        `;

        
        characterCard.addEventListener('click', () => {
            window.location.href = `character.php?id=${character.id}`;
        });

        charactersSection.appendChild(characterCard);
    });
}

// Fonction pour gérer la pagination
function setupPagination(info) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    if (info.prev) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Précédent';
        prevButton.addEventListener('click', () => loadCharacters(info.prev));
        paginationDiv.appendChild(prevButton);
    }

    if (info.next) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Suivant';
        nextButton.addEventListener('click', () => loadCharacters(info.next));
        paginationDiv.appendChild(nextButton);
    }
}

// Filtrer par état (Vivant / Mort)
document.getElementById('filter-alive').addEventListener('click', () => {
    loadCharacters(`${apiBaseUrl}/?status=alive`);
});

document.getElementById('filter-dead').addEventListener('click', () => {
    loadCharacters(`${apiBaseUrl}/?status=dead`);
});

document.getElementById('filter-all').addEventListener('click', () => {
    loadCharacters();
});

// Recherche de personnage par nom
document.getElementById('search-button').addEventListener('click', () => {
    const name = document.getElementById('search-input').value;
    loadCharacters(`${apiBaseUrl}/?name=${name}`);
});

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    loadCharacters();
}