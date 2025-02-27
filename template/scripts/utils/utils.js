import { addToFavorites } from '../modules/favorites.js';
// Funktion för att lägga till eventlyssnare
export async function addEventListenersSearch() {
    const searchBtn = document.getElementById('searchBtn');  // Hämta knappen från DOM
    const searchInput = document.getElementById('searchInput');  // Hämta sökfältet från DOM

    if (searchBtn && searchInput) {
        console.log('Button and input found!'); // Lägg till detta för att se om knappen och sökfältet hittas
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();  // Förhindra eventuellt standardbeteende
            const query = searchInput.value.trim();  // Hämta användarens sökterm

            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;  // Byt sida till search.html och skicka med query
            } else {
                console.log('No search query entered.');
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
                console.error("No movie ID found!"); // Felsökning om något går fel
            }
        });
    });
}

export function addEventListenerFavorites(){
    const favoritesBtn = document.querySelectorAll('.favorites-btn');
    //console.log('lyssnaren lyssnar');

    favoritesBtn.forEach(button => {
        button.addEventListener('click', (event) =>{
            //console.log('button pressed');
            const movieID = button.getAttribute('data-id');

            if (movieID){
                addToFavorites(movieID)
            }
        });
    });
}

