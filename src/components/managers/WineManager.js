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