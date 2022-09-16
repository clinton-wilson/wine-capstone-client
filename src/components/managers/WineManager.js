export const getWines = () => {
    return fetch("http://localhost:8000/wines", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleWine = (wineId) => {
    return fetch(`http://localhost:8000/wines/${wineId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearch = (search) => {
    return fetch(`http://localhost:8000/wines?search_term=${search}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const createWine = (wine) => {
    return fetch(`http://localhost:8000/wines`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wine)
    }).then(getWines)
}


export const deleteWine = (id) => {
    return fetch(`http://localhost:8000/wines/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${localStorage.getItem('wine_token')}`
        }
    }).then(getWines)
}

export const updateWine = (id, wine) => {
    return fetch(`http://localhost:8000/wines/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wine)
    }).then(getWines)
}

export const favoriteWine = wineId => {
    return fetch(`http://localhost:8000/wines/${wineId}/favorite`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(res => res.json())
}

export const unfavoriteWine = wineId => {
    return fetch(`http://localhost:8000/wines/${wineId}/unfavorite`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(getWines)
}