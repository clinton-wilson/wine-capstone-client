export const getVarietals = () => {
    return fetch("http://localhost:8000/varietals", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleVarietal = (varietal) => {
    return fetch(`http://localhost:8000/wines/${varietal}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}