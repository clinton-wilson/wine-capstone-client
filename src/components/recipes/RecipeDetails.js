import { useEffect, useState } from "react"
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteRecipe, getSingleRecipe } from "../managers/RecipeManager"

export const RecipeDetails = () => {
    const [recipe, setRecipe] = useState([])
    const { recipeId } = useParams()
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const Recipe = () => {
        getSingleRecipe(recipeId)
            .then(setRecipe)
    }


    useEffect(() => {
        Recipe()
    }, [])

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
        <article className="recipeDetails">
            <h2 className="recipeDetails__name">{recipe.name}</h2>
            <div className="recipeDetails__photo"><img src={recipe.image} alt={recipe.summary} /></div>
            {
                (recipe.main_ingredient === null)
                    ? ""
                    : <div className="recipeDetails__main_ingredient">Main Ingredient: {recipe.main_ingredient?.ingredient}</div>
            }
            <div className="recipeDetails__ingredients">Ingredients: {recipe.ingredients}</div>
            <div className="recipeDetails__instructions">Instructions: {recipe.instructions}</div>
            <div className="recipeDetails__readyInMinutes">Ready in {recipe.ready_in_minutes} minutes</div>
            <div className="recipeDetails__serves">Serves {recipe.serves} people</div>
            <div className="recipeDetails__more_info">More information at <Link to={`${recipe.more_info}`}>{recipe.more_info}</Link></div>
            {
                (wineUserAdmin === true)
                ? <><Link to={`/recipes/edit/${recipe.id}`}><FaEdit /></Link>
            <span className="icon" onClick={() => {
                confirmDelete(recipe.id)
            }}><FaTrash /></span></>
                : ""
            }
            <button type="cancel"
                onClick={() => navigate(`/recipes`)}>Back to Recipes</button>

        </article>
    )
}