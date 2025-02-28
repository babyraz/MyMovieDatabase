import { getFavorites, addToFavorites } from '../modules/favorites.js';
import { fetchMovies, fetchMoviesFull, fetchMovieByID, fetchTopMovies } from '../modules/api.js';
import { addEventListenerDetails, addEventListenerFavorites } from './utils.js';
import { createMovieCard } from '../components/movieCard.js';  
import { renderTrailers } from '../modules/caroussel.js';

export function displayTopMovies(movies) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';  

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie); 
        container.appendChild(movieCard);
        addEventListenerDetails();
        addEventListenerFavorites();
        
    });
}

export async function handleSearch(query) {
    const cardContainer = document.getElementById('cardContainer');

    if (query) {
        const data = await fetchMovies(query); 

        if (data.Response === "True") {
            cardContainer.innerHTML = ''; 

            data.Search.forEach(movie => {
                const movieCard = createMovieCard(movie);
                cardContainer.appendChild(movieCard);
            });

            addEventListenerDetails(); 
            addEventListenerFavorites();
            
        } else {
            
            const searchTitle = document.getElementById('favoritesHeader');
            searchTitle.innerHTML = (`No movies found for "${query}"`);
        }
    } else {
        alert(`Please enter a search term.`);
    }
}


export function displayMovieDetails(movie) {
    
    const detailsContainer = document.getElementById('movieInformation'); 

    detailsContainer.innerHTML = `
        <div class="movie-details">
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
            ${movie.imdbID ? `<button class="favorites-btn" data-id="${movie.imdbID}">Add to favorites</button>` : ''}

        </div>
    `;
}

export async function displayFavorites() {
    const favoritesList = getFavorites();

    if (!favoritesList || favoritesList.length === 0) {
        const favoritesTitle = document.getElementById('favoritesTitle');
        favoritesTitle.innerHTML = 'No favorites found';
        return;
    }

    for (const movieID of favoritesList) {
        try {
            const movie = await fetchMovieByID(movieID); 

            //console.log(`Displaying movieID: ${movieID}`);

            const movieCard = createMovieCard(movie); 

            const favoritesBtn = movieCard.querySelector('.favorites-btn');
            if (favoritesBtn) {
                favoritesBtn.textContent = "Remove from favorites";
                favoritesBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); 
                    addToFavorites(movieID); 
                });
            }

            cardContainer.appendChild(movieCard);
        } catch (error) {
            console.log('Error fetching movie details:', error);
        }
    }

    addEventListenerDetails();
}





export async function loadMovieDetails() {
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
            
            displayMovieDetails(movie);
        } catch (error) {
            alert('Error fetching movie details:', error);
        }
    } else {
        alert('No movie ID found in URL.');
    }
    addEventListenerFavorites();
}

export async function init() {
    const movies = await fetchTopMovies();  

    displayTopMovies(movies);  
    
    const randomMovies = getRandomMovies(movies, 5);  
    randomMovies.forEach((movie, index) => renderTrailers(movie, index + 1));  
}


function getRandomMovies(movies, count) {
    if (!movies || movies.length === 0) return [];
    return movies.sort(() => 0.5 - Math.random()).slice(0, count);
}
