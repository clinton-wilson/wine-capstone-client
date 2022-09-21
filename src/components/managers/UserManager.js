export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`
        }
    })
        .then(response => response.json())
}

export const updateUser = (id, user) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("wine_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(getUsers)
}