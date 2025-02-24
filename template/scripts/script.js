import { fetchMovies, fetchMoviesFull } from './modules/api.js';  
import { fetchTopMovies } from './modules/api.js';
import { displayTopMovies, displayMovieDetails } from './utils/domUtils.js';
import { renderTrailers } from './modules/caroussel.js';
import { handleSearch } from './utils/domUtils.js'; 

// Initialize the search functionality
handleSearch();
init();



async function init() {
    const movies = await fetchTopMovies();  // Get movies from API

    displayTopMovies(movies);  // Show movies in recommendations section

    const randomMovies = getRandomMovies(movies, 5);  // Pick 5 random movies
    randomMovies.forEach((movie, index) => renderTrailers(movie, index + 1));  // Render trailers
}

// Utility function to get random movies
function getRandomMovies(movies, count) {
    if (!movies || movies.length === 0) return [];
    return movies.sort(() => 0.5 - Math.random()).slice(0, count);
}





if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');
    
}



if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {

    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}

async function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');  // Hämtar 'id' från URL (som är imdbID)

    console.log('Movie ID från URL:', movieID);  // Debugging

    if (movieID) {
        // Hämtar detaljer om filmen med hjälp av imdbID
        const movie = await fetchMoviesFull(movieID);
        console.log('Hämtad film:', movie);  // Debugging
        displayMovieDetails(movie);
    } else {
        console.error('No movie ID found in the URL.');
    }
}


// Om vi är på movie.html, kör funktionen
if (window.location.pathname.includes('movie.html')) {
    loadMovieDetails();
}