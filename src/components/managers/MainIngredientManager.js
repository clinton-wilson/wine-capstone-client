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

export const deleteIngredient = (id) => {
    return fetch(`http://localhost:8000/mainingredients/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${localStorage.getItem('wine_token')}`
        }
    }).then(getIngredients)
}

export const createIngredient = (ingredient) => {
    return fetch(`http://localhost:8000/mainingredients`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    }).then(getIngredients)
}