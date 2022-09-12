export const getWines = () => {
    return fetch("http://localhost:8000/wines", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleWine = (wineId) => {
    return fetch(`http://localhost:8000/wines/${wineId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}