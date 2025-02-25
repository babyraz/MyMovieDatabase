import { getFavorites } from '../modules/favorites.js';
import { fetchMovies, fetchMoviesFull, fetchMovieByID } from '../modules/api.js';
import { addEventListenerDetails, addEventListenerFavorites } from './utils.js';
import { createMovieCard } from '../components/movieCard.js';  

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
        const movieCard = createMovieCard(movie); // Använd den externa funktionen för att skapa card
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
                const movieCard = createMovieCard(movie); // Använd den externa funktionen för att skapa card
                cardContainer.appendChild(movieCard);
            });

            addEventListenerDetails(); // Lägg till eventlyssnare
            addEventListenerFavorites();
            
        } else {
            cardContainer.innerHTML = `<p>No movies found for "${query}".</p>`;
        }
    } else {
        cardContainer.innerHTML = "<p>Please enter a search term.</p>";
    }
}


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

export async function displayFavorites() {
    const favoritesList = getFavorites();
    console.log('Favorites list:', favoritesList);

    if (!favoritesList || favoritesList.length === 0) {
        console.log('No favorites found');
        return;
    }

    for (const movieID of favoritesList) {
        try {
            const movie = await fetchMovieByID(movieID);

            if (!movie) {
                console.log('Skipping movie due to error or invalid data:', movieID);
                continue;
            }

            if (movie.Response === "False") { // Handle 'False' responses from OMDB API
                console.log('Movie not found:', movieID);
                continue;
            }

            const movieCard = createMovieCard(movie);
            cardContainer.appendChild(movieCard);
            
        } catch (error) {
            console.log('Error fetching movie details:', error);
        }
    }
    addEventListenerDetails();
    
}

/*export function updateAllFavoriteButtons() {
    console.log('uppdaterar knappar');
    const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
    const buttons = document.querySelectorAll('.favorites-btn');

    buttons.forEach(button => {
        console.log('uppdaterad knapp');
        const movieID = button.getAttribute('data-id');
        if (favoritesList.includes(movieID)) {
            console.log('button switch');
            button.textContent = "Remove from favorites";
        } else {
            button.textContent = "Add to favorites";
        }
    });
}*/
