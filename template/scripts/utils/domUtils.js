//import { fetchMovies } from '../modules/api.js';
import { fetchMovies, fetchMoviesFull } from '../modules/api.js';

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

export function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const movieContainer = document.getElementById('movieContainer');

    if (!searchInput || !searchBtn || !movieContainer) {
        console.error("Ett eller flera element saknas i DOM:en!");
        return;
    }

    searchBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("Sökknappen klickad!");  

        const query = searchInput.value.trim();
        if (query) {
            const data = await fetchMovies(query);
            if (data.Response === "True") {
                movieContainer.innerHTML = "";  

                data.Search.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <p>Year: ${movie.Year}</p>
                        <button class="details-btn" data-id="${movie.imdbID}">View Details</button>
                    `;

                    // Kontrollera att eventet registreras
                    const detailsBtn = movieCard.querySelector('.details-btn');
                    if (detailsBtn) {
                        detailsBtn.addEventListener('click', (event) => {
                            event.preventDefault();  // Förhindra oväntade omladdningar
                            console.log("Navigerar till: movie.html?id=" + movie.imdbID);
                            window.location.href = `movie.html?id=${movie.imdbID}`;
                        });
                    }

                    movieContainer.appendChild(movieCard);
                });
            } else {
                movieContainer.innerHTML = `<p>No movies found for "${query}".</p>`;
            }
        } else {
            movieContainer.innerHTML = "<p>Please enter a search term.</p>";
        }
    });
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




















/*export function displayTopMovies(movies) {
    const container = document.getElementById('cardContainer');
    
    if (!container) {
        console.error("Container element not found");
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
}*/

/*document.addEventListener('DOMContentLoaded', () => {
    // Example mock data

    // Call the displayTopMovies function with mock data
    displayTopMovies(movies);
});*/


/*document.addEventListener('DOMContentLoaded', async () => {
    try {
        const movies = await fetchTopMovies(); // Fetch movies from API
        displayTopMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
});*/



/*function displayData(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Töm listan innan vi lägger till nya data

    // loopar igenom listan och skriver ut namn/titel
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name; 
        dataList.appendChild(listItem);
    });
}*/



