const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

export async function addToFavorites(movieID) {
    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];  // Get current favorites

    if (!favoritesList.includes(movieID)) {  // Only add if not already in list
        favoritesList.push(movieID);
        console.log(`${movieID} added to favorites`);
    }

    // Save updated list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    console.log("Updated Favorites:", favoritesList);
}


export function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}
