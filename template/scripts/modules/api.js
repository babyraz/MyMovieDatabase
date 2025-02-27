export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json'); // Replace with actual API URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json(); 
        return movies;
    } catch (error) {
        alert("Error fetching movies:", error);
        return []; 
    }
}

export async function fetchMovies(search) {
    const API_KEY = '26d71a38';  
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;  
    } catch (error) {
        alert("Error fetching movies:", error);
        return null;  
    }
}


export async function fetchMoviesFull(movieID) {
    const API_KEY = '26d71a38';  
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;  
    } catch(error) {
        console.log('Error fetching movies', error);
        return null;
    }
    
}

export async function fetchMovieByID(movieID) {
    movieID = movieID.replace(/["']/g, '').trim();

    const API_KEY = '26d71a38';
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);  // Check if the response is ok (status 200)
        }

        let movie;
        try {
            movie = await response.json(); // Attempt to parse JSON
        } catch (jsonError) {
            throw new Error(`Error parsing JSON: ${jsonError.message}`);
        }


        return movie;
    } catch (error) {
        alert('Error fetching movie details:', error.message);
        return null; 
    }
}
