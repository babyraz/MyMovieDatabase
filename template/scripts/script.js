import { handleSearch, displayFavorites } from './utils/domUtils.js'; // Importera handleSearch
import { addEventListenerDetails, addEventListenerFavorites, addEventListenersSearch } from './utils/utils.js'; // Importera addEventListenerDetails
import { fetchMoviesFull } from './modules/api.js';  
import { fetchTopMovies } from './modules/api.js';
import { displayTopMovies, displayMovieDetails } from './utils/domUtils.js';
import { renderTrailers } from './modules/caroussel.js';

if (window.location.pathname.includes('index.html')) {
    console.log('index.html');

    init();
    
    addEventListenersSearch();
    addEventListenerFavorites();
   

} else if (window.location.pathname.includes('favorites.html')) {
    console.log('favorites.html');

    displayFavorites();
    
    addEventListenerDetails();

    //updateAllFavoriteButtons();

} else if (window.location.pathname.includes('movie.html')) {
    console.log('movie.html');

    loadMovieDetails();
    
} else if (window.location.pathname.includes('search.html')) {
    console.log('search.html');

    

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q'); // Hämta query från URL

    // Anropa handleSearch om query finns
    if (query) {
        handleSearch(query);
    }
    addEventListenerFavorites();
}





async function init() {
   

    const movies = await fetchTopMovies();  // Get movies from API

    displayTopMovies(movies);  // Show movies in recommendations section
    //updateAllFavoriteButtons();
    const randomMovies = getRandomMovies(movies, 5);  // Pick 5 random movies
    randomMovies.forEach((movie, index) => renderTrailers(movie, index + 1));  // Render trailers
}

// Utility function to get random movies
function getRandomMovies(movies, count) {
    if (!movies || movies.length === 0) return [];
    return movies.sort(() => 0.5 - Math.random()).slice(0, count);
}



async function loadMovieDetails() {
    if (!window.location.pathname.includes('movie.html')) {
        window.location.href = `movie.html?id=${encodeURIComponent(movieID)}`;
        return; // Avsluta funktionen här för att undvika att fortsätta exekvering
    }
    
    // Om vi redan är på movie.html, hämta ID från URL och visa detaljer
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id'); // Hämta movieID från URL

    if (movieID) {
        try {
            const movie = await fetchMoviesFull(movieID); // Hämta detaljer från API
            console.log('Hämtad film:', movie); // Debugging
            displayMovieDetails(movie);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    } else {
        console.error('No movie ID found in URL.');
    }
}


