
import { fetchMovies, fetchMoviesFull } from '../modules/api.js';
import { addEventListenerDetails } from './utils.js';

export function displayTopMovies(movies) {
    const container = document.getElementById('cardContainer');
    
    if (!container) {
        console.error("Container element not found");
        return;
    }

    if (!movies || movies.length === 0) {
        console.warn("No movies to display.");
        return;
    }

    container.innerHTML = '';  // Clear previous content

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
            <h3 class="movie-title">${movie.Title}</h3>
            <a href="${movie.Trailer_link}" target="_blank" class="watch-trailer">Watch Trailer</a>
        `;

        container.appendChild(movieCard);
    });
}



export async function handleSearch(query) {
    const cardContainer = document.getElementById('cardContainer');

    if (query) {
        const data = await fetchMovies(query); // Gör din API-sökning här

        if (data.Response === "True") {
            cardContainer.innerHTML = ''; // Rensa tidigare resultat

            data.Search.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <button class="details-btn" data-id="${movie.imdbID}">View Details</button>
                `;
                cardContainer.appendChild(movieCard);
            });
            addEventListenerDetails();
        } else {
            cardContainer.innerHTML = `<p>No movies found for "${query}".</p>`;
        }
    } else {
        cardContainer.innerHTML = "<p>Please enter a search term.</p>";
    }
}



// Function to display detailed movie info
export function displayMovieDetails(movie) {
    console.log("Movie data:", movie);
    const detailsContainer = document.getElementById('movieInformation');  // Här använder vi rätt id
    if (!detailsContainer) {
        console.error("Details container not found");
        return;
    }

    detailsContainer.innerHTML = `
        <div class="movie-details">
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        </div>
    `;
}
