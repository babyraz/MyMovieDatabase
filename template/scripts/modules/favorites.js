const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

export async function addToFavorites(movieID) {

    let button = document.querySelector(`.favorites-btn[data-id="${movieID}"]`);

    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favoritesList.includes(movieID)) {
        favoritesList.push(movieID);
        
        button.textContent = "Remove from favorites";
    } else {
        favoritesList = favoritesList.filter(id => id !== movieID);
       
        button.textContent = "Add to favorites";
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesList));
}

export function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}
