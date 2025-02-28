export function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    

    movieCard.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
    <h3 class="movie-title">${movie.Title}</h3>
    ${movie.Trailer_link ? `<a href="${movie.Trailer_link}" target="_blank" class="watch-trailer">Watch Trailer</a>` : ''}
    ${movie.imdbID ? `<button class="details-btn" data-id="${movie.imdbID}">View Details</button>` : ''}
    ${movie.imdbID ? `<button class="favorites-btn" data-id="${movie.imdbID}">Add to favorites</button>` : ''}
`;


    return movieCard;
}
