export const getRecipes = () => {
    return fetch("http://localhost:8000/recipes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const updateRecipe = (id, recipe) => {
    return fetch(`http://localhost:8000/recipes/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
    }).then(getRecipes)
}

export const deleteRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${localStorage.getItem('wine_token')}`
        }
    }).then(getRecipes)
}

export const addIngredient = id => {
    return fetch(`http://localhost:8000/recipes/${id}/add_ingredient`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(res => res.json())
}

export const removeIngredient = id => {
    return fetch(`http://localhost:8000/recipes/${id}/remove_ingredient`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(getRecipes)
}