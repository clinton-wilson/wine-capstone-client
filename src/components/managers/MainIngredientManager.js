export const getIngredients = () => {
    return fetch("http://localhost:8000/mainingredients", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleIngredient = (ingredientId) => {
    return fetch(`http://localhost:8000/mainingredients/${ingredientId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}