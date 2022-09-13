export const getRecipes = () => {
    return fetch("http://localhost:8000/recipes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateRecipe = (id, recipe) => {
    return fetch(`http://localhost:8000/recipes/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
    }).then(getRecipes)
}