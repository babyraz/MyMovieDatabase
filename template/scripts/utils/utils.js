import { addToFavorites } from '../modules/favorites.js';

export async function addEventListenersSearch() {
    const searchBtn = document.getElementById('searchBtn');  // Hämta knappen från DOM
    const searchInput = document.getElementById('searchInput');  // Hämta sökfältet från DOM

    if (searchBtn && searchInput) {
        
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();  // Förhindra eventuellt standardbeteende
            const query = searchInput.value.trim();  // Hämta användarens sökterm

            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;  // Byt sida till search.html och skicka med query
            } else {
                alert('No search query entered.');
            }
        });
    } else {
        
    }
}


export function addEventListenerDetails() {
    const detailsButtons = document.querySelectorAll('.details-btn'); // Hämta alla knappar
    

    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            
            event.preventDefault(); // Förhindra eventuell standardbeteende
            const movieId = button.getAttribute('data-id'); // Hämta filmens IMDb ID från knappen

            if (movieId) {
                window.location.href = `movie.html?id=${encodeURIComponent(movieId)}`; // Skicka användaren till movie.html med filmens ID i URL:en
            } else {
                alert("No movie ID found!"); // Felsökning om något går fel
            }
        });
    });
}

export function addEventListenerFavorites() {
    const favoritesBtns = document.querySelectorAll('.favorites-btn');
    const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesBtns.forEach(button => {
        const movieID = button.getAttribute('data-id');

        // sätt korrekt knappar
        if (favoritesList.includes(movieID)) {
            button.textContent = "Remove from favorites";
        } else {
            button.textContent = "Add to favorites";
        }

       
        button.replaceWith(button.cloneNode(true)); // klonar knapp utan lyssnare
        const newButton = document.querySelector(`.favorites-btn[data-id="${movieID}"]`);

        // ✅ Add a fresh event listener
        newButton.addEventListener('click', (event) => {
            event.stopPropagation();  // stoppar "bubbling issues"
            addToFavorites(movieID);
        });
    });
}
