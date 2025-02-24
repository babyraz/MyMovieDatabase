

export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json'); // Replace with actual API URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json(); 
        return movies;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return []; 
    }
}

export async function fetchMovies(search) {
    const API_KEY = '26d71a38';  
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const data = await response.json();
    return data;  
}

export async function fetchMoviesFull(movieID) {
    const API_KEY = '26d71a38';  
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
    const data = await response.json();
    return data;  
    
}