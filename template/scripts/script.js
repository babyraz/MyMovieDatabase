import { handleSearch, displayFavorites, loadMovieDetails, init } from './utils/domUtils.js'; 
import { addEventListenerDetails, addEventListenersSearch } from './utils/utils.js'; 


if (window.location.pathname.includes('index.html')) {
    init();
    
    addEventListenersSearch();

} else if (window.location.pathname.includes('favorites.html')) {

    displayFavorites();
    
    addEventListenerDetails();


} else if (window.location.pathname.includes('movie.html')) {

    loadMovieDetails();   
    
} else if (window.location.pathname.includes('search.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q'); // Hämta query från URL

    // Anropa handleSearch om query finns
    if (query) {
        handleSearch(query);
    }
}

