

const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

/*export function addToFavorites(movieID, button) {
    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favoritesList.includes(movieID)) {
        // Add movie to favorites
        favoritesList.push(movieID);
        console.log(`${movieID} added to favorites`);
        button.textContent = "Remove from favorites";  // Change button text
    } else {
        // Remove movie from favorites
        const index = favoritesList.indexOf(movieID);
        if (index > -1) {
            favoritesList.splice(index, 1);
            console.log(`${movieID} removed from favorites`);
        }
        button.textContent = "Add to favorites";  // Change button text back
    }

    // Update localStorage with the new list
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    console.log(favoritesList);
}*/

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

