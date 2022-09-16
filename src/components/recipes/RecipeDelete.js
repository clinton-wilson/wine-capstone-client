import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteRecipe } from "../managers/RecipeManager"

export const RecipeDelete = ({ recipeId }) => {
    const navigate = useNavigate()
    const deleteRecipeEvent = (recipeId) => {
        deleteRecipe(recipeId)
            .then(() => {
                navigate('/recipes')
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this recipe?")) {
            deleteRecipeEvent(id)
        }
    }

    return (
        <span className="icon" onClick={() => {
            confirmDelete(recipeId)
        }}><FaTrash /></span>
    )
}